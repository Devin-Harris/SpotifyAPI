import { ref } from 'vue'

async function getNewReleases(token) {
  const response = await fetch('https://api.spotify.com/v1/browse/new-releases', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  const albums_information = await response.json()
  return albums_information
}

export default {
  name: 'new-releases',
  props: ['token'],
  data() {
    return {
      isInfoOpen: false
    }
  },
  async setup(props) {
    const albums_information = ref(await getNewReleases(props.token))
    return { albums_information }
  },
  created() {
    window.addEventListener('click', this.closeAllQueuePopups)
  },
  beforeDestroy() {
    window.removeEventListener('click', this.closeAllQueuePopups)
  },
  methods: {
    openSpotifyAlbum(album) {
      window.open(album.external_urls.spotify)
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