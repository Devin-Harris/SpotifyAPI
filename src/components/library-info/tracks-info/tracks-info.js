async function getTracksInfo(token) {
  const response = await fetch(`https://api.spotify.com/v1/me/tracks`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  const tracks_info = await response.json()
  return tracks_info
}

export default {
  name: 'tracks-info',
  props: ['token'],
  async setup(props) {
    let tracks_info = await getTracksInfo(props.token)
    return { tracks_info }
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
    trackRedirect(track) {
      window.open(track.track.external_urls.spotify)
    }
  }
}