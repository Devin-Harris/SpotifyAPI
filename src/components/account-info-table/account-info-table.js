async function getUserInfo(token) {
  const response = await fetch('https://api.spotify.com/v1/me', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  const user_information = await response.json()
  return user_information
}

async function getRecentlyPlayed(token) {
  const response = await fetch('https://api.spotify.com/v1/me/player/recently-played?limit=10', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  const recently_played = await response.json()
  return recently_played
}

export default {
  name: 'account-info-table',
  props: ['token'],
  async setup(props) {
    let user_information = null
    let recently_played = null
    if (props.token) {
      user_information = await getUserInfo(props.token)
      recently_played = await getRecentlyPlayed(props.token)
      setInterval(async () => {
        console.log('Updating recently played songs...')
        recently_played = await getRecentlyPlayed(props.token)
      }, 60000)
    }
    return { user_information, recently_played }
  },
  methods: {
    redirectSong(item) {
      window.open(item.track.external_urls.spotify)
    }
  },
  created() {

  },
}