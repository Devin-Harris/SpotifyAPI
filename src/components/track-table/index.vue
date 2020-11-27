<template>
  <div class="information_table">
    
    <div class="track_information">
      <div class="track-heading">
        <div class="track-picture" v-if="track_information && track_information.images && track_information.images.length > 0" :style="{backgroundImage: 'url(' + track_information.images[0].url + ')'}"></div>
        <h1>{{ track_information.name }}</h1>
        <button class="open-in-spotify" @click="redirectTrack">Open in spotify</button>
      </div>

      <div class="track-labels">
        <div class="track-label">
          <h4>Artist(s)</h4>
          <h6>{{track_information.artists.map(artist => artist.name).join(', ')}}</h6>
        </div>
        <div class="track-label">
          <h4>Duration</h4>
          <h6>{{ convertMS(track_information.duration_ms)}}</h6>
        </div>
        <div class="track-label">
          <h4>Popularity</h4>
          <h6>{{ track_information.popularity}}</h6>
        </div>
        <div class="track-label">
          <h4>Track Number</h4>
          <h6>{{ track_information.track_number }} / {{track_information.album.total_tracks}}</h6>
        </div>
        <div class="track-label">
          <h4>Explicit</h4>
          <h6>{{ track_information.explicit }}</h6>
        </div>
        <div class="track-label">
          <h4>Id</h4>
          <h6>{{ track_information.id }}</h6>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./track-table.js"></script>
<style lang="scss" scoped src="./track-table.scss">
</style>