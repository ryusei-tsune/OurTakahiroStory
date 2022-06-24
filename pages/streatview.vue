<template>
  <div>テンプレート{{test}}</div>
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
      test: 3,
      corArr: []
    }
  },
  watch: {},
  computed: {
    google() {
      return window.google
    }
  },
  created() {},
  beforeMount() {},
  mounted() {
    this.getStreatViewCordination()
  },
  beforeDestroy() {},
  methods: {
    // 引数としてやまりょうから店舗の位置情報を受け取る,google, origin, destination
    getStreatViewCordination() {
      const origin = "東京都庁"
      const destination = "茨城県庁"
      var directionsService = new google.maps.DirectionsService()
      var request = {
          // 開始地点
          origin: origin,
          // 終了地点
          destination: destination,
          // 移動方法：徒歩
          travelMode: google.maps.DirectionsTravelMode.WALKING,
          // 残り距離の表示がキロメートルになる
          unitSystem: google.maps.DirectionsUnitSystem.METRIC,
          // 
          optimizeWaypoints: true,
      }
      // thisのスコープの都合上コールバック関数ないでdataを使用するために代入する
      var corArr = this.corArr
      // requestを使ってルート検索
      var result = directionsService.route(request, function(result, status) {
          if (status == 'OK') {
            // 総距離
            var distanceText = result.routes[0].legs[0].distance.text.split(' ')
            var distance = Number(distanceText[0])
            // 距離に応じて取得する座標の数を決める
            var n
            if (distance < 0.1) {
              n = 1
            } else if (distance < 0.3){
              n = 2
            } else {
              n = 3
            }

            // 次の写真までの距離
            var splitDist = distance / (n + 1)

            var sum = 0
            var cnt = 0
            var i = 0
            var base = 0
            var len = result.routes[0].legs[0].steps.length

            while (cnt <= n && i < len) {
              var tmp = result.routes[0].legs[0].steps[i].distance.text.split(' ')
              // 距離の表記がmとkmの場合がある
              if (tmp[1] == 'm') {
                base = 1000
              } else if (tmp[1] == 'km') {
                base = 1
              }
              var number = Number(tmp[0])
              sum += number / base

              if (sum > splitDist * (cnt+1)) {
                var lat = result.routes[0].legs[0].steps[i].lat_lngs[0].lat()
                var lng = result.routes[0].legs[0].steps[i].lat_lngs[0].lng()
                corArr.push([lat, lng])
                cnt++
              }
              i++
            }
            var lat = result.routes[0].overview_path[0].lat()
            var lng = result.routes[0].overview_path[0].lng()
            return corArr
          }
      })
      // console.log('corArr')
      // console.log(this.corArr)
  },
  }
}
</script>
<style scoped>
</style>