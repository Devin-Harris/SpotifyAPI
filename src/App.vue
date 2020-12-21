<template>
  <div v-if="currentlyPlaying && currentlyPlaying.item" class="currently-playing">
    <h6 @click="redirectSong">Currently Playing</h6>
    <p @click="redirectSong">{{currentlyPlaying.item.name}}</p>
    <div class="media-controls" v-if="userIsPremium">
      <i class="fas fa-step-backward" @click="prevSong"></i>
      <i class="fas" :class="paused ? 'fa-play' : 'fa-pause'" @click="songPausePlay"></i>
      <i class="fas fa-step-forward" @click="nextSong"></i>
    </div>
  </div>
  <router-view />
</template>

<script>
export default {
  setup() {},
  data() {
    return {
      currentlyPlaying: null,
      token: null,
      userIsPremium: false,
      paused: false
    }
  },
  methods: {
    async getCurrentlyPlaying() {
      const response = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${this.token}`
        }
      })
      const currently_played = await response.json()
      return currently_played
    },
    async updatePlaying() {
      setInterval(async () => {
        console.log('Updating currently playing song...')
        this.currentlyPlaying = await this.getCurrentlyPlaying()
      }, 20000)
    },
    async prevSong() {
      await fetch('https://api.spotify.com/v1/me/player/previous', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.token}`
        }
      })
      this.currentlyPlaying = await this.getCurrentlyPlaying()
    },
    async songPausePlay() {
      if (!this.paused) {
        await fetch('https://api.spotify.com/v1/me/player/pause', {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${this.token}`
          }
        })
      } else {
        await fetch('https://api.spotify.com/v1/me/player/play', {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${this.token}`
          }
        })
      }

      this.paused = !this.paused
    },
    async nextSong() {
      await fetch('https://api.spotify.com/v1/me/player/next', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.token}`
        }
      })
      this.currentlyPlaying = await this.getCurrentlyPlaying()
    },
    redirect(client_id) {
      let redirect_uri = window.location.origin
      let scopes =
        [
          'user-top-read',
          'user-read-email',
          'user-read-private',
          'user-read-recently-played',
          'user-read-currently-playing',
          'user-read-playback-state',
          'user-modify-playback-state',
          'user-library-read',
          'playlist-read-private',
          'playlist-read-collaborative',
          'user-modify-playback-state',
          'playlist-modify-public',
          'playlist-modify-private'
        ]
      window.location = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=token&redirect_uri=${encodeURIComponent(redirect_uri)}&scope=${scopes.join(encodeURIComponent(','))}`
    },
    async getUserInfo() {
      const response = await fetch('https://api.spotify.com/v1/me', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${this.$store.state.token}`
        }
      })
      const user_information = await response.json()
      return user_information
    }
  },
  async created() {
    const client_id = 'fd49c6c7cae74d5b8a5188d599b7aa16'

    if (window.location.hash) {
      const hashs = window.location.hash.substring(1).split('&')
      hashs.forEach(hash => {
        const hash_values = hash.split('=')
        if (hash_values[0] === 'access_token') this.token = hash_values[1]
      })
      if (this.token) {
        this.$store.state.token = this.token
        localStorage.setItem('token', this.token)
        setTimeout(() => {
          console.log('Token has expired. Redirecting...')
          this.redirect(client_id)
        }, 3600000)

        this.$router.push('/')
        this.currentlyPlaying = await this.getCurrentlyPlaying()
        await this.updatePlaying()

        const { product } = await this.getUserInfo()
        this.userIsPremium = product === 'premium'
      }
    } else {
      this.redirect(client_id)
    }
  }
};
</script>

<style lang="scss">

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  overflow-x: hidden;
  font-family: 'Montserrat';
}

button {
  font-weight: 600;
}

i {
  line-height: 1.1 !important;
}

#app {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh);
  font-family: 'Montserrat', Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: black;
  margin: 0;
}

#nav {
  position: absolute;
  top: 15vh;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 30px;
  a {
    font-weight: bold;
    color:black;
    text-decoration: none;
    margin: 0 .5rem;
    &:hover {
      opacity: 0.7;
    }

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.loading {
  h1 {
    color: white;
    font-size: 2rem;
  }
  i {
    color: white;
    font-size: 2rem;
  }
}

.currently-playing {
  position: absolute;
  top: 1rem;
  right: 2rem;
  color: #1ED760;
  h6 {
    text-align: right;
    color: white;
    &:hover {
      cursor: pointer;
    }
  }
  p {
    &:hover {
      cursor: pointer;
    }
  }
  .media-controls {
    margin: .25rem auto;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #2D2D2D;
    padding: .5rem;
    border-radius: 50rem;
    max-width: 10rem;
    i {
      margin: 0 .5rem;
      font-size: .75rem;
      transition: .3s;
      &:hover {
        cursor: pointer;
        color: white;
      }
    }
  }
}

// Extra small devices (portrait phones, less than 576px)
// No media query since this is the default in Bootstrap

// Extra large devices (large desktops, up to 1200px)
@media (max-width: 1200px) { }

// Large devices (desktops, up to 992px)
@media (max-width: 992px) {
  .currently-playing {
    position: absolute;
    top: 1rem;
    right: 50%;
    transform: translateX(50%);
    h6 {
      text-align: center;
    }
  }
}

// Medium devices (tablets, up to 768px)
@media (max-width: 768px) {
  
}

// Small devices (landscape phones, up to 576px)
@media (max-width: 576px) {
  
}
</style>
