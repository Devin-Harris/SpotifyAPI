export default {
  name: 'select-list',
  props: ['items', 'selectedItem', 'label'],
  data() {
    return {
      isDropdownOpen: false
    }
  },
  methods: {
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen

      if (this.isDropdownOpen) document.addEventListener('click', this.outsideCheck)
      else document.removeEventListener('click', this.outsideCheck)
    },
    outsideCheck() {
      this.isDropdownOpen = false
    },
    selectItem(item) {
      this.$emit('selected-item', item)
    }
  }
}