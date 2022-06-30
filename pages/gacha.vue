<template>
  <div class="flex flex-col h-screen justify-center items-center space-y-4 my-2">
    <nuxt-link to="/">
      <div class="flex jsutify-center">
        <img src="/logo.png" class="logo mx-auto mt-5" />
      </div>
    </nuxt-link>
    <div class="text-white text-xl mt-0">＼ タップしてガチャを回してね ／</div>
    <div v-if="isNone" class="text-red-600">指定したジャンルのお店が見つかりませんでした...</div>
    <div class="flex jsutify-center">
      <img src="/gacha.png" alt="" class="gacha-img mx-auto" />
    </div>
    <div :style="translate" class="flex jsutify-center">
      <div class="handle-img" :class="{ ' sunlight': !isHandle }">
        <img src="/handle.png" alt="" :class="{ 'handle-motion': isHandle }" @click="choice()" />
        <div v-for="i in 12" :key="`sunlight-item${i}`"></div>
      </div>
      <div class="push" v-if="!isHandle"><span class="material-symbols-outlined"> north_west </span>押してね！</div>
    </div>
    <div v-if="isGacha" class="gacha-capsul" :style="translate">
      <div class="capsule-motion flex justify-center text-white" :class="{ 'light-up': isLight }">
        <span class="material-symbols-outlined text-black"> question_mark </span>
      </div>
    </div>
    <div class="max-w-lg">
      <div class="grid grid-cols-4 gap-4" style="transform: translate(0, -100%)">
        <div v-for="(item, index) in imgItems" :key="`img-item-${index}`">
          <div class="flex justify-center items-center">
            <img
              :src="item.img"
              alt=""
              class="button-img"
              @click="selectGenre(index)"
              :class="{ ' selected': isSelected[index] }"
            />
          </div>
          <div class="text-center">{{ item.type }}</div>
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Footer from '../components/Footer.vue'
export default {
  head() {
    return {
      title: '',
    }
  },
  layout: 'default',
  components: {
    Footer,
  },
  middleware: [],
  data() {
    return {
      isHandle: false,
      isGacha: false,
      isLight: false,
      isNone: false,
      width: window.innerWidth,
      height: window.innerHeight,
      handle_y: '-180px',
      handleWidth: '50px',
      capsul_y: '-180px',
      capsulWidth: '50px',
      pushHight: '-200px',
      corArr: [],
      imgItems: [
        { img: '/any.png', type: 'なんでも' },
        { img: '/japanese.png', type: '日本食' },
        { img: '/western.png', type: '洋食' },
        { img: 'chinese.png', type: '中華' },
      ],
      isSelected: [true, false, false, false],
      genre_code: ['G004', 'G005', 'G007'],
    }
  },
  watch: {},
  computed: {
    translate() {
      return {
        '--handle-y': this.handle_y,
        '--handle-width': this.handleWidth,
        '--capsul-y': this.capsul_y,
        '--capsul-width': this.capsulWidth,
        '--push': this.pushHight,
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
    navigator.geolocation.watchPosition(
      (position) => {
        const location = position.coords
        this.$store.commit('currentPos', { lat: location.latitude, lng: location.longitude })
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

      const post_data = {
        genre: genre_data,
        lat: this.$store.state.currentPos.lat,
        lng: this.$store.state.currentPos.lng,
      }
      const { data } = await this.$axios.post('/api/search-eatery', post_data)
      await new Promise((resolve) => {
        setTimeout(() => {
          return resolve()
        }, 3200)
      })
      if (!data.status) {
        this.isNone = true
        this.isHandle = false
      } else {
        this.isGacha = true
        setTimeout(async () => {
          this.isLight = true
          this.$store.commit('mutation', { name: data.name, lat: data.lat, lng: data.lng })
          await new Promise((resolve) => {
            setTimeout(() => {
              return resolve()
            }, 200)
          })
          // this.$router.push('/adventure')
        }, 1200)
      }
    },
    selectGenre(index) {
      if (index === 0) {
        this.$set(this.isSelected, index, !this.isSelected[index])
        for (let i = 1; i < 4; i++) {
          this.$set(this.isSelected, i, false)
        }
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
        this.handle_y = `${-200 * rate}px`
        this.handleWidth = '40px'
        this.capsul_y = `${100 * rate}px`
        this.capsulWidth = '25px'
        this.pushHight = `${-150 * rate}px`
      } else {
        this.handle_y = '-200px'
        this.handleWidth = '50px'
        this.capsul_y = '80px'
        this.capsulWidth = '30px'
        this.pushHight = '-150px'
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
  max-width: 300px;
}
.gacha-img {
  width: 400px;
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
  animation: blow 3s linear infinite;
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
  transform: translate(50%, var(--push));
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
.handle-img:hover {
  cursor: pointer;
  transform: translate(0, var(--handle-y)) scale(1.1);
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
.light-up {
  box-shadow: 0 0 10px #ffc, 0 0 20px #ffc, 0 0 30px #ff9, 0 0 40px #ff6, 0 0 70px #fc6, 0 0 80px #f99, 0 0 100px #ff96,
    0 0 150px #ff96;
  border-radius: 100px;
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
  opacity: 0.5;
}
.button-img:hover {
  cursor: pointer;
  transform: scale(1.2);
}
.selected {
  opacity: 1;
}
</style>
