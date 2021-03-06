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
        <div class="user-playlist-information">

          <div class="playlist-combine-information-container">
            <h1>Split playlists</h1>

            <div class="how-it-works">

              <div class="how-it-works__label" @click="toggleHowItWorks">
                <p>How the <span>Splitter</span> works</p>
                <i class="fas" :class="howItWorksOpen ? 'fa-times' : 'fa-info-circle'"></i>
              </div>

              <ol class="how-it-works__info" v-if="howItWorksOpen">
                <li>The splitter works by taking all the songs from 1 playlist and creating a new playlist from them</li>
                <li>Splitting on Genres will take all songs within the selected playlist that have the a genre that matches a selected genre</li>
                <li>Splitting on Artists will take all songs within the selected playlist that have an artist that matches a selected artist</li>
                <li>Splitting on Albums will take all songs within the selected playlist that are in a album that matches a selected album</li>
                <li>Splitting on Popularity will take all songs selected from other constraints and filter out all songs not within set popularity range</li>
              </ol>

            </div>
          </div>

          <select-list class="select-playlist" :label="'Select a Playlist'" @selected-item="selectPlaylist" :items="playlistNames" :selectedItem="selectedPlaylist.name" />

          <div class="playlist-split-toggles">
            <p v-if="selectedPlaylist && selectedPlaylist.tracks && selectedPlaylist.tracks.items">Total tracks: {{selectedPlaylist.tracks.items.length}}</p>
            <h2>Separate tracks into new playlists by...</h2>
            <div class="toggles">
              <div class="toggle" v-for="toggle in toggles" :key="toggle">
                <input type="checkbox" @click="checkboxChanged(toggle)" :name="toggle" :id="`${toggle}-toggle`" />
                <label @click="toggleCheckbox(toggle)" :for="toggle">{{toggle}}</label>
              </div>
            </div>
          </div>

          <div v-if="genreToggle" class="available-genres available-inputs">
            <action-label :label="'Available Genres'" :isDropdown="true">
              <div class="dropdown-container">
                <div class="genre input-section" v-for="genre in availableGenres" :key="genre" @click="selectGenre(genre, 'click')">
                  <input type="checkbox" :name="genre" :id="`genre-${genre}`" @click.stop @change="selectGenre(genre, 'change')" :checked="isGenreSelected(genre)">
                  <label :for="genre">{{genre}}</label>
                </div>
              </div>
            </action-label>
          </div>
          <div v-if="artistToggle" class="available-artists available-inputs">
            <action-label :label="'Available Artists'" :isDropdown="true">
              <div class="dropdown-container">
                <div class="artist input-section" v-for="artist in availableArtists" :key="artist" @click="selectArtist(artist, 'click')">
                  <input type="checkbox" :name="artist" :id="`artist-${artist}`" @click.stop @change="selectArtist(artist, 'change')" :checked="isArtistSelected(artist)">
                  <label :for="artist">{{artist}}</label>
                </div>
              </div>
            </action-label>
          </div>
          <div v-if="albumToggle" class="available-albums available-inputs">
            <action-label :label="'Available Albums'" :isDropdown="true">
              <div class="dropdown-container">
                <div class="album input-section" v-for="album in availableAlbums" :key="album" @click="selectAlbum(album, 'click')">
                  <input type="checkbox" :name="album" :id="`album-${album}`" @click.stop @change="selectAlbum(album, 'change')" :checked="isAlbumSelected(album)">
                  <label :for="album">{{album}}</label>
                </div>
              </div>
            </action-label>
          </div>
          <div v-if="popularityToggle" class="popularity-slider available-inputs">
            <action-label :label="'Popularity'" :isEvaluation="true" @min-num="setMinNum($event)" @max-num="setMaxNum($event)"></action-label>
          </div>

          <i @click="generatePlaylist" class="fas fa-sitemap"></i>
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

<script src="./playlist-splitter.js"></script>
<style scoped lang="scss" src="./playlist-splitter.scss"></style>
