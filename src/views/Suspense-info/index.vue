<template>
  <Suspense>
    <template #default>
      <div>
        <asyncComponent @timeUpdate="timeUpdate" />
        <button>Start new sequence</button>
      </div>
    </template>
    <template #fallback>
      <Loading :time="getTime()"/>
    </template>
  </Suspense>
</template>
<script src="./Suspense-info.js"></script>

<style scoped lang="scss" src="./Suspense-info.scss">
</style>
