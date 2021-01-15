import { ref } from 'vue'

async function getRecommendationsInfo(token, seed, genre = null) {

  let top_info
  if (seed === 'artists' || seed === 'tracks')
    top_info = await getTopInfo(token, seed)

  console.log(top_info)

  let url = 'https://api.spotify.com/v1/recommendations?'
  if (seed === 'artists')
    url += `seed_artists=${top_info.items.map(item => item.id).join(',')}`
  else if (seed === 'tracks')
    url += `seed_tracks=${top_info.items.map(item => item.id).join(',')}`
  else if (seed === 'genres')
    url += `seed_genres=${genre}`

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  const recommendations_info = await response.json()
  recommendations_info.tracks.map(track => track.queuePopup = false)
  return recommendations_info
}

async function getGenres(token) {
  const response = await fetch('https://api.spotify.com/v1/recommendations/available-genre-seeds', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  const { genres } = await response.json()
  return genres
}

async function getTopInfo(token, type) {
  const response = await fetch(`https://api.spotify.com/v1/me/top/${type}?limit=5`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  const top_information = await response.json()
  return top_information
}

export default {
  name: 'recommendations',
  props: ['token'],
  async setup(props) {
    const currentRecommendationSeed = ref(null)
    const genres = await getGenres(props.token)
    const genre = ref('')

    const recommendations_info = ref({
      artists: await getRecommendationsInfo(props.token, 'artists'),
      tracks: await getRecommendationsInfo(props.token, 'tracks'),
      genres: await getRecommendationsInfo(props.token, 'genres', genre)
    })
    return { recommendations_info, currentRecommendationSeed, genres, genre }
  },
  created() {
    window.addEventListener('click', this.closeAllQueuePopups)
  },
  beforeDestroy() {
    window.removeEventListener('click', this.closeAllQueuePopups)
  },
  methods: {
    openSpotifyArtist(artist) {
      window.open(artist.external_urls.spotify)
    },
    openSpotifyTrack(track) {
      if (track.queuePopup) {
        this.addQueue(track)
      } else {
        this.closeAllQueuePopups()
        this.$router.push(`/track/${track.id}`)
      }
    },
    formateDate(date) {
      let format_date = new Date(date)
      return format_date.toLocaleString()
    },
    trackRedirect(track) {
      window.open(track.track.external_urls.spotify)
    },
    changeSeed(seed) {
      if (seed === this.currentRecommendationSeed) {
        this.currentRecommendationSeed = null
        return
      }
      this.currentRecommendationSeed = seed
      if (seed === 'genres')
        this.recommendations_info.genres = { artists: {}, tracks: {} }
    },
    getArtists(track) {
      let track_artists = ''
      track.artists.forEach((artist, i) => {
        if (i === 0)
          if (track.artists.length > 1)
            track_artists += `${artist.name}, `
          else
            track_artists += artist.name
        else if (i !== track.artists.length - 1)
          track_artists += `${artist.name}, `
        else
          track_artists += ` and ${artist.name}`
      })
      return track_artists
    },
    async genreSelection(e) {
      this.genre = e.target.value
      this.recommendations_info.genres = await getRecommendationsInfo(this.token, 'genres', this.genre)
    },
    async updateRecommendations() {
      this.recommendations_info = {
        artists: await getRecommendationsInfo(this.token, 'artists'),
        tracks: await getRecommendationsInfo(this.token, 'tracks'),
        genres: await getRecommendationsInfo(this.token, 'genres', this.genre)
      }
    },
    createPlaylist(recommendations) {
      let tracks = []
      if (this.currentRecommendationSeed === 'artists')
        tracks = recommendations.artists.tracks
      else if (this.currentRecommendationSeed === 'tracks')
        tracks = recommendations.tracks.tracks
      else if (this.currentRecommendationSeed === 'genres')
        tracks = recommendations.genres.tracks

      this.$store.state.createPlaylistTracks = JSON.parse(JSON.stringify(tracks))
      this.$router.push('/create-playlist')
    },
    rightClick(e, clickedTrack) {
      e.preventDefault()
      this.closeAllQueuePopups()

      if (e.target.classList.contains('queuePopup')) return

      if (this.currentRecommendationSeed === 'artists')
        this.recommendations_info.artists.tracks.map(track => { if (track === clickedTrack) track.queuePopup = true })
      else if (this.currentRecommendationSeed === 'tracks')
        this.recommendations_info.tracks.tracks.map(track => { if (track === clickedTrack) track.queuePopup = true })
      else if (this.currentRecommendationSeed === 'genres')
        this.recommendations_info.genres.tracks.map(track => { if (track === clickedTrack) track.queuePopup = true })

      setTimeout(() => {
        e.target.children[3].style.opacity = 1
        e.target.children[3].style.top = 50 + '%'
        e.target.children[3].style.right = .5 + 'rem'
        e.target.classList.add('track-row-queue')
      }, 10)
    },
    closeAllQueuePopups() {
      if (this.recommendations_info.artists.tracks)
        this.recommendations_info.artists.tracks.map(track => track.queuePopup = false)
      if (this.recommendations_info.tracks.tracks)
        this.recommendations_info.tracks.tracks.map(track => track.queuePopup = false)
      if (this.recommendations_info.genres.tracks && this.recommendations_info.genres.tracks.length > 0)
        this.recommendations_info.genres.tracks.map(track => track.queuePopup = false)
      Array.from(document.querySelectorAll('.track-row')).forEach(elm => elm.classList.remove('track-row-queue'))
    },
    async addQueue(track) {
      this.closeAllQueuePopups()
      const response = await fetch(`https://api.spotify.com/v1/me/player/queue?uri=${track.uri}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.token}`
        }
      })
      const result = await response.json()
      if (result.error) {
        alert(
          `Cannot add to queue:
          ${result.error.reason}`
        )
      }
    }
  }
}