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
      if (parseInt(this.minNum) > parseInt(this.maxNum)) this.minNum = this.maxNum
      if (parseInt(this.minNum) <= 0 || !this.minNum) this.minNum = 0
      this.$emit('min-num', this.minNum)
    },
    maxNum() {
      if (parseInt(this.maxNum) < parseInt(this.minNum)) this.maxNum = this.minNum
      if (parseInt(this.maxNum) > 100) this.maxNum = 100
      this.$emit('max-num', this.maxNum)
    }
  }
}