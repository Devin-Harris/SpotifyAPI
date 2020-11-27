<template>
  <div class="releases_information">
    <div class="releases-info-heading" :class="isInfoOpen ? '' : 'closed-heading'" @click="toggleInfo">
      <h1>Featured Playlists</h1>
      <i :class="isInfoOpen ? 'fas fa-chevron-up' : 'fas fa-chevron-down'"></i>
    </div>
    <div class="info-table" v-if="isInfoOpen">
      <div class="playlist-rows" :style="{'gridTemplateRows': 'repeat(' + featured_information.playlists.items.length + ', 1fr)'}">
        <div class="playlist-row" v-for="(playlist, index) in featured_information.playlists.items" :key="index" @click="openSpotifyPlaylist(playlist)">
          <div class="playlist-picture" :style="playlist.images.length > 0 ? {backgroundImage: 'url(' + playlist.images[0].url + ')'} : {backgroundColor: '#2D2D2D'}"></div>
          <div class="playlist-row-text">
            <h4>Track Count: {{ playlist.tracks.total }}</h4>
            <h2>{{ playlist.name }}</h2>
          </div>
          <div class="playlist-row-text">
            <h4 :class="playlist.public ? 'public-text' : 'private-text'">{{ playlist.public ? 'Public' : 'Private' }}</h4>
            <h2>Owner: <span>{{ playlist.owner.display_name }}</span></h2>
          </div>
          <div class="playlist-row-text">
            <h4 :class="playlist.collaborative ? 'public-text' : 'private-text'">{{ playlist.collaborative ? 'Collaborative' : 'Not Collaborative' }}</h4>
            <h2>Id: <span>{{ playlist.id }}</span></h2>
          </div>
        </div>
      </div>
    </div>
  </div> 
</template>

<script src="./featured-playlists.js"></script>
<style lang="scss" scoped src="./featured-playlists.scss">
</style>