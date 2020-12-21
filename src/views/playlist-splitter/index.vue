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
          <select-list class="select-playlist" @selected-item="selectPlaylist" :items="playlistNames" :selectedItem="selectedPlaylist.name" />
          <div class="playlist-split-toggles">
            <h2>Seperate tracks into new playlists by...</h2>
            <div class="toggles">
              <div class="toggle" v-for="toggle in toggles" :key="toggle">
                <input type="checkbox" :name="toggle" :id="`${toggle}-toggle`" />
                <label @click="toggleCheckbox(toggle)" :for="toggle">{{toggle}}</label>
              </div>
            </div>
            <i class="fas fa-sitemap"></i>
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

<script src="./playlist-splitter.js"></script>
<style lang="scss" src="./playlist-splitter.scss"></style>
