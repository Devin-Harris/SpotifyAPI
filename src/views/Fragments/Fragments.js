export default {
  name: 'Fragments',
  setup() {
    const fragmentCode =
      `<template>
        <img src="./logo.png">
        <h1>Hello Vue 3!</h1>
        <button @click="inc">Clicked {{ count }} times.</button>
        <table>
          <tr>
            <fragment-component />
          </tr>
        </table>
    </template>


    <script>

    import { ref } from 'vue'
    import FragmentComponent from './test/FragmentComponent.vue'
    export default {
      components: {
        FragmentComponent
      },
    ...`

    return { fragmentCode }
  }
}