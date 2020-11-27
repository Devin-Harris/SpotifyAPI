<template>
  <div class="information_table">
    <!--<img v-if="user_information && user_information.images.length > 0" :src="user_information.images[0].url" alt="profile picture">-->
    <div class="profile_picture" v-if="user_information && user_information.images.length > 0" :style="{backgroundImage: 'url(' + user_information.images[0].url + ')'}"></div>
    <div class="information_table_rows">
      <div class="information_row">
        <h4>Display Name: </h4>
        <h6>{{ user_information.display_name }}</h6>
      </div>
      <div class="information_row">
        <h4>Email: </h4>
        <h6>{{ user_information.email }}</h6>
      </div>
      <div class="information_row">
        <h4>Followers: </h4>
        <h6>{{ user_information.followers.total }}</h6>
      </div>
      <div class="information_row">
        <h4>Country: </h4>
        <h6>{{ user_information.country }}</h6>
      </div>
      <div class="information_row">
        <h4>Premium: </h4>
        <h6>{{ user_information.product === 'premium' ? 'True' : 'False' }}</h6>
      </div>
    </div>
  </div>
  <div class="recently-played">
    <h4>Recently Played Tracks</h4>
    <div class="recently-played-songs">
      <p class="recently-played-song" @click="redirectSong(item)" v-for="item in recently_played.items" :key="item">{{item.track.name}}<span>,</span></p>
    </div>
  </div>
</template>

<script src="./account-info-table.js"></script>
<style lang="scss" scoped src="./account-info-table.scss">
</style>