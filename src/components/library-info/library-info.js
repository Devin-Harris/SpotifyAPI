import albumsInfo from '@/components/library-info/albums-info'
import tracksInfo from '@/components/library-info/tracks-info'
import showsInfo from '@/components/library-info/shows-info'
export default {
  name: 'library-info',
  props: ['token', 'type'],
  components: {
    albumsInfo,
    tracksInfo,
    showsInfo
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