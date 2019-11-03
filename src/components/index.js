import MyBread from '@/components/my-bread.vue'
import MyChannel from '@/components/my-channel.vue'

export default {
  install (Vue) {
    Vue.component('my-bread', MyBread)
    Vue.component('my-channel', MyChannel)
  }
}
