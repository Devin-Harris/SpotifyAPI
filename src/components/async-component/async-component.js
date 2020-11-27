function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
export default {
  name: 'async-component',
  async setup(props, { emit }) {
    const timer = 3
    for (let i = timer; i > 0; i--) {
      emit('timeUpdate', i)
      await delay(1000)
    }
    return
  }
}