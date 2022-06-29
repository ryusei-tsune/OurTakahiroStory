<template>
  <div>
    <div class="flex jsutify-center">
      <img src="/logo.png" class="logo mx-auto" />
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
    <div class="flex justify-center mx-auto max-w-lg">
      <div class="grid grid-cols-4 gap-4">
        <div class="flex justify-center items-center" v-for="(item, index) in imgItems" :key="`img-item-${index}`">
          <img
            :src="item"
            alt=""
            class="button-img"
            @click="selectGenre(index)"
            :class="{ ' selected': isSelected[index] }"
          />
        </div>
      </div>
    </div>
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
      isNone: false,
      width: window.innerWidth,
      height: window.innerHeight,
      handle_y: '-180px',
      handle_width: '50px',
      capsul_y: '-180px',
      capsul_width: '50px',
      corArr: [],
      latitude: 0,
      longitude: 0,
      imgItems: ['/any.png', '/japanese.png', '/western.png', 'chinese.png'],
      isSelected: [true, false, false, false],
      genre_code: ['G004', 'G005', 'G007'],
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
    // this.init()
    navigator.geolocation.watchPosition(
      (position) => {
        const location = position.coords
        this.latitude = location.latitude
        this.longitude = location.longitude
      },
      (err) => {
        this.isWatching = false
        console.log(err)
      },
      { enableHighAccuracy: true }
    )
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
      this.isHandle = true
      let genre_data = ''
      this.isSelected.forEach((element, index) => {
        if (element) {
          if (index === 0) {
            genre_data += '&genre=G004&genre=G005&genre=G007'
          } else {
            genre_data += `&genre=${this.genre_code[index - 1]}`
          }
        }
      })

      console.log(this.latitude, this.longitude)
      const post_data = { genre: genre_data, lat: this.latitude, lng: this.longitude }
      const { data } = await this.$axios.post('/api/search-eatery', post_data)
      console.log(data.data)
      if (!data.data) {
        this.isNone = true
        console.log(this.isNone)
      } else {
        await new Promise((resolve) => {
          setTimeout(() => {
            return resolve()
          }, 3200)
        })
        this.isGacha = true
        setTimeout(() => {
          this.isScale = true
          console.log(data.data[0])
          this.$store.commit('mutation', { data: data.data[0] })
          this.$router.push('/adventure')
        }, 1200)
      }
    },
    // setStore() {
    //   const google = this.google
    //   const map = new google.maps.Map(document.getElementById('gmap'), {
    //     //center: new google.maps.LatLng(this.latitude,this.longitude),
    //     center: new google.maps.LatLng(35.6813092, 139.7677269), //東京駅
    //     zoom: 15,
    //   })

    //   const placeService = new google.maps.places.PlacesService(map)

    //   placeService.nearbySearch(
    //     {
    //       location: new google.maps.LatLng(35.6813092, 139.7677269), //東京駅
    //       //location: new google.maps.LatLng(this.latitude,this.longitude),
    //       radius: 500,
    //       type: ['restaurant'],
    //     },
    //     (results, status) => {
    //       if (status == google.maps.places.PlacesServiceStatus.OK) {
    //         for (var i = 0; i < results.length; i++) {
    //           var place = results[i]
    //           this.store_info.push(place)
    //         }
    //         console.log(this.store_info)
    //       }
    //     }
    //   )
    // },
    selectGenre(index) {
      if (index === 0) {
        this.$set(this.isSelected, index, !this.isSelected[index])
      } else {
        this.$set(this.isSelected, 0, false)
        this.$set(this.isSelected, index, !this.isSelected[index])
        if (this.isSelected.filter((value) => value == false).length === 4) {
          this.$set(this.isSelected, 0, true)
        }
      }
    },
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
<style>
body {
  background-color: #69b3b7;
}
</style>
<style scoped>
.logo {
  width: 50%;
  max-width: 200px;
}
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
.button-img {
  width: 50%;
}
.selected {
  opacity: 0.5;
}
</style>
