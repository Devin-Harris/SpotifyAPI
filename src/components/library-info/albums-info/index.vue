<template>
  <Suspense>
    <template #default>
    <div class="albums_container">
      <p class="total">Total: {{ albums_info.total}}</p>
      <div class="album" v-for="album in albums_info.items" :key="album" @click="albumRedirect(album)">
        <h2 class="album_name">{{album.album.name}}</h2>
        <h4 class="album_date">{{ formateDate(album.added_at) }}</h4>
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

<script src="./albums-info.js"></script>
<style lang="scss" scoped src="./albums-info.scss">
</style>