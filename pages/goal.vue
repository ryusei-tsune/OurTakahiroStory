<template>
  <div>
    テンプレート
    <div class="bg" :style="{ height: imgHeight }" />
    <div class="capsule"></div>
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
      innerHeight: window.innerHeight,
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
body {
  background-color: aquamarine;
}
</style>
<style scoped>
.bg {
  top: 0;
  left: 0;
  width: 100vw;
  min-height: 100vh;
  background-image: url('/confetti.png');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
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
    transform: scale(1);
  }
  70% {
    opacity: 0.9;
  }
  100% {
    opacity: 1;
    transform: scale(1.15);
  }
}
.capsule {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, 20%);
  background-image: url('/capsule.png');
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: center;
  width: 20%;
  height: 20%;
}
</style>
