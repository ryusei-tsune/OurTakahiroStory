<template>
  <div>
    <div style="padding-top: 100px">
      <div
        class="
          m-auto
          content-center
          justify-center
          text-center text-xl
          flex flex-wrap
          box-border
          h-20
          w-40
          border-4 border-[#F9D10D]
          bg-[#F2B816]
        "
      >
        <div class="font-bold text-white">目的地到着</div>
      </div>
    </div>
    <div class="bg" :style="{ height: imgHeight }" />
    <div class="text-white text-center destination">
      <div class="text-[#EF6CA8]" style="text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 15px #fff">
        {{ name }}
      </div>
    </div>
    <div class="m-auto justify-center flex">
      <div class="capsule"></div>
    </div>
    <nuxt-link to="/">
      <div class="flex justify-center">
        <div class="toTop"></div>
      </div>
      <div class="text-center text-white" style="position: relative; transform: translate(0, -60px)">Topへ</div>
    </nuxt-link>
    <div class="flex justify-center">
      <Footer></Footer>
    </div>
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
      innerHeight: window.innerHeight,
      name: '',
    }
  },
  watch: {},
  computed: {
    imgHeight() {
      return this.innerHeight + 'px'
    },
  },
  created() {},
  beforeMount() {},
  mounted() {
    window.addEventListener('resize', this.windowResize)
    this.name = this.$store.state.name
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.windowResize)
  },
  methods: {
    windowResize() {
      this.innerHeight = window.innerHeight
    },
  },
}
</script>
<style>
html {
  font-family: '游ゴシック体', YuGothic, '游ゴシック', 'Yu Gothic', sans-serif;
  font-weight: bold;
}
body {
  background-color: #69b3b7;
}
</style>
<style scoped>
.destination {
  font-weight: bold;
  font-size: 30px;
  animation: fade-in 2s 0s forwards;
}
@keyframes fade-in {
  0% {
    opacity: 0;
  }
  90% {
    opacity: 0;
    transform: scale(0.5) translate(0, 500%);
  }
  100% {
    opacity: 1;
    transform: scale(1) translate(0, 75%);
  }
}
.bg {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;

  width: 100vw;
  min-height: 100vh;
  background-image: url('/paper.png');
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100%;
  opacity: 1;
  -webkit-animation: anime 9s 0s 1;
  animation: anime 9s 0s 1;
  display: block;
  z-index: -2;
}
@keyframes anime {
  0% {
    opacity: 0;
    transform: scale(0);
  }
  10% {
    opacity: 0.9;
    transform: scale(0.9);
  }
  70% {
    opacity: 0.9;
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
.capsule {
  transform: translate(0, 10%);
  background-image: url('/capsule-open.png');
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: center;
  width: 100%;
  max-width: 500px;
  height: 300px;
  z-index: -1;
}
.toTop {
  background-image: url('/yellow.png');
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: center;
  width: 100px;
  height: 100px;
}
</style>
