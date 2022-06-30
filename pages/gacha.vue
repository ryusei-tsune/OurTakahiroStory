<template>
  <div class="flex flex-col justify-start items-center space-y-4 pt-3 pb-10 h-screen">
    <nuxt-link to="/">
      <div class="flex jsutify-center">
        <img src="/logo.png" class="logo mx-auto" />
      </div>
    </nuxt-link>
    <div class="text-white mt-0">＼ タップしてガチャを回してね！ ／</div>
    <div v-if="isNone" class="text-red-600 text-center text-lg">指定したジャンルのお店が見つかりませんでした...</div>
    <div class="flex jsutify-center">
      <img src="/gacha.png" alt="" class="gacha-img mx-auto" />
    </div>
    <div :style="translate" class="flex jsutify-center">
      <div class="handle-img" :class="{ ' sunlight': !isHandle }">
        <img src="/handle.png" alt="" :class="{ 'handle-motion': isHandle }" @click="choice()" />
        <div v-for="i in 12" :key="`sunlight-item${i}`"></div>
      </div>
    </div>
    <div v-if="isGacha" class="gacha-capsul" :style="translate">
      <div class="capsule-motion flex justify-center text-white">
        <div class="question"></div>
      </div>
    </div>
    <div class="max-w-lg grid grid-cols-4 gap-4 mx-2" style="transform: translate(0, -50%)">
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
        <div class="text-center text-white">{{ item.type }}</div>
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
      isNone: false,
      width: window.innerWidth,
      height: window.innerHeight,
      handle_y: '-180px',
      handleWidth: '50px',
      capsul_y: '-180px',
      capsulWidth: '50px',
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
      this.isNone = false
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
          this.$router.push('/adventure')
        }, 1200)
      }
    },
    selectGenre(index) {
      if (index === 0) {
        this.$set(this.isSelected, index, true)
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
        const diff = 400 - this.width
        this.handle_y = `${-200 * rate}px`
        this.handleWidth = '40px'
        this.capsul_y = `${405 - diff * rate}px`
        this.capsulWidth = '25px'
      } else {
        this.handle_y = '-200px'
        this.handleWidth = '50px'
        this.capsul_y = '395px'
        this.capsulWidth = '30px'
      }
    },
  },
}
</script>
<style>
html {
  font-family: 'Yu Gothic Bold', '游ゴシック Bold', YuGothic, '游ゴシック体', 'ヒラギノ角ゴ Pro W3', 'メイリオ',
    sans-serif;
}
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
  background: #ef6ca8;
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
  width: 100%;
  opacity: 0.5;
}
.selected {
  opacity: 1;
}
.question {
  background-image: url('/question.png');
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: center;
  width: 20px;
  height: auto;
  z-index: 2;
}
</style>
