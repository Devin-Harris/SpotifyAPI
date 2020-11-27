import { ref } from 'vue'

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
  name: 'account-info-table',
  props: ['token', 'trackId'],
  async setup(props) {
    const track_information = ref(await getTrackInfo(props.token, props.trackId))
    return { track_information }
  },
  methods: {
    redirectTrack() {
      window.open(this.track_information.external_urls.spotify)
    },
    convertMS(ms) {
      let min = Math.floor((ms / 1000 / 60) << 0)
      let sec = Math.floor((ms / 1000) % 60)
      return min + ":" + (sec < 10 ? '0' : '') + sec
    }
  }
}