<template>
  <div class="bg-[#69B3B7]">
    <div class="text-center text-5xl pt-10">
      <span class="p-2" style="background-color: white"> 回してごはん </span>
    </div>
    <div class="flex jsutify-center">
      <img src="/gacha.png" alt="" class="gacha-img mx-auto" />
    </div>
    <div :style="translate">
      <div class="handle-img mx-auto" :class="{ ' sunlight': !isHandle }">
        <img src="/handle.png" alt="" :class="{ 'handle-motion': isHandle }" @click="choice()" />
        <div v-for="i in 12" :key="`sunlight-item${i}`"></div>
      </div>
      <div class="push" v-if="!isHandle"><span class="material-symbols-outlined"> north_west </span>押してね！</div>
    </div>
    <div v-if="isGacha" class="gacha-capsul mx-auto" :style="translate">
      <div class="capsule-motion flex justify-center" :class="{ 'zoom-up': isScale }">
        <span class="material-symbols-outlined"> question_mark </span>
      </div>
    </div>
    <!-- <div class="flex jsutify-center">
      <button
        class="mx-auto w-12 h-12 bg-blue-400 text-lg text-white font-semibold rounded-full hover:bg-blue-500"
        @click="turnOn()"
      >
        回す
      </button>
    </div>
    <nuxt-link to="/goal">goal</nuxt-link> -->

    <!-- <div class="bg-[#69B3B7] flex flex-col h-screen justify-center items-center space-y-4">
    <div class="flex flex-col justify-center items-center space-y-1 w-full">
      <img src="../pages/gohan.png" width="250" height="125" />
    </div>
    <div class="flex flex-row justify-center items-center space-x-5 w-full">
      <p class="text-white text-xl font-bold">＼ タップしてガチャを回してね ／</p>
    </div>
    <div class="flex flex-row justify-center items-center space-x-5 w-full">
      <img src="../pages/machine.png" width="400" height="800" />
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
       "
      >
        回す！
      </button>
    </div>
    <div class="flex flex-col justify-center items-center space-y-1 w-full">
      <div class="h-0 w-0" id="gmap"></div>
    </div> -->
  </div>
</template>

<script>
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
      isHandle: false,
      isGacha: false,
      isScale: false,
      width: window.innerWidth,
      height: window.innerHeight,
      handle_y: '-180px',
      handle_width: '50px',
      capsul_y: '-180px',
      capsul_width: '50px',
      corArr: [],
      latitude: 0,
      longitude: 0,
    }
  },
  watch: {},
  computed: {
    translate() {
      return {
        '--handle-y': this.handle_y,
        '--handle-width': this.handle_width,
        '--capsul-y': this.capsul_y,
        '--capsul-width': this.capsul_width,
      }
    },
    google() {
      return window.google
    },
  },
  created() {},
  beforeMount() {},
  mounted() {
    window.addEventListener('resize', this.windowResize)
    this.windowResize()
    this.init()
    this.$store.commit('mutation', { data: '胡白' })
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.windowResize)
  },
  methods: {
    init() {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.latitude = position.coords.latitude //現在緯度
          this.longitude = position.coords.longitude //現在経度
          const google = this.google
          const map = new google.maps.Map(document.getElementById('gmap'), {
            center: new google.maps.LatLng(this.latitude, this.longitude),
            zoom: 15,
          })
        },
        (err) => {
          this.isWatching = false
          console.log(err)
        },
        { enableHighAccuracy: true }
      )
    },
    async choice() {
      // this.store_index = Math.floor(Math.random() * this.store_info.length)
      // this.store_name = this.store_info[this.store_index].name
      // this.store_latitude = this.store_info[this.store_index].geometry.location.lat()
      // this.store_longitude = this.store_info[this.store_index].geometry.location.lng()
      //console.log(this.store_name)
      //console.log(this.store_latitude)
      //console.log(this.store_longitude)
      // window.localStorage.setItem('store_name', this.store_name) //名前(getItemで受け取る)
      // window.localStorage.setItem('store_latitude', this.store_latitude) //緯度(getItemで受け取る)
      // window.localStorage.setItem('store_longitude', this.store_longitude) //経度(getItemで受け取る)
      this.isHandle = true
      await new Promise((resolve) => {
        setTimeout(() => {
          return resolve()
        }, 3200)
      })
      this.isGacha = true
      setTimeout(() => {
        this.isScale = true
        console.log(this.isScale)
        this.$router.push('/adventure')
      }, 1200)
    },
    setStore() {
      const google = this.google
      const map = new google.maps.Map(document.getElementById('gmap'), {
        //center: new google.maps.LatLng(this.latitude,this.longitude),
        center: new google.maps.LatLng(35.6813092, 139.7677269), //東京駅
        zoom: 15,
      })

      const placeService = new google.maps.places.PlacesService(map)

      placeService.nearbySearch(
        {
          location: new google.maps.LatLng(35.6813092, 139.7677269), //東京駅
          //location: new google.maps.LatLng(this.latitude,this.longitude),
          radius: 500,
          type: ['restaurant'],
        },
        (results, status) => {
          if (status == google.maps.places.PlacesServiceStatus.OK) {
            for (var i = 0; i < results.length; i++) {
              var place = results[i]
              this.store_info.push(place)
            }
            console.log(this.store_info)
          }
        }
      )
    },
    async turnOn() {},
    windowResize() {
      this.width = window.innerWidth
      this.height = window.innerHeight
      if (this.width < 400) {
        const rate = this.width / 400
        this.handle_y = `${-180 * rate}px`
        this.handle_width = '40px'
        this.capsul_y = `${-170 * rate}px`
        this.capsul_width = '25px'
      } else {
        this.handle_y = '-180px'
        this.handle_width = '50px'
        this.capsul_y = '-178px'
        this.capsul_width = '30px'
      }
    },
  },
}
</script>
<style scoped>
.gacha-img {
  width: 400px;
}
.btn-effect {
  animation: grow 4s linear infinite;
  /* animation: blow 4s linear infinite; */
  border-radius: 50%;
}
.sunlight div {
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 2;
}

.sunlight div::before {
  content: '';
  position: absolute;
  top: 0;
  left: 30px;
  width: 10px;
  height: 5px;
  background: #00bbff;
  border-radius: 100%;
  animation: blow 4s linear infinite;
}

.sunlight div:nth-child(1) {
  transform: rotate(0deg);
}

.sunlight div:nth-child(2) {
  transform: rotate(30deg);
}

.sunlight div:nth-child(3) {
  transform: rotate(60deg);
}

.sunlight div:nth-child(4) {
  transform: rotate(90deg);
}

.sunlight div:nth-child(5) {
  transform: rotate(120deg);
}

.sunlight div:nth-child(6) {
  transform: rotate(150deg);
}

.sunlight div:nth-child(7) {
  transform: rotate(180deg);
}

.sunlight div:nth-child(8) {
  transform: rotate(210deg);
}

.sunlight div:nth-child(9) {
  transform: rotate(240deg);
}

.sunlight div:nth-child(10) {
  transform: rotate(270deg);
}

.sunlight div:nth-child(11) {
  transform: rotate(300deg);
}

.sunlight div:nth-child(12) {
  transform: rotate(330deg);
}
@keyframes blow {
  0% {
    width: 5px;
  }
  50% {
    width: 15px;
  }
  100% {
    width: 5px;
  }
}
/*
@keyframes grow {
  0% {
    box-shadow: 0 0 10px 5px rgb(198, 198, 198), 0 0 20px 10px rgb(255, 180, 60, 0 0 30px 20px rgb(250, 105, 30; */
/* box-shadow: 0 0 10px 5px rgb(198, 198, 198), 0 0 20px 10px rgb(60, 160, 255, 0 0 30px 20px rgb(50, 88, 255;
    box-shadow: 0 0 10px 5px rgb(198, 198, 198), 0 0 20px 10px rgb(255, 180, 60), 0 0 30px 20px rgb(250, 105, 30);
  }
  20% {
    box-shadow: 0 0 20px 10px rgb(198, 198, 198), 0 0 30px 15px rgb(255, 180, 60), 0 0 40px 25px rgb(250, 105, 30);
  }
  40% {
    box-shadow: 0 0 30px 15px rgb(198, 198, 198), 0 0 40px 20px rgb(255, 180, 60), 0 0 50px 30px rgb(250, 105, 30);
  }
  60% {
    box-shadow: 0 0 30px 15px rgb(198, 198, 198), 0 0 40px 20px rgb(255, 180, 60), 0 0 50px 30px rgb(250, 105, 30);
  }
  80% {
    box-shadow: 0 0 20px 10px rgb(198, 198, 198), 0 0 30px 15px rgb(255, 180, 60), 0 0 40px 25px rgb(250, 105, 30);
  }
  100% {
    box-shadow: 0 0 10px 5px rgb(198, 198, 198), 0 0 20px 10px rgb(255, 180, 60), 0 0 30px 20px rgb(250, 105, 30);
  }
} */
.push {
  position: absolute;
  transform: translate(50%, var(--capsul-y));
  left: 50%;
}

@keyframes rotate {
  0% {
    transform: rotate(0);
  }
  30% {
    transform: rotate(90deg);
  }
  50% {
    transform: rotate(180deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.handle-img {
  position: relative;
  width: var(--handle-width);
  transform: translate(0, var(--handle-y));
}
@keyframes rotate {
  0% {
    transform: rotate(0);
  }
  30% {
    transform: rotate(90deg);
  }
  50% {
    transform: rotate(180deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.handle-motion {
  animation: rotate 3s 1;
}
.gacha-capsul {
  position: absolute;
  transform: translate(-50%, var(--capsul-y));
  left: 50%;
}
.capsule-motion {
  background-image: url('/capsule.png');
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: center;
  width: var(--capsul-width);
  height: var(--capsul-width);
  z-index: 1;
  animation: fall 1.1s linear 0s 1;
}
@keyframes fall {
  0% {
    transform: translate(0%, -100%);
  }
  10% {
    transform: translate(0%, -15%);
  }
  20% {
    transform: translate(0%, 30%);
  }
  30% {
    transform: translate(0%, -10%);
  }
  40% {
    transform: translate(0%, -30%);
  }
  50% {
    transform: translate(0%, -10%);
  }
  60% {
    transform: translate(0%, 5%);
  }
  70% {
    transform: translate(0%, 0%);
  }
  100% {
    transform: translate(0%, 0%);
  }
}
.zoom-up {
  z-index: 1;
  /* animation: zoom 5s 0s 1; */
}
@keyframes zoom {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(10);
  }
}
</style>
