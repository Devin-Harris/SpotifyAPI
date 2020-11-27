<template>
  <Suspense>
    <template #default>
      <div class="tracks_container">
        <p class="total">Total: {{ tracks_info.total}}</p>
        <div class="track" v-for="track in tracks_info.items" :key="track" @click="trackRedirect(track)">
          <h2 class="track_name">{{ track.track.name.split('(')[0] }}</h2>
          <h4 class="track_name"><span v-for="(artist, index) in track.track.artists" :key="artist">{{ index === track.track.artists.length - 1 ? artist.name : artist.name + ', ' }}</span></h4>
          <h4 class="track_date">{{ formateDate(track.added_at) }}</h4>
        </div>
      </div>
    </template>
    <template #fallback>
      <div class="loading">
        <h1>Loading...</h1>
        <i class="fas fa-spinner fa-spin"></i>
      </div>
    </template>
  </Suspense>
</template>

<script src="./tracks-info.js"></script>
<style lang="scss" scoped src="./tracks-info.scss">
</style>