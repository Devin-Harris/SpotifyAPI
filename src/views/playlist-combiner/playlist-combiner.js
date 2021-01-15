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
  name: 'playlist-combiner',
  components: {
    SelectList
  },
  data() {
    return {
      token: null,
      tracksToAdd: [],
      isTrackEditorExpanded: false,
      combined: false,
      playlistNames: [],
      selectedToPlaylist: null,
      selectedFromPlaylist: null,
      playlistNames: [],
      playlistIds: [],
      playlists: [],
      deleteFromPlaylist: false,
      userId: null
    }
  },
  computed: {
    totalSelected() {
      return this.tracksToAdd.filter(track => track.isSelected).length
    },
    canCombine() {
      return this.playlistNames.length >= 2 && this.selectedToPlaylist && this.selectedFromPlaylist && this.tracksToAdd.length > 0
    },
    playlistToNames() {
      return this.playlistNames.filter(name => {
        const isOwnedPlaylist = this.playlists.items.find(p => p.name === name).owner.id === this.userId
        return (this.selectedFromPlaylist && (name !== this.selectedFromPlaylist.name) && isOwnedPlaylist)
      })
    }
  },
  async created() {
    this.token = localStorage.getItem('token')
    this.userId = await this.getUserId()
    this.playlists = await getPlaylistInfo(this.token)
    this.playlistNames = this.playlists.items.map(p => p.name)
    this.playlistIds = this.playlists.items.map(p => p.id)

    this.selectedToPlaylist = await this.getPlaylist(this.playlistIds[0])
    this.selectedFromPlaylist = await this.getPlaylist(this.playlistIds[1])

    
    this.tracksToAdd = this.selectedFromPlaylist.tracks.items
    this.tracksToAdd.map(track => track.isSelected = true)
    const selectedToTrackIds = this.selectedToPlaylist.tracks.items.map(t => t.track.id)
    this.tracksToAdd = this.tracksToAdd.filter(track => !selectedToTrackIds.includes(track.track.id))
  },
  methods: {
    goBack() {
      this.$router.back()
    },
    goHome() {
      this.$router.push('/')
    },
    toggleDeleteFrom() {
      this.deleteFromPlaylist = !this.deleteFromPlaylist
    },
    getArtists(track) {
      let track_artists = ''
      track.track.artists.forEach((artist, i) => {
        if (i === 0)
          if (track.track.artists.length > 1)
            track_artists += `${artist.name}, `
          else
            track_artists += artist.name
        else if (i !== track.track.artists.length - 1)
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
      this.tracksToAdd.map(track => {
        if (track === trackToToggle) track.isSelected = !track.isSelected
      })
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
    async combinePlaylist() {
      // Get playlist id
      const playlist_id = this.selectedToPlaylist.id

      // Add items to playlist
      let uris = {
        uris: this.tracksToAdd.filter(track => track.isSelected).map(track => track.track.uri)
      }
      console.log(uris)

      while (uris.uris.length > 100) {
        const newUris = uris.uris.slice(0, 100)
        await fetch(`https://api.spotify.com/v1/playlists/${playlist_id}/tracks`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${this.token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newUris)
        })
        uris.uris.splice(0, 100)
      }

      await fetch(`https://api.spotify.com/v1/playlists/${playlist_id}/tracks`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(uris)
      })

      if (this.deleteFromPlaylist) {
        // Delete original playlist
      }

      this.combined = true
      window.open(this.selectedToPlaylist.external_urls.spotify)

    },
    async getPlaylist(id) {
      const response = await fetch(`https://api.spotify.com/v1/playlists/${id}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${this.token}`
        }
      })
      let playlist_info = await response.json()
      let items = playlist_info.tracks.items
      let next = playlist_info.tracks.next
      while (next) {
        const response2 = await fetch(next, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${this.token}`
          }
        })
        const playlist_info2 = await response2.json()
        items = [...items, ...playlist_info2.items]
        next = playlist_info2.next
      }

      playlist_info.tracks.items = items
      return playlist_info
    },
    async selectPlaylist(playlistName, dir) {
      const playlistId = this.playlists.items.find(p => p.name === playlistName).id
      if (dir === 'to') {
        if (this.selectedToPlaylist.name === playlistName) return

        this.selectedToPlaylist = await this.getPlaylist(playlistId)
        
        this.tracksToAdd = this.selectedFromPlaylist.tracks.items
        this.tracksToAdd.map(track => track.isSelected = true)

        let selectedToTrackIds = this.selectedToPlaylist.tracks.items.map(t => t.track.id)
        this.tracksToAdd = this.tracksToAdd.filter(track => !selectedToTrackIds.includes(track.track.id))

      } else {

        if (this.selectedFromPlaylist.name === playlistName) return

        this.selectedFromPlaylist = await this.getPlaylist(playlistId)

        this.tracksToAdd = this.selectedFromPlaylist.tracks.items
        this.tracksToAdd.map(track => track.isSelected = true)

        let selectedToTrackIds = this.selectedToPlaylist.tracks.items.map(t => t.track.id)
        this.tracksToAdd = this.tracksToAdd.filter(track => !selectedToTrackIds.includes(track.track.id))
      }
    },
  }
}