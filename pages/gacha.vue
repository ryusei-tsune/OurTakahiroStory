<template>
<div class="bg-[#69B3B7] flex flex-col h-screen justify-center items-center space-y-4">
<div class="flex flex-col justify-center items-center space-y-1 w-full">
  <img src="../pages/gohan.png" width="250" height="125">
</div>
  <div class="flex flex-row justify-center items-center space-x-5 w-full">
    <p class="text-white text-xl font-bold">＼ タップしてガチャを回してね ／</p>
    </div>
      <div class="flex flex-row justify-center items-center space-x-5 w-full">
    <img src="../pages/machine.png" width="400" height="800">
      </div>
    <div class="flex flex-row justify-center items-center space-x-5 w-full">
    <button
      class="
        bg-[#EF6CA8]
        //hover:bg-yellow-400
        text-white
        font-bold
        text-xl
        py-10
        px-4
        rounded-full
        border-[#FC8DBB] border-4
        focus:shadow-outline
      "
      @click="choice()"
    >
    回す！
    </button>
  </div>
  <div class="flex flex-col justify-center items-center space-y-1 w-full">
    <div class="h-0 w-0" id="gmap"></div>
  </div>
</div>
</template>

<script>
export default {
  head() {},
  layout: 'default',
  components: {},
  middleware: [],
  data() {
    return {
      latitude : 0,
      longitude : 0,
      store_index : 0,
      store_name : "",
      store_latitude : 0,
      store_longitude : 0,
      store_info : []
    }
  },
  computed: {
    google() {
      return window.google
    },
    index() {
      return this.genre_index
    },
    length(){
      return this.store_info.length
    },
    store(){
      return this.store_name
    }
  },
  mounted() {
    this.init()
    this.setStore()
  },
  methods: {
    choice(){
      this.store_index = Math.floor( Math.random() * this.store_info.length )
      this.store_name = this.store_info[this.store_index].name
      this.store_latitude = this.store_info[this.store_index].geometry.location.lat()
      this.store_longitude = this.store_info[this.store_index].geometry.location.lng()
      //console.log(this.store_name)
      //console.log(this.store_latitude)
      //console.log(this.store_longitude)
      window.localStorage.setItem("store_name", this.store_name) //名前(getItemで受け取る)
      window.localStorage.setItem("store_latitude", this.store_latitude) //緯度(getItemで受け取る)
      window.localStorage.setItem("store_longitude", this.store_longitude) //経度(getItemで受け取る)
      this.$router.push('/adventure')
    },
    init() {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.latitude = position.coords.latitude //現在緯度
          this.longitude = position.coords.longitude //現在経度
          const google = this.google
          const map = new google.maps.Map(document.getElementById('gmap'), {
            center: new google.maps.LatLng(this.latitude,this.longitude),
            zoom: 15
          })
          },
        (err) => {
          this.isWatching = false
          console.log(err)
        },
        { enableHighAccuracy: true }
      )
    },
    setStore(){
      const google = this.google
      const map = new google.maps.Map(document.getElementById('gmap'), {
        //center: new google.maps.LatLng(this.latitude,this.longitude),
        center: new google.maps.LatLng(35.6813092, 139.7677269), //東京駅
        zoom: 15
      })

      const placeService = new google.maps.places.PlacesService(map)

      placeService.nearbySearch(
      {
        location: new google.maps.LatLng(35.6813092, 139.7677269), //東京駅
        //location: new google.maps.LatLng(this.latitude,this.longitude),
        radius: 500,
        type: ['restaurant']
      },
      (results, status) => {
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
          var place = results[i]
          this.store_info.push(place)
      }
      console.log(this.store_info)
      }
      })
    },
  },
}
</script>
