export default {
  name: 'info-card',
  props: {
    card: String
  },
  methods: {
    redirect() {
      if (this.card === 'Fragments')
        this.$router.push('/fragments')
      else if (this.card === 'Composition Api')
        this.$router.push('/composition-api')
      else if (this.card === 'Suspense')
        this.$router.push('/suspense')
      else if (this.card === 'View Spotify Api')
        this.$router.push('/spotify-api')
    }
  }
}