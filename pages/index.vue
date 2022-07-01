<template>
  <div class="flex flex-col justify-start items-center space-y-4 pt-3 pb-10 h-screen">
    <div class="flex justify-center items-center space-y-1 w-full">
      <img src="/logo.png" width="70%" style="max-width: 400px" />
    </div>
    <div class="flex flex-col justify-center items-center space-y-1 w-full text-center">
      <p class="text-white" style="font-size: min(4.5vw, 24px)">友達と「この後ご飯に行こう！」となった時</p>
      <p class="text-white" style="font-size: min(4.5vw, 24px)">なかなかお店が決まらずに</p>
      <p class="text-white" style="font-size: min(4.5vw, 24px)">困った経験はありませんか？<br /><br /></p>
      <p class="text-white" style="font-size: min(4.5vw, 24px)">そんな時は "まわしてごはん" を使って</p>
      <p class="text-white" style="font-size: min(4.5vw, 24px)">お店に向かう道中も楽しみながら</p>
      <p class="text-white" style="font-size: min(4.5vw, 24px)">新しいお店を開拓しましょう！</p>
    </div>
    <nuxt-link to="/gacha" class="flex justify-center flex-col">
      <div class="startButton"></div>
      <div class="text-center text-white" style="position: relative; transform: translate(0, -60px)">はじめる</div>
    </nuxt-link>
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
    return {}
  },
  watch: {},
  computed: {},
  created() {},
  beforeMount() {},
  mounted() {},
  beforeDestroy() {},
  methods: {},
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
.startButton {
  background-image: url('/yellow.png');
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: center;
  width: 100px;
  height: 100px;
}
</style>
