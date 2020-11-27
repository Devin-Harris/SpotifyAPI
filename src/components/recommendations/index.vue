<template>
  <h1 id="recommendations_title">View your recommended tracks based on your preferences</h1>
  <div class="recommendations-btns">
    <div class="seed-btns">
      <button :class="currentRecommendationSeed === 'artists' ? 'active' : ''" @click.prevent="changeSeed('artists')">Artists</button>
      <button :class="currentRecommendationSeed === 'tracks' ? 'active' : ''" @click.prevent="changeSeed('tracks')">Tracks</button>
      <button :class="currentRecommendationSeed === 'genres' ? 'active' : ''" @click.prevent="changeSeed('genres')">Genres</button>
    </div>
    <div class="refresh-btns">
      <button class="right-btn" @click.prevent="updateRecommendations">Get New Recommendations</button>
    </div>
  </div>

  <div class="select_container">
    <select @change="genreSelection" v-if="currentRecommendationSeed === 'genres'" name="genre-selector" id="genre-selector">
      <option value="" >Please Select a genre...</option>
      <option v-for="genre in genres" :key="genre" :value="genre">{{genre}}</option>
    </select>
  </div>
  
  <div v-if="currentRecommendationSeed !== null" class="information">

    <button
      class="make-playlist-btn"
      v-if="currentRecommendationSeed !== 'genres' || (currentRecommendationSeed === 'genres' && genre)"
      @click="createPlaylist(recommendations_info)"
    >
      Create a playlist from these tracks
      <i class="fas fa-list"></i>
    </button>

    <div class="track-rows" v-if="currentRecommendationSeed === 'artists'" :style="{'gridTemplateRows': 'repeat(' + recommendations_info.artists.tracks.length + ', 1fr)'}">
      <div class="track-row" v-for="(track, index) in recommendations_info.artists.tracks" :key="index" @contextmenu="rightClick($event, track)" @click="openSpotifyTrack(track)">
        <div class="track-picture" v-if="track.album.images.length > 0" :style="{backgroundImage: 'url(' + track.album.images[0].url + ')'}"></div>
        <h1>{{ ++index }}.</h1>
        <h2>{{ track.name }} by {{ getArtists(track) }}</h2>
        <div v-if="track.queuePopup" class="queuePopup">
          <h1>Add to queue</h1>
          <i class="fas fa-plus"></i>
        </div>
      </div>
    </div>

    <div class="track-rows" v-if="currentRecommendationSeed === 'tracks'" :style="{'gridTemplateRows': 'repeat(' + recommendations_info.tracks.tracks.length + ', 1fr)'}">
      <div class="track-row" v-for="(track, index) in recommendations_info.tracks.tracks" :key="index" @contextmenu="rightClick($event, track)" @click="openSpotifyTrack(track)">
        <div class="track-picture" v-if="track.album.images.length > 0" :style="{backgroundImage: 'url(' + track.album.images[0].url + ')'}"></div>
        <h1>{{ ++index }}.</h1>
        <h2>{{ track.name }} by {{ getArtists(track) }}</h2>
        <div v-if="track.queuePopup" class="queuePopup">
          <h1>Add to queue</h1>
          <i class="fas fa-plus"></i>
        </div>
      </div>
    </div>

    <div class="track-rows" v-if="currentRecommendationSeed === 'genres'" :style="{'gridTemplateRows': 'repeat(' + recommendations_info.genres.tracks.length + ', 1fr)'}">
      <div class="track-row" v-for="(track, index) in recommendations_info.genres.tracks" :key="index" @contextmenu="rightClick($event, track)" @click="openSpotifyTrack(track)">
        <div class="track-picture" v-if="track.album.images.length > 0" :style="{backgroundImage: 'url(' + track.album.images[0].url + ')'}"></div>
        <h1>{{ ++index }}.</h1>
        <h2>{{ track.name }} by {{ getArtists(track) }}</h2>
        <div v-if="track.queuePopup" class="queuePopup">
          <h1>Add to queue</h1>
          <i class="fas fa-plus"></i>
        </div>
      </div>
    </div>

  </div>
</template>

<script src="./recommendations.js"></script>
<style lang="scss" scoped src="./recommendations.scss">
</style>