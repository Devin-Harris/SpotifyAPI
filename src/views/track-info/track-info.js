import trackTable from '@/components/track-table'
import albumTable from '@/components/album-table'

async function getTrackInfo(token, trackId) {
  const response = await fetch(`https://api.spotify.com/v1/tracks/${trackId}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  const track_information = await response.json()
  return track_information
}

export default {
  name: 'track-info',
  components: {
    trackTable,
    albumTable
  },
  data() {
    return {
      track_information: {}
    }
  },
  computed: {
    async albumId() {
      const id = await this.getAlbumId(this.$route.params.trackId)
      return id
    }
  },
  methods: {
    goBack() {
      this.$router.back()
    },
    goHome() {
      this.$router.push('/')
    },
    async getAlbumId(trackId) {
      this.track_information = await getTrackInfo(this.$store.state.token, trackId)
      return this.track_information.album.id
    },
    async addToQueue() {
      let uri = this.track_information.uri
      await fetch(`https://api.spotify.com/v1/me/player/queue?uri=${uri}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.$store.state.token}`
        }
      })
    }
  }
}