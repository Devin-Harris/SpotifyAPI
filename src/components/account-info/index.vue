<template>
  <Suspense>
    <template #default>
      <div class="account_information">
        <div class="account-info-heading" :class="isInfoOpen ? '' : 'closed-heading'" @click="toggleInfo">
          <h1>Your Spotify account information</h1>
          <i :class="isInfoOpen ? 'fas fa-chevron-up' : 'fas fa-chevron-down'"></i>
        </div>
        <div v-if="isInfoOpen">
          <Suspense>
            <template #default>
              <div>
                <account-info-table :token="token" :key="token" />
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

<script src="./account-info.js"></script>
<style lang="scss" scoped src="./account-info.scss">
</style>