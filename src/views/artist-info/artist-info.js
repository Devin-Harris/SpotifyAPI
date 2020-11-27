import albumTable from '@/components/album-table'

async function getArtistInformation(token, artistId) {
  const response = await fetch(`https://api.spotify.com/v1/artists/${artistId}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  const artist_information = await response.json()
  return artist_information
}

async function getAlbumsInformation(token, artistId) {
  const response = await fetch(`https://api.spotify.com/v1/artists/${artistId}/albums`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  const albums_information = await response.json()
  return albums_information
}

async function getAllAlbumsInformation(token, albumIds) {
  let albumInfo = []
  albumIds.forEach(async id => {
    const response = await fetch(`https://api.spotify.com/v1/albums/${id}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    const albums_information = await response.json()
    albumInfo.push(albums_information)
  })
  return albumInfo
}

async function getTopTracks(token, artistId) {
  const response = await fetch(`https://api.spotify.com/v1/artists/${artistId}/top-tracks?country=from_token`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  const top_tracks = await response.json()
  top_tracks.tracks.map(track => track.queuePopup = false)
  return top_tracks
}

async function getRelatedArtists(token, artistId) {
  const response = await fetch(`https://api.spotify.com/v1/artists/${artistId}/related-artists`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  const related_artists = await response.json()
  return related_artists
}

function toTitleCase(str) {
  return str.replace(
    /\w\S*/g,
    function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    }
  )
}

export default {
  name: 'artist-info',
  components: {
    albumTable
  },
  props: ['artistId'],
  data() {
    return {
      artist_information: {},
      albums_information: {},
      top_tracks: {},
      related_artists: {},
      token: '',
      isAlbumInfoOpen: false,
      isTracksInfoOpen: false,
      isRelatedInfoOpen: false
    }
  },
  beforeDestroy() {
    window.removeEventListener('click', this.closeAllQueuePopups)
  },
  async created() {
    await this.setInformation()
  },
  methods: {
    async setInformation() {
      this.token = localStorage.getItem('token')

      this.artist_information = await getArtistInformation(this.token, this.artistId)

      let artistAlbums = await getAlbumsInformation(this.token, this.artistId)
      let albumIds = artistAlbums.items.map(album => album.id)
      this.albums_information = await getAllAlbumsInformation(this.token, albumIds)

      this.top_tracks = await getTopTracks(this.token, this.artistId)
      this.related_artists = await getRelatedArtists(this.token, this.artistId)

      window.addEventListener('click', this.closeAllQueuePopups)
    },
    goBack() {
      this.$router.back()
    },
    goHome() {
      this.$router.push('/')
    },
    redirectArtist() {
      window.open(this.artist_information.external_urls.spotify)
    },
    toggleAlbumInfo() {
      this.isAlbumInfoOpen = !this.isAlbumInfoOpen
    },
    toggleTracksInfo() {
      this.isTracksInfoOpen = !this.isTracksInfoOpen
    },
    toggleRelatedInfo() {
      this.isRelatedInfoOpen = !this.isRelatedInfoOpen
    },
    openSpotifyAlbum(album) {
      window.open(album.external_urls.spotify)
    },
    openSpotifyTrack(track) {
      if (track.queuePopup) {
        this.addQueue(track)
      } else {
        this.closeAllQueuePopups()
        this.$router.push(`/track/${track.id}`)
      }
    },
    openSpotifyArtist(artist) {
      this.closeAllQueuePopups()
      this.$router.push(`/artist/${artist.id}`)
    },
    convertMS(ms) {
      let min = Math.floor((ms / 1000 / 60) << 0)
      let sec = Math.floor((ms / 1000) % 60)
      return min + ":" + (sec < 10 ? '0' : '') + sec
    },
    rightClick(e, clickedTrack) {
      e.preventDefault()
      this.closeAllQueuePopups()

      if (e.target.classList.contains('queuePopup')) return

      this.top_tracks.tracks.map(track => { if (track === clickedTrack) track.queuePopup = true })

      setTimeout(() => {
        e.target.children[5].style.opacity = 1
        e.target.children[5].style.top = 50 + '%'
        e.target.children[5].style.right = .25 + 'rem'
        e.target.classList.add('track-row-queue')
      }, 50)
    },
    closeAllQueuePopups() {
      this.top_tracks.tracks.map(track => track.queuePopup = false)
      Array.from(document.querySelectorAll('.info-row')).forEach(elm => elm.classList.remove('track-row-queue'))
    },
    async addQueue(track) {
      this.closeAllQueuePopups()
      const response = await fetch(`https://api.spotify.com/v1/me/player/queue?uri=${track.uri}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.token}`
        }
      })
      const result = await response.json()
      if (result.error) {
        alert(
          `Cannot add to queue:
          ${result.error.reason}`
        )
      }
    }
  }
}