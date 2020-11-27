async function getAlbumsInfo(token) {
  const response = await fetch(`https://api.spotify.com/v1/me/albums`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  const albums_info = await response.json()
  return albums_info
}

export default {
  name: 'albums-info',
  props: ['token'],
  async setup(props) {
    let albums_info = await getAlbumsInfo(props.token)
    return { albums_info }
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
    albumRedirect(album) {
      window.open(album.album.external_urls.spotify)
    }
  }
}