<template>
  <div class="container">
    <div class="information-header">
      <div class="btns-container">
        <button @click="goHome">Home</button>
        <button @click="goBack">{{combined ? 'Go back' : 'Cancel' }}</button>
      </div>
    </div>

    <Suspense>
      <template #default>
        <div class="combine-playlist-container" v-if="!combined">

          <div class="playlist-combine-information-container">
            <h1>Combine playlists</h1>

            <div class="how-it-works">

              <div class="how-it-works__label" @click="toggleHowItWorks">
                <p>How the <span>Combiner</span> works</p>
                <i class="fas" :class="howItWorksOpen ? 'fa-times' : 'fa-info-circle'"></i>
              </div>

              <ol class="how-it-works__info" v-if="howItWorksOpen">
                <li>The combiner works by adding songs from 1 playlist into another</li>
                <li>You cannot select the same playlist in the To and From dropdowns</li>
                <li>All songs already in the from playlist will not be added to avoid duplications</li>
                <li>You can also only add songs to playlists you own</li>
              </ol>

            </div>
          </div>
          
          <div class="playlist-selectors">
            <div class="selector">
              <select-list v-if="selectedToPlaylist" :label="'Playlist to add tracks to:'" class="select-playlist" @selected-item="selectPlaylist($event, 'to')" :items="playlistToNames" :selectedItem="selectedToPlaylist.name" />
            </div>

            <div class="selector">
              <select-list v-if="selectedFromPlaylist" :label="'Playlist to add tracks from:'" class="select-playlist" @selected-item="selectPlaylist($event, 'from')" :items="playlistNames.filter(name => name !== selectedToPlaylist.name)" :selectedItem="selectedFromPlaylist.name" />
            </div>
          </div>

          <div class="playlist-track-selection">

            <div class="total-selected" @click="toggleTrackEditor">
              <h4>Currently adding <span>{{ totalSelected }}</span> songs to <span v-if="selectedToPlaylist">{{selectedToPlaylist.name}}</span>...</h4>
              <i class="fas" :class="isTrackEditorExpanded ? 'fa-chevron-up' : 'fa-chevron-down'"></i>
            </div>

            <div class="tracks-editor-container" v-if="isTrackEditorExpanded">
              <div class="track-rows" :style="{'gridTemplateRows': 'repeat(' + tracksToAdd.length + ', 1fr)'}">
                <div class="track-row" v-for="(track, index) in tracksToAdd" :key="index" @click="toggleTrack(track)">

                  <div class="track-row-left">
                    <div class="track-picture" v-if="track.track.album.images.length > 0" :style="{backgroundImage: 'url(' + track.track.album.images[0].url + ')'}"></div>
                    <h1>{{ ++index }}.</h1>
                    <h2>{{ track.track.name }} by {{ getArtists(track) }}</h2>
                  </div>
                  
                  <div class="track-row-right">
                    <div class="track-selector-checkbox" :class="track.isSelected ? 'selected' : 'un-selected'">
                      <i class="fas" :class="track.isSelected ? 'fa-check' : 'fa-times'"></i>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>

          <!-- <div @click="toggleDeleteFrom" class="delete-from-playlist-container">
            <input type="checkbox" class="delete-from-playlist" name="delete-from-playlist" :checked="deleteFromPlaylist" />
            <label for="delete-from-playlist">Delete <span>{{selectedFromPlaylist.name}}</span> from your playlists</label>
          </div> -->

          <button class="combine-playlist-btn" :class="canCombine ? '' : 'un-active'" @click="combinePlaylist">Combine Playlists</button>
        </div>
      </template>
      <template #fallback>
        <div class="loading">
          <h1>Loading...</h1>
          <i class="fas fa-spinner fa-spin"></i>
        </div>
      </template>
    </Suspense>

    <div class="created-modal" v-if="combined">
      <h1>
        Congrats!
        <br>
        <span>Your playlist has been successfully combined</span>
      </h1>
    </div> 

  </div>
</template>

<script src="./playlist-combiner.js"></script>
<style scoped lang="scss" src="./playlist-combiner.scss"></style>
