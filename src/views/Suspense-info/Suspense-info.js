import asyncComponent from '@/components/async-component'
import Loading from '@/components/Loading'

export default {
  name: 'Suspense-info',
  components: {
    asyncComponent,
    Loading
  },
  data() {
    return {
      time: 3
    }
  },
  methods: {
    timeUpdate(time) {
      this.time = time
    },
    getTime() {
      return this.time
    }
  },
}