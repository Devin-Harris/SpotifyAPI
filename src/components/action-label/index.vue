<template>
  <div class="action-label-container">
    <div class="label-container" :class="{'open': (isDropdownOpen && isDropdown), 'hasDropdown': isDropdown}" @click="isDropdownOpen = !isDropdownOpen">
      <h4>{{label}}</h4>
      <i v-if="isDropdown" :class="isDropdownOpen ? 'fas fa-chevron-up' : 'fas fa-chevron-down'"></i>
      <div v-if="isEvaluation" class="evaluation">
        <input type="text" placeholder="0" v-model="minNum" />
        <i class="fas fa-less-than-equal"></i>
        <i class="fas fa-ellipsis-h"></i>
        <i class="fas fa-less-than-equal"></i>
        <input type="text" placeholder="100" v-model="maxNum" />
      </div>
    </div>
    <div v-if="isDropdown && isDropdownOpen">
      <slot></slot>
    </div>
  </div>
</template>

<script src="./action-label.js"></script>
<style src="./action-label.scss" lang="scss"></style>