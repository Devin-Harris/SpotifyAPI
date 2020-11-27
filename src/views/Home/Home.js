import infoCard from '@/components/info-card'

export default {
  name: 'Home',
  components: {
    infoCard
  },
  setup(props) {
    const cards = ['Fragments', 'Composition Api', 'Suspense']
    return { cards }
  }
}