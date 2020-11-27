<template>
  <div class="releases_information">
    <div class="releases-info-heading" :class="isInfoOpen ? '' : 'closed-heading'" @click="toggleInfo">
      <h1>New Releases</h1>
      <i :class="isInfoOpen ? 'fas fa-chevron-up' : 'fas fa-chevron-down'"></i>
    </div>
    <div class="info-table" v-if="isInfoOpen">
      <div class="info-rows" :style="{'gridTemplateRows': 'repeat(' + albums_information.albums.items.length + ', 1fr)'}">
        <div class="info-row" v-for="(album, index) in albums_information.albums.items" :key="index" @click="openSpotifyAlbum(album)">
          <div class="info-picture" :style="album.images.length > 0 ? {backgroundImage: 'url(' + album.images[0].url + ')'} : {backgroundColor: '#2D2D2D'}"></div>
          <div class="info-row-text">
            <h4>Track Count: {{ album.total_tracks }}</h4>
            <h2>{{ album.name }}</h2>
          </div>
          <div class="info-row-text">
            <h4>Release Date</h4>
            <h2>{{ album.release_date }}</h2>
          </div>
          <div class="info-row-text">
            <h4>Artists</h4>
            <h2>{{ album.artists.map(artist => artist.name).join(', ') }}</h2>
          </div>
        </div>
      </div>
    </div>
  </div> 
</template>

<script src="./new-releases.js"></script>
<style lang="scss" scoped src="./new-releases.scss">
</style>