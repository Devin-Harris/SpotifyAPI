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
        <div @click="addToQueue" class="tables">
          <button class="queue-btn">Add to queue</button>
          <track-table :token="$store.state.token" :trackId="$route.params.trackId"/>        
          <album-table :token="$store.state.token" :albumId="albumId" v-if="albumId"/>
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

<script src="./track-info.js"></script>
<style scoped lang="scss" src="./track-info.scss"></style>
