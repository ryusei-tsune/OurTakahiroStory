<template>
  <div>
    Test
    <h1>Test</h1>
    <!-- h1タグの文字も大きくならない(タグなしと同じになる) -->
    <h1 class="text-3xl font-bold underline">Tailwind CSS aa</h1>
    <Tutorial />
  </div>
</template>

<script>
import Tutorial from '~/components/Tutorial.vue'
export default {
  head() {
    return {
      title: '',
    }
  },
  layout: 'default',
  components: {
    Tutorial,
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
