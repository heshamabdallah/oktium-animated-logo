<template>
  <div id="app">
    <div>{{ dummyText }}</div>
    <app-loading v-model="loadingStatus" />
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import AppLoading from './components/AppLoading.vue'
export default {
  name: 'app',
  computed: {
    ...mapState([
      'loadingStatus'
    ]),
    dummyText () {
      return ('Lorem ipsum is placeholder text commonly used in the graphic and publishing. ').repeat(100)
    }
  },
  methods: {
    ...mapMutations([
      'setLoadingStatus'
    ])
  },
  created() {
    // Simulate AJAX request
    this.setLoadingStatus(true)
    setTimeout(() => {
      this.setLoadingStatus(false)
    }, 2000)
  },
  components: {
    AppLoading
  }
}
</script>

<style>
body {
  margin: 0;
  padding: 15px;
  background: #ddd;
}
</style>
