<template>
  <Suspense>
    <template #default>
      <div class="shows_container">
        <p class="total">Total: {{ shows_info.total}}</p>
        <div class="show" v-for="show in shows_info.items" :key="show" @click="showRedirect(show)">
          <h2 class="show_name">{{ show.show.name }}</h2>
          <h4 class="show_description">{{show.show.description}}</h4>
          <div class="show_date">
            <h3>Added on: </h3>
            <h4> {{ formateDate(show.added_at) }}</h4>
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

<script src="./shows-info.js"></script>
<style lang="scss" scoped src="./shows-info.scss">
</style>