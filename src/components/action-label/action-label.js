export default {
  name: 'action-label',
  props: ['label', 'isDropdown', 'isEvaluation'],
  data() {
    return {
      isDropdownOpen: false,
      minNum: 0,
      maxNum: 100
    }
  },
  watch: {
    minNum() {
      if (this.minNum > this.maxNum) this.minNum = this.maxNum
      this.$emit('min-num', this.minNum)
    },
    maxNum() {
      if (this.maxNum < this.minNum) this.maxNum = this.minNum
      this.$emit('max-num', this.maxNum)
    }
  }
}