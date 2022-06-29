<template>
  <div class="bg-teal-600 flex flex-col h-screen justify-center items-center space-y-4">
    <div class="bg-yellow-500 text-center bg-opacity-100 w-10/12 p-4 border-yellow-400 border-4">
      <p class="text-white font-bold text-2xl">名前 : {{this.store_name}}</p>
    </div>
  </div>
</template>

<script>
export default {
  head() {},
  layout: 'default',
  components: {},
  middleware: [],
  data() {
    return {
      store_name: ""
    }
  },
  computed: {
    google() {
      return window.google
    },
  },
  created() {},
  beforeMount() {},
  mounted() {
    this.store_name = window.localStorage.getItem("store_name")
  },
  beforeDestroy() {},
}
</script>
