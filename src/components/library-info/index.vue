<template>
  <Suspense>
    <template #default>
      <div class="library_information">
        <div class="library-info-heading" :class="isInfoOpen ? 'open-heading' : 'closed-heading'" @click="toggleInfo">
          <h1>Your saved {{ type }}</h1>
          <i :class="isInfoOpen ? 'fas fa-chevron-up' : 'fas fa-chevron-down'"></i>
        </div>
        <div v-if="isInfoOpen">
          <Suspense>
            <template #default>
              <div>
                <div class="content">
                  <albums-info v-if="type == 'albums'" :token="token" :key="0" />
                  <tracks-info v-else-if="type == 'tracks'" :token="token" :key="1" />
                  <shows-info v-else-if="type == 'shows'" :token="token" :key="2" />
                </div>
              </div>
            </template>
            <template #fallback>
            <div class="loading">
              <h1>Loading user information...</h1>
              <i class="fas fa-spinner fa-spin"></i>
            </div>
            </template>
          </Suspense>
        </div>
      </div>
    </template>
    <template #fallback>
      <div class="loading">
        <h1>Loading user information...</h1>
        <i class="fas fa-spinner fa-spin"></i>
      </div>
    </template>
  </Suspense>
</template>

<script src="./library-info.js"></script>
<style lang="scss" scoped src="./library-info.scss">
</style>