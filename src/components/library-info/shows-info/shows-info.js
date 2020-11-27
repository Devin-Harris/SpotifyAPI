async function getShowsInfo(token) {
  const response = await fetch(`https://api.spotify.com/v1/me/shows`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  const shows_info = await response.json()
  return shows_info
}

export default {
  name: 'shows-info',
  props: ['token'],
  async setup(props) {
    let shows_info = await getShowsInfo(props.token)
    return { shows_info }
  },
  methods: {
    openSpotifyArtist(artist) {
      window.open(artist.external_urls.spotify)
    },
    openSpotifyTrack(track) {
      window.open(track.external_urls.spotify)
    },
    formateDate(date) {
      let format_date = new Date(date)
      return format_date.toLocaleString()
    },
    showRedirect(show) {
      window.open(show.show.external_urls.spotify)
    }
  }
}