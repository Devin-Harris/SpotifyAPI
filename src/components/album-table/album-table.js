import { ref } from 'vue'

async function getAlbumInfo(token, albumId) {
  const response = await fetch(`https://api.spotify.com/v1/albums/${albumId}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  const album_information = await response.json()
  return album_information
}

export default {
  name: 'account-info-table',
  props: ['token', 'albumId'],
  async setup(props) {
    const album_information = ref(await getAlbumInfo(props.token, await props.albumId))
    return { album_information }
  },
  methods: {
    redirectAlbum() {
      window.open(this.album_information.external_urls.spotify)
    },
    convertMS(ms) {
      let min = Math.floor((ms / 1000 / 60) << 0)
      let sec = Math.floor((ms / 1000) % 60)
      return min + ":" + (sec < 10 ? '0' : '') + sec
    }
  }
}