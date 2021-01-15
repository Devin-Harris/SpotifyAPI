export default {
  name: 'create-playlist',
  components: {
  },
  data() {
    return {
      tracks: [],
      isTrackEditorExpanded: false,
      playlist_info: {
        name: '',
        public: true,
        collaborative: false,
        description: ''
      },
      created: false,
      token: null
    }
  },
  computed: {
    canCreate() {
      if (this.playlist_info.name && this.totalSelected) {
        return true
      }
      else
        return false
    },
    totalSelected() {
      return this.tracks.filter(track => track.isSelected).length
    }
  },
  created() {
    this.token = localStorage.getItem('token')
    this.tracks = this.$store.state.createPlaylistTracks
    this.tracks.map(track => track.isSelected = true)
  },
  methods: {
    goBack() {
      this.$router.back()
    },
    goHome() {
      this.$router.push('/')
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
    toggleTrackEditor() {
      this.isTrackEditorExpanded = !this.isTrackEditorExpanded
    },
    toggleTrack(trackToToggle) {
      this.tracks.map(track => {
        if (track === trackToToggle) track.isSelected = !track.isSelected
      })
    },
    labelCheck(label) {
      if (label === 'public') {
        if (this.playlist_info.public && this.playlist_info.collaborative)
          this.playlist_info.collaborative = false
      } else if (label === 'collaborative') {
        if (this.playlist_info.collaborative)
          this.playlist_info.public = false
      }
    },
    async getUserId() {
      const response = await fetch(`https://api.spotify.com/v1/me`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${this.token}`
        }
      })
      const { id } = await response.json()
      return id
    },
    async createPlaylist() {
      // Destructure playlist info
      const { name, public: public_label, collaborative, description } = this.playlist_info
      const createBody = {
        name,
        public: public_label,
        collaborative,
        description
      }

      // Get user id
      const user_id = await this.getUserId()

      // Create playlist with userId
      const response = await fetch(`https://api.spotify.com/v1/users/${user_id}/playlists`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(createBody)
      })
      const post_information = await response.json()
      const { id } = post_information

      // Add items to playlist
      let uris = {
        uris: this.tracks.filter(track => track.isSelected).map(track => track.uri)
      }

      while (uris.uris.length > 100) {
        const newUris = uris.uris.slice(0, 100)
        await fetch(`https://api.spotify.com/v1/playlists/${id}/tracks`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${this.token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newUris)
        })
        uris.uris.splice(0, 100)
      }

      await fetch(`https://api.spotify.com/v1/playlists/${id}/tracks`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(uris)
      })

      this.created = true
      window.open(post_information.external_urls.spotify)

    }
  }
}