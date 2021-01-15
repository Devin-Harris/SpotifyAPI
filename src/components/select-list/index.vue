<template>
  <div class="select-list-container">
    <div class="selected-item">
      <p class="selected-item-label">{{label}}</p>
      <div class="selected-item-text" @click.stop="toggleDropdown">
        <h2>{{selectedItem}}</h2>
        <i class="fas fa-chevron-down"></i>
      </div>
    </div>
    <div class="items-dropdown" v-if="isDropdownOpen">
      <div class="item" v-for="item in items" @click="selectItem(item)" :key="item">{{item}}<i class="fas fa-check" :class="{active: item === selectedItem}"></i></div>
    </div>
  </div>
</template>

<script src="./select-list.js"></script>
<style lang="scss" src="./select-list.scss"></style>