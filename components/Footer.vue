<template>
  <div class="text-center footer">
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
.footer {
  position: absolute;
  bottom: 1%;
  font-size: 14px;
}
</style>
