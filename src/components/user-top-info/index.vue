<template>
  <Suspense>
    <template #default>
      <div class="top-info">

        <div class="artist-rows" v-if="type === 'artists'" :style="{'gridTemplateRows': 'repeat(' + top_info.items.length + ', 1fr)'}">
          <div class="artist-row" v-for="(artist, index) in top_info.items" :key="index" @click="openSpotifyArtist(artist)">
            <div class="artist-picture" v-if="artist.images.length > 0" :style="{backgroundImage: 'url(' + artist.images[0].url + ')'}"></div>
            <div class="info-row-text">
              <h4>{{++index}}</h4>
              <h2>{{ artist.name }}</h2>
            </div>
            <div class="info-row-text">
              <h4>Followers</h4>
              <h2>{{ artist.followers.total }}</h2>
            </div>
            <div class="info-row-text">
              <h4>Popularity</h4>
              <h2>{{ artist.popularity }}</h2>
            </div>
          </div>
        </div>

        <button class="make-playlist-btn" @click="createPlaylist(top_info.items)" v-if="type === 'tracks'">Create a playlist from these tracks <i class="fas fa-list"></i></button>
        <div class="track-rows" v-if="type === 'tracks'" :style="{'gridTemplateRows': 'repeat(' + top_info.items.length + ', 1fr)'}">
          <div class="track-row" v-for="(track, index) in top_info.items" :key="index" @contextmenu="rightClick($event, track)" @click="openSpotifyTrack(track)">
            <div class="track-picture" v-if="track.album.images.length > 0" :style="{backgroundImage: 'url(' + track.album.images[0].url + ')'}"></div>
            <h1>{{ ++index }}.</h1>
            <h2>{{ track.name }} by {{ getArtists(track) }}</h2>
            <div v-if="track.queuePopup" class="queuePopup">
              <h1>Add to queue</h1>
              <i class="fas fa-plus"></i>
            </div>
          </div>
        </div>

        <div class="playlist-rows" v-if="type === 'playlists'" :style="{'gridTemplateRows': 'repeat(' + top_info.items.length + ', 1fr)'}">
          <div class="playlist-row" v-for="(playlist, index) in top_info.items" :key="index" @click="openSpotifyPlaylist(playlist)">
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
    </template>
    <template #fallback>
      <div class="loading">
        <h1>Loading...</h1>
        <i class="fas fa-spinner fa-spin"></i>
      </div>
    </template>
  </Suspense>
</template>

<script src="./user-top-info.js"></script>
<style lang="scss" scoped src="./user-top-info.scss">
</style>