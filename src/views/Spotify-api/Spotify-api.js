import accountInfo from '@/components/account-info'
import libraryInfo from '@/components/library-info'
import userTopInfo from '@/components/user-top-info'
import recommendations from '@/components/recommendations'
import newReleases from '@/components/new-releases'
import featuredPlaylists from '@/components/featured-playlists'

export default {
  name: 'Spotify-api',
  components: {
    accountInfo,
    libraryInfo,
    userTopInfo,
    recommendations,
    newReleases,
    featuredPlaylists
  },
  data() {
    return {
      token: null,
      isTopLoaded: false,
      topInfoType: null,
      libraries: ['albums', 'tracks', 'shows'],
      displayName: ''
    }
  },
  async created() {
    this.token = this.$store.state.token
    await this.setDisplayName()
  },
  methods: {
    toggleTop(type) {
      if (this.topInfoType === type) {
        this.isTopLoaded = false
        this.topInfoType = ''
      } else {
        this.isTopLoaded = true
        this.topInfoType = type
      }
    },
    async setDisplayName() {
      const response = await fetch('https://api.spotify.com/v1/me', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${this.$store.state.token}`
        }
      })
      const { display_name } = await response.json()
      this.displayName = display_name
    },
    redirectSong() {
      window.open(this.currentlyPlaying.item.external_urls.spotify)
    }
  },

}