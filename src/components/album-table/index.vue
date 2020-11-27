<template>
  <div class="information_table">
    
    <div class="album_information">
      <div class="album-heading">
        <div class="album-picture" v-if="album_information && album_information.images && album_information.images.length > 0" :style="{backgroundImage: 'url(' + album_information.images[0].url + ')'}"></div>
        <div class="album-heading-text">
          <h4>Featured in album</h4>
          <h1>{{ album_information.name }}</h1>
          <button class="open-in-spotify" @click="redirectAlbum">Open in spotify</button>
        </div>
      </div>

      <div class="album-labels">
        <div class="album-label">
          <h4>Artist(s)</h4>
          <h6>{{album_information.artists.map(artist => artist.name).join(', ')}}</h6>
        </div>
        <div class="album-label">
          <h4>Release Date</h4>
          <h6>{{album_information.release_date}}</h6>
        </div>
        <div class="album-label">
          <h4>Popularity</h4>
          <h6>{{ album_information.popularity}}</h6>
        </div>
        <div class="album-label">
          <h4>Total Tracks</h4>
          <h6>{{ album_information.total_tracks }}</h6>
        </div>
        <div class="album-label">
          <h4>Label</h4>
          <h6>{{ album_information.label }}</h6>
        </div>
        <div class="album-label">
          <h4>Id</h4>
          <h6>{{ album_information.id }}</h6>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./album-table.js"></script>
<style lang="scss" scoped src="./album-table.scss">
</style>