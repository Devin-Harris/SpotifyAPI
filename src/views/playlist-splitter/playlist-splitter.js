import SelectList from '@/components/select-list'

async function getPlaylistInfo(token) {
  const response = await fetch(`https://api.spotify.com/v1/me/playlists`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  const playlist_info = await response.json()
  return playlist_info
}

export default {
  name: 'playlist-splitter',
  components: {
    SelectList
  },
  data() {
    return {
      token: '',
      playlist_info: {},
      playlists: [],
      selectedPlaylist: {},
      toggles: [
        'Genres',
        "Artists",
        'Albums',
        'Popularity'
      ]
    }
  },
  async mounted() {
    this.token = localStorage.getItem('token')
    this.playlist_info = await getPlaylistInfo(this.token)
    this.playlistNames = this.playlist_info.items.map(p => p.name)
    this.playlistIds = this.playlist_info.items.map(p => p.id)

    this.selectedPlaylist = await this.getPlaylist(this.playlistIds[0])
  },
  methods: {
    goBack() {
      this.$router.back()
    },
    goHome() {
      this.$router.push('/')
    },
    async selectPlaylist(playlistName) {
      if (this.selectedPlaylist.name === playlistName) return

      const playlistId = this.playlistIds[this.playlistNames.findIndex(n => n === playlistName)]
      this.selectedPlaylist = await this.getPlaylist(playlistId)
      this.selectedPlaylist.tracks.items.map(async ({ track }) => track.genres = await this.getGenres(track.artists))
      console.log(this.selectedPlaylist.tracks.items)
    },
    async getPlaylistTracks(id) {
      const response = await fetch(`https://api.spotify.com/v1/playlists/${id}/tracks`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${this.token}`
        }
      })
      const playlist_info = await response.json()
      return playlist_info
    },
    async getPlaylist(id) {
      const response = await fetch(`https://api.spotify.com/v1/playlists/${id}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${this.token}`
        }
      })
      const playlist_info = await response.json()
      return playlist_info
    },
    async getGenres(artists) {
      let genres = []

      for (let i = 0; i < artists.length; i++) {
        let response = await fetch(`https://api.spotify.com/v1/artists/${artists[i].id}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${this.token}`
          }
        })
        let artist_info = await response.json()
        if (artist_info && artist_info.genres && artist_info.genres.length > 0) {
          artist_info.genres.forEach(genre => {
            if (genres.some(g => g === genre)) return
            genres.push(genre)
          })
        }
      }

      return genres
    },
    toggleCheckbox(toggle) {
      document.querySelector(`#${toggle}-toggle`).checked = !document.querySelector(`#${toggle}-toggle`).checked
    }
  }
}