import accountInfoTable from '@/components/account-info-table'
export default {
  name: 'account-info',
  props: ['token'],
  components: {
    accountInfoTable
  },
  data() {
    return {
      isInfoOpen: false
    }
  },
  methods: {
    toggleInfo() {
      this.isInfoOpen = !this.isInfoOpen
    }
  },
}