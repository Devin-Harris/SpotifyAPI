<template>
  <div class="container">

    <div class="header">
      <img src="@/assets/spotifyLogo.png" alt="spotify-logo">
      <h4>Spotify API</h4>
      <h6>by Devin Harris</h6>
    </div>

    <div class="welcome-message-container">
      <Suspense>
        <template #default>
          <h4 id="welcome-message">Currently logged in as <br><span>{{ displayName }}</span> </h4>
        </template>
        <template #fallback>
          <div class="loading">
            <h1>Loading...</h1>
            <i class="fas fa-spinner fa-spin"></i>
          </div>
        </template>
      </Suspense>
    </div>

    <account-info :token="$store.state.token" />

    <div class="top_buttons">
      <button :class="{'active': topInfoType === 'artists'}" class="artists_button" @click="toggleTop('artists')">View Top Artists</button>
      <button :class="{'active': topInfoType === 'tracks'}" class="tracks_button" @click="toggleTop('tracks')">View Top Tracks</button>
      <button :class="{'active': topInfoType === 'playlists'}" class="tracks_button" @click="toggleTop('playlists')">View your playlists</button>
    </div>

    <div class="top_info_container" v-if="isTopLoaded">
      <Suspense>
        <template #default>
          <user-top-info :type="topInfoType" :token="$store.state.token" :key="topInfoType" />
        </template>
        <template #fallback>
          <div class="loading">
            <h1>Loading...</h1>
            <i class="fas fa-spinner fa-spin"></i>
          </div>
        </template>
      </Suspense>
    </div>

    <div class="library_info_container">
      <library-info v-for="(library, index) in libraries" :token="$store.state.token" :type="library" :key="index" />
    </div>

    <div class="recommendations_container">
      <Suspense>
        <template #default>
            <recommendations :token="$store.state.token" />
        </template>
        <template #fallback>
          <div class="loading">
            <h1>Loading...</h1>
            <i class="fas fa-spinner fa-spin"></i>
          </div>
        </template>
      </Suspense>
    </div>

    <div class="releases_container">
      <Suspense>
        <template #default>
            <new-releases :token="$store.state.token" />
        </template>
        <template #fallback>
          <div class="loading">
            <h1>Loading...</h1>
            <i class="fas fa-spinner fa-spin"></i>
          </div>
        </template>
      </Suspense>
    </div>

    <div class="featured_container">
      <Suspense>
        <template #default>
            <featured-playlists :token="$store.state.token" />
        </template>
        <template #fallback>
          <div class="loading">
            <h1>Loading...</h1>
            <i class="fas fa-spinner fa-spin"></i>
          </div>
        </template>
      </Suspense>
    </div>
  </div>
</template>

<script src="./Spotify-api.js"></script>
<style scoped lang="scss" src="./Spotify-api.scss"></style>
