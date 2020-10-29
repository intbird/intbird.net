<template>
  <iframe src="https://www.intbird.net" title="intbird.net" class="root-layout">
  </iframe>
</template>

<script>
export default {
  name: 'iframe-page',
  data () {
    return {
      url: 'https://www.intbird.net/'
    }
  },
  created () {
    this.load()
  },
  methods: {
    load () {
      //this.url = this.$route.query.url ? this.$route.query.url : 'https://intbird.gitbook.io/'
    }
  }
}
</script>

<style scoped>
.root-layout {
  width: 1268px;
  min-height: 800px;
}
</style>
