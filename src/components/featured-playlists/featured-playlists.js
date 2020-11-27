import { ref } from 'vue'

async function getFeaturedPlaylists(token) {
  const response = await fetch('https://api.spotify.com/v1/browse/featured-playlists', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  const featured_information = await response.json()
  return featured_information
}

export default {
  name: 'featured-playlists',
  props: ['token'],
  data() {
    return {
      isInfoOpen: false
    }
  },
  async setup(props) {
    const featured_information = ref(await getFeaturedPlaylists(props.token))
    return { featured_information }
  },
  created() {
    window.addEventListener('click', this.closeAllQueuePopups)
  },
  beforeDestroy() {
    window.removeEventListener('click', this.closeAllQueuePopups)
  },
  methods: {
    openSpotifyPlaylist(playlist) {
      window.open(playlist.external_urls.spotify)
    },
    formateDate(date) {
      let format_date = new Date(date)
      return format_date.toLocaleString()
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
    toggleInfo() {
      this.isInfoOpen = !this.isInfoOpen
    }
  }
}