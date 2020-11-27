<template>
  <div class="container">
    <div class="information-header">
      <div class="btns-container">
        <button @click="goHome">Home</button>
        <button @click="goBack">Go Back</button>
      </div>
    </div>     

    <Suspense>
      <template #default>
        <div class="artist-information" v-if="artist_information">

          <div class="artist-heading">
            <div class="artist-picture" v-if="artist_information && artist_information.images && artist_information.images.length > 0" :style="{backgroundImage: 'url(' + artist_information.images[0].url + ')'}"></div>
            <div class="artist-heading-text">
              <h1>{{ artist_information.name }}</h1>
              <button class="open-in-spotify" @click="redirectArtist">Open in spotify</button>
            </div>
          </div>

          <div class="artist-labels">
            <div class="artist-label" v-if="artist_information.followers">
              <h4>Followers</h4>
              <h6>{{ artist_information.followers.total }}</h6>
            </div>
            <div class="artist-label" v-if="artist_information.genres">
              <h4>Genres</h4>
              <h6 v-for="genre in artist_information.genres" :key="genre">{{genre}}</h6>
            </div>
            <div class="artist-label" v-if="artist_information.id">
              <h4>Id</h4>
              <h6>{{ artist_information.id }}</h6>
            </div>
          </div>

          <div class="dropdown-information albums_information">

            <div class="dropdown-information-heading albums-info-heading" :class="isAlbumInfoOpen ? '' : 'closed-heading'" @click="toggleAlbumInfo">
              <h1>Albums</h1>
              <i :class="isAlbumInfoOpen ? 'fas fa-chevron-up' : 'fas fa-chevron-down'"></i>
            </div>

            <div class="info-table" v-if="isAlbumInfoOpen">
              <div class="info-rows" :style="{'gridTemplateRows': 'repeat(' + albums_information.length + ', 1fr)'}">
                <div class="info-row" v-for="(album, index) in albums_information" :key="index" @click="openSpotifyAlbum(album)">
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
                    <h4>Popularity</h4>
                    <h2>{{ album.popularity }}</h2>
                  </div>
                  <div class="info-row-text">
                    <h4>Artists</h4>
                    <h2>{{ album.artists.map(artist => artist.name).join(', ') }}</h2>
                  </div>
                </div>
              </div>
            </div>

          </div>

          <div class="dropdown-information tracks_information">
            <div class="dropdown-information-heading tracks-info-heading" :class="isTracksInfoOpen ? '' : 'closed-heading'" @click="toggleTracksInfo">
              <h1>Top Tracks</h1>
              <i :class="isTracksInfoOpen ? 'fas fa-chevron-up' : 'fas fa-chevron-down'"></i>
            </div>

            <div class="info-table" v-if="isTracksInfoOpen">
              <div class="info-rows" :style="{'gridTemplateRows': 'repeat(' + top_tracks.tracks.length + ', 1fr)'}">
                <div class="info-row" v-for="(track, index) in top_tracks.tracks" :key="index" @contextmenu="rightClick($event, track)" @click="openSpotifyTrack(track)">
                  <div class="info-picture" :style="(track.album.images && track.album.images.length > 0) ? {backgroundImage: 'url(' + track.album.images[0].url + ')'} : {backgroundColor: '#2D2D2D'}"></div>
                  <div class="info-row-text">
                    <h4>Track Count: </h4>
                    <h2>{{ track.name }}</h2>
                  </div>
                  <div class="info-row-text">
                    <h4>Duration</h4>
                    <h2>{{ convertMS(track.duration_ms) }}</h2>
                  </div>
                  <div class="info-row-text">
                    <h4>Popularity</h4>
                    <h2>{{ track.popularity }}</h2>
                  </div>
                  <div class="info-row-text">
                    <h4>Artists</h4>
                    <h2>{{ track.artists.map(artist => artist.name).join(', ') }}</h2>
                  </div>

                  <div v-if="track.queuePopup" class="queuePopup">
                    <h1>Add to queue</h1>
                    <i class="fas fa-plus"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="dropdown-information related_information">

            <div class="dropdown-information-heading related-info-heading" :class="isRelatedInfoOpen ? '' : 'closed-heading'" @click="toggleRelatedInfo">
              <h1>Related Artists</h1>
              <i :class="isRelatedInfoOpen ? 'fas fa-chevron-up' : 'fas fa-chevron-down'"></i>
            </div>

            <div class="info-table" v-if="isRelatedInfoOpen">
              <div class="info-rows" :style="{'gridTemplateRows': 'repeat(' + related_artists.artists.length + ', 1fr)'}">
                <div class="info-row" v-for="(artist, index) in related_artists.artists" :key="index" @click="openSpotifyArtist(artist)">
                  <div class="info-picture" :style="(artist.images && artist.images.length > 0) ? {backgroundImage: 'url(' + artist.images[0].url + ')'} : {backgroundColor: '#2D2D2D'}"></div>
                  <div class="info-row-text">
                    <h4>Related artist</h4>
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

  </div>
</template>

<script src="./artist-info.js"></script>
<style scoped lang="scss" src="./artist-info.scss"></style>
