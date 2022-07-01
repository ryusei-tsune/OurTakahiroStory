<template>
  <div class="text-center" style="font-size: 14px; color: rgb(100, 100, 100)">
    Powered by <a href="http://webservice.recruit.co.jp/">ホットペッパー Webサービス</a>
  </div>
</template>
<script>
export default {
  components: {},
  middleware: [],
  props: {
    prop1: {
      type: Number,
      required: false,
      default: 100,
    },
    prop2: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  data() {
    return {}
  },
  watch: {},
  created() {},
  beforeMount() {},
  mounted() {},
  beforeDestroy() {},
  methods: {},
}
</script>
<style scoped>
</style>
