import { ref } from 'vue'
async function getTopInfo(token, type) {
  const response = await fetch(`https://api.spotify.com/v1/me/top/${type}?limit=50`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  const top_information = await response.json()
  top_information.items.map(track => track.queuePopup = false)
  return top_information
}

async function getPlaylistInfo(token, type) {
  const response = await fetch(`https://api.spotify.com/v1/me/playlists`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  const top_information = await response.json()
  return top_information
}

export default {
  name: 'user-top-info',
  props: ['token', 'type'],
  async setup(props) {
    let top_info = ref({})
    if (props.type === 'playlists')
      top_info = ref(await getPlaylistInfo(props.token, props.type))
    else
      top_info = ref(await getTopInfo(props.token, props.type))

    return { top_info }
  },
  created() {
    window.addEventListener('click', this.closeAllQueuePopups)
  },
  beforeDestroy() {
    window.removeEventListener('click', this.closeAllQueuePopups)
  },
  methods: {
    openSpotifyArtist(artist) {
      this.$router.push(`/artist/${artist.id}`)
      // window.open(artist.external_urls.spotify)
    },
    openSpotifyTrack(track) {
      if (track.queuePopup) {
        this.addQueue(track)
      } else {
        this.closeAllQueuePopups()
        this.$router.push(`/track/${track.id}`)
      }
    },
    openSpotifyPlaylist(playlist) {
      window.open(playlist.external_urls.spotify)
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
    openPlaylistSplitter() {
      this.$router.push('playlist-splitter')
    },
    openCombinePlaylists() {
      this.$router.push('playlist-combiner')
    },
    createPlaylist(tracks) {
      this.$store.state.createPlaylistTracks = JSON.parse(JSON.stringify(tracks))
      this.$router.push('/create-playlist')
    },
    rightClick(e, clickedTrack) {
      e.preventDefault()
      this.closeAllQueuePopups()

      if (e.target.classList.contains('queuePopup')) return

      if (this.type === 'tracks')
        this.top_info.items.map(track => { if (track === clickedTrack) track.queuePopup = true })

      setTimeout(() => {
        e.target.children[3].style.opacity = 1
        e.target.children[3].style.top = 50 + '%'
        e.target.children[3].style.right = .5 + 'rem'
        e.target.classList.add('track-row-queue')
      }, 50)
    },
    closeAllQueuePopups() {
      this.top_info.items.map(track => track.queuePopup = false)
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