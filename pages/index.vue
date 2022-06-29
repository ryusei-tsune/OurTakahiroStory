<template>
  <div>
    <div class="m-auto justify-center flex">
      <div class="logo"></div>
    </div>
    <div class="text-center text-white">＼ タップしてガチャを回してね ／</div>
    <div class="flex jsutify-center">
      <img src="/gacha.png" alt="" class="gacha-img mx-auto" />
    </div>
    <div :style="translate">
      <div class="handle-img mx-auto" :class="{ ' sunlight': !isHandle }">
        <img src="/handle.png" alt="" :class="{ 'handle-motion': isHandle }" @click="turnOn()" />
        <div v-for="i in 12" :key="`sunlight-item${i}`"></div>
      </div>
      <div class="push" v-if="!isHandle" style="color: white">
        <span class="material-symbols-outlined" style="color: black"> north_west </span>押してね！
      </div>
    </div>
    <div v-if="isGacha" class="gacha-capsul mx-auto" :style="translate">
      <div class="capsule-motion flex justify-center" :class="{ 'zoom-up': isScale }">
        <span class="material-symbols-outlined"> question_mark </span>
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
      width: window.innerWidth,
      height: window.innerHeight,
      handle_y: '-180px',
      handle_width: '50px',
      capsul_y: '-180px',
      capsul_width: '50px',
      corArr: [],
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
  },
  created() {},
  beforeMount() {},
  mounted() {
    window.addEventListener('resize', this.windowResize)
    this.windowResize()
    this.$store.commit('mutation', { data: '胡白' })
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.windowResize)
  },
  methods: {
    async turnOn() {
      this.isHandle = !this.isHandle
      await new Promise((resolve) => {
        setTimeout(() => {
          return resolve()
        }, 3200)
      })
      this.isGacha = true
      setTimeout(() => {
        this.isScale = true
      }, 1200)
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
  background-color: rgb(100, 170, 180);
}
</style>
<style scoped>
.logo {
  background-image: url('/logo.png');
  background-size: 50%;
  background-repeat: no-repeat;
  background-position: center;
  width: 100%;
  max-width: 300px;
  height: 100px;
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
}
.zoom-up {
  z-index: 1;
  box-shadow: 0 0 10px #ffc, 0 0 20px #ffc, 0 0 30px #ff9, 0 0 40px #ff6, 0 0 70px #fc6, 0 0 80px #f99, 0 0 100px #ff96,
    0 0 150px #ff96;
  border-radius: 20px;
}
</style>
