<template>
  <div>
    <div class="flex justify-center">Test</div>
    <div class="flex justify-center">
      <!-- h1タグの文字も大きくならない(タグなしと同じになる) -->
      <h1>Test</h1>
    </div>
    <div class="flex justify-center">
      <h1 class="text-3xl font-bold underline">Tailwind CSS aa</h1>
    </div>
    <div class="flex justify-center">
      <div id="map"></div>
    </div>
  </div>
</template>

<script>
import { Loader } from 'google-maps'
export default {
  head() {
    return {
      title: '',
    }
  },
  layout: 'default',
  components: {},
  middleware: [],
  data() {
    return {
      map: null,
    }
  },
  watch: {},
  computed: {},
  created() {},
  beforeMount() {},
  mounted() {
    this.getGoogleMap()
  },
  beforeDestroy() {},
  methods: {
    async getGoogleMap() {
      const loader = new Loader(this.$config.apiKey)
      const google = await loader.load()

      // templateの<div ref="map">に地図を表示
      this.map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 35.6809591, lng: 139.7673068 }, // 東京駅
        zoom: 15,
        streetViewControl: false,
        mapTypeControl: false,
        fullscreenControl: false,
      })
    },
  },
}
</script>
<style scoped>
#map {
  width: 400px;
  height: 300px;
}
</style>
