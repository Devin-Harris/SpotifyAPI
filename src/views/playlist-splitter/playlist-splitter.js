import SelectList from '@/components/select-list'
import ActionLabel from '@/components/action-label'

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
    SelectList,
    ActionLabel
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
      ],
      selectedGenres: [],
      selectedArtists: [],
      selectedAlbums: [],
      genreToggle: false,
      artistToggle: false,
      albumToggle: false,
      popularityToggle: false,
      minPop: 0,
      maxPop: 100
    }
  },
  async mounted() {
    this.token = localStorage.getItem('token')
    this.playlist_info = await getPlaylistInfo(this.token)
    this.playlistNames = this.playlist_info.items.map(p => p.name)
    this.playlistIds = this.playlist_info.items.map(p => p.id)

    this.selectedPlaylist = await this.getPlaylist(this.playlistIds[0])
    this.selectedPlaylist.tracks.items.map(async ({ track }) => track.genres = await this.getGenres(track.artists))
  },
  computed: {
    availableGenres() {
      let arr = []
      if (!this.selectedPlaylist || !this.selectedPlaylist.tracks || !this.selectedPlaylist.tracks.items) return []
      this.selectedPlaylist.tracks.items.forEach(({ track }) => {
        if (!track.genres) return
        track.genres.forEach(genre => {
          if (arr.some(i => i === genre)) return
          arr.push(genre)
        })
      })
      return arr
    },
    availableArtists() {
      let arr = []
      if (!this.selectedPlaylist || !this.selectedPlaylist.tracks || !this.selectedPlaylist.tracks.items) return []
      this.selectedPlaylist.tracks.items.forEach(({ track }) => {
        if (!track.artists) return
        track.artists.forEach(({ name }) => {
          if (arr.some(i => i === name)) return
          arr.push(name)
        })
      })
      return arr
    },
    availableAlbums() {
      let arr = []
      if (!this.selectedPlaylist || !this.selectedPlaylist.tracks || !this.selectedPlaylist.tracks.items) return []
      this.selectedPlaylist.tracks.items.forEach(({ track }) => {
        if (!track.album) return
        if (arr.some(i => i === track.album.name)) return
        arr.push(track.album.name)
      })
      return arr
    }
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
      console.log(items)
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
    selectGenre(genre, type) {
      const elm = document.getElementById(`genre-${genre}`)
      if (type === 'click') {
        elm.checked = !elm.checked
      }

      if (elm.checked) {
        this.selectedGenres.push(genre)
      } else {
        this.selectedGenres.splice(this.selectedGenres.findIndex(g => g === genre), 1)
      }
    },
    isGenreSelected(genre) {
      return this.selectedGenres.some(g => g === genre)
    },
    selectArtist(artist, type) {
      const elm = document.getElementById(`artist-${artist}`)
      if (type === 'click') {
        elm.checked = !elm.checked
      }

      if (elm.checked) {
        this.selectedArtists.push(artist)
      } else {
        this.selectedArtists.splice(this.selectedArtists.findIndex(a => a === artist), 1)
      }
    },
    isArtistSelected(artist) {
      return this.selectedArtists.some(a => a === artist)
    },
    selectAlbum(album, type) {
      const elm = document.getElementById(`album-${album}`)
      if (type === 'click') {
        elm.checked = !elm.checked
      }

      if (elm.checked) {
        this.selectedAlbums.push(album)
      } else {
        this.selectedAlbums.splice(this.selectedAlbums.findIndex(a => a === album), 1)
      }
    },
    isAlbumSelected(album) {
      return this.selectedAlbums.some(a => a === album)
    },
    toggleCheckbox(toggle) {
      document.querySelector(`#${toggle}-toggle`).checked = !document.querySelector(`#${toggle}-toggle`).checked
      this.checkboxChanged(toggle)
    },
    checkboxChanged(toggle) {
      console.log(toggle)
      switch (toggle) {
        case 'Genres':
          this.genreToggle = !this.genreToggle
          break
        case 'Artists':
          this.artistToggle = !this.artistToggle
          break
        case 'Albums':
          this.albumToggle = !this.albumToggle
          break
        case 'Popularity':
          this.popularityToggle = !this.popularityToggle
          break
        default:
          break
      }
    },
    setMinNum(e) {
      this.minPop = e
    },
    setMaxNum() {
      this.maxPop = e
    },
    getGenreTracks() {
      const arr = this.selectedPlaylist.tracks.items.filter((({ track }) => {
        return track.genres.some(genre => this.selectedGenres.some(g => g === genre))
      })).map(i => i.track)
      return arr
    },
    getArtistTracks() {
      const arr = this.selectedPlaylist.tracks.items.filter((({ track }) => {
        return track.artists.some(artist => this.selectedArtists.some(a => a === artist.name))
      })).map(i => i.track)
      return arr
    },
    getAlbumTracks() {
      const arr = this.selectedPlaylist.tracks.items.filter((({ track }) => {
        return this.selectedAlbums.some(a => a === track.album.name)
      })).map(i => i.track)
      return arr
    },
    getPopularityTracks() {
      console.log(this.minPop, this.maxPop)
      const arr = this.selectedPlaylist.tracks.items.filter((({ track }) => {
        return (track.popularity >= this.minPop && track.popularity <= this.maxPop)
      })).map(i => i.track)
      return arr
    },
    generatePlaylist() {
      let genreTracks = this.getGenreTracks()
      let artistTracks = this.getArtistTracks()
      let albumTracks = this.getAlbumTracks()
      let popularityTracks = this.getPopularityTracks()

      let tracks = [...genreTracks, ...artistTracks, ...albumTracks, ...popularityTracks]

      // Remove Duplicates
      let storeTracks = []
      tracks.forEach(track => {
        if (storeTracks.some(t => t.uri === track.uri)) console.log('duplicate')
        else storeTracks.push(track)
      })

      this.$store.state.createPlaylistTracks = storeTracks
      this.$router.push('/create-playlist')
    }
  }
}