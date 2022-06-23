<template>
  <div>
    <div class="text-center">Test</div>
    <div class="flex jsutify-center">
      <img src="/gacha.png" alt="" class="gacha-img mx-auto" />
    </div>
    <div class="handle-img mx-auto" :style="translate">
      <img src="/handle.png" alt="" :class="{ 'handle-motion': isHandle }" />
    </div>
    <div v-if="isGacha" class="gacha-capsul mx-auto" :style="translate">
      <div class="capsule-motion flex justify-center">
        <!-- <span class="material-symbols-outlined"> question_mark </span> -->
        店
      </div>
    </div>
    <div class="flex jsutify-center">
      <button
        class="mx-auto w-12 h-12 bg-blue-400 text-lg text-white font-semibold rounded-full hover:bg-blue-500"
        @click="turnOn()"
      >
        回す
      </button>
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
      width: window.innerWidth,
      height: window.innerHeight,
      handle_y: '-180px',
      handle_width: '50px',
      capsul_y: '-180px',
      capsul_width: '50px',
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
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.windowResize)
  },
  methods: {
    turnOn() {
      this.isHandle = !this.isHandle
      setTimeout(() => {
        this.isGacha = true
      }, 3200)
    },
    windowResize() {
      this.width = window.innerWidth
      this.height = window.innerHeight
      if (this.width < 400) {
        const rate = this.width / 400
        this.handle_y = `${-180 * rate}px`
        this.handle_width = '40px'
        this.capsul_y = `${-175 * rate}px`
        this.capsul_width = '25px'
      } else {
        this.handle_y = '-180px'
        this.handle_width = '50px'
        this.capsul_y = '-175px'
        this.capsul_width = '30px'
      }
    },
  },
}
</script>
<style>
body {
  background-color: aquamarine;
}
</style>
<style scoped>
.gacha-img {
  width: 400px;
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

  /* animation: poyon 3s 1 forwards; */
}
.capsule-motion {
  width: var(--capsul-width);
  height: var(--capsul-width);
  border-radius: 50%;
  background-color: white;
  border: 1px solid gray;
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
</style>
