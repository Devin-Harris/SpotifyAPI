<template>
  <div class="container">
    <div class="information-header">
      <div class="btns-container">
        <button @click="goHome">Home</button>
        <button @click="goBack">{{created ? 'Go back' : 'Cancel' }}</button>
      </div>
    </div>

    <Suspense>
      <template #default>
        <div class="create-playlist-container" v-if="!created">
          <div class="playlist-add-information-container">
            <h1>Create a playlist</h1>

            <div class="playlist-labels">
              <div class="playlist-label">
                <h4>Name</h4>
                <input placeholder="Please enter a name..." v-model="playlist_info.name" type="text" />
              </div>
              <div class="playlist-label">
                <h4>Public</h4>
                <select @change="labelCheck('public')" v-model="playlist_info.public" name="public" id="public-selector">
                  <option value="true">True</option>
                  <option value="false">False</option>
                </select>
              </div>
              <div class="playlist-label">
                <h4>Collaborative</h4>
                <select @change="labelCheck('collaborative')" v-model="playlist_info.collaborative" name="collaborative" id="collaborative-selector">
                  <option value="true">True</option>
                  <option value="false">False</option>
                </select>
              </div>
              <div class="playlist-label description-label">
                <h4>Description</h4>
                <input placeholder="Please enter a description..." type="text" />
              </div>
            </div>

          </div>
          <div class="playlist-track-selection">

            <div class="total-selected" @click="toggleTrackEditor">
              <h4>Currently have <span>{{ totalSelected }}</span> songs selected...</h4>
              <i class="fas" :class="isTrackEditorExpanded ? 'fa-chevron-up' : 'fa-chevron-down'"></i>
            </div>

            <div class="tracks-editor-container" v-if="isTrackEditorExpanded">
              <div class="track-rows" :style="{'gridTemplateRows': 'repeat(' + tracks.length + ', 1fr)'}">
                <div class="track-row" v-for="(track, index) in tracks" :key="index" @click="toggleTrack(track)">

                  <div class="track-row-left">
                    <div class="track-picture" v-if="track.album.images.length > 0" :style="{backgroundImage: 'url(' + track.album.images[0].url + ')'}"></div>
                    <h1>{{ ++index }}.</h1>
                    <h2>{{ track.name }} by {{ getArtists(track) }}</h2>
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
          <button class="create-playlist-btn" :class="canCreate ? '' : 'un-active'" @click="createPlaylist">Create Playlist</button>
        </div>
      </template>
      <template #fallback>
        <div class="loading">
          <h1>Loading...</h1>
          <i class="fas fa-spinner fa-spin"></i>
        </div>
      </template>
    </Suspense>

    <div class="created-modal" v-if="created">
      <h1>
        Congrats!
        <br>
        <span>Your playlist has been successfully added</span>
      </h1>
    </div> 

  </div>
</template>

<script src="./create-playlist.js"></script>
<style scoped lang="scss" src="./create-playlist.scss"></style>
