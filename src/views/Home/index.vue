<template>
  <div class="home">
    <img alt="Vue logo" src="../../assets/logo.png" />
    <h1>New syntax in <span>Vue 3!</span></h1>
  </div>
  <div class="cards">
    <info-card class="card" v-for="card in cards" :card="card" :key="card" />
  </div>
  <h1>Using <span>Spotify API</span> with <span>Vue 3</span></h1>
  <info-card class="card" :card="'View Spotify Api'" />
</template>

<script src="./Home.js"></script>

<style lang="scss" src="./Home.scss">
</style>
