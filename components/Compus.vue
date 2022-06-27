<template>
  <div v-if="!error" class="relative flex flex-col justify-center items-center w-10/12">
    <div class="perspective_wrapper">
      <div
        class="canvas-wrap bg-zinc-50 rounded-full border-slate-400 border-4"
        v-bind:style="{
          transform: 'rotate3d(1,0,0,' + beta_rev + 'deg)',
        }"
      >
        <!-- コンパス -->
        <canvas
          id="canvas2"
          width="100"
          height="100"
          v-bind:style="{
            transform: 'rotate3d(0,0,1,-' + heading + 'deg)',
          }"
        ></canvas>
        <!-- やじるし -->
        <canvas
          id="canvas"
          width="100"
          height="100"
          v-bind:style="{
            transform: 'rotate3d(0,0,1,' + heading_to_target + 'deg)',
          }"
        ></canvas>
      </div>
    </div>

    <button
      v-if="!hasAccess"
      class="absolute bottom-50b bg-zinc-50 w-[120px] h-[120px] rounded-full"
      @click="requestPermission"
    >
      コンパスを使う
    </button>
    <!-- 確認用　 -->
    <!-- <div class="bg-white txt-margin text-center">
      <p>
        向いてる角度(北0°)：<span>{{ parseInt(heading) }}</span
        ><span>°</span>
      </p>
      <p>
        向いてる方角：<span>{{ direction }} </span>
      </p>
      <p>
        目的地への角度(北0°)：<span>{{ parseInt(heading_to_target) }}</span
        ><span>°</span>
      </p>
      <p>
        props：<span>{{ parseInt(target_deg) }}</span
        ><span>°</span>
      </p>
      <p>
        beta:<span>{{ beta }}</span
        ><span>°</span>
      </p>
      <p>
        gamma:<span>{{ gamma }}</span
        ><span>°</span>
      </p>
    </div> -->
  </div>
</template>

<script>
function getMobileOperatingSystem() {
  var userAgent = navigator.userAgent || navigator.vendor || window.opera
  if (/windows phone/i.test(userAgent)) {
    return 'Windows Phone'
  }
  if (/android/i.test(userAgent)) {
    return 'Android'
  }
  if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
    return 'iOS'
  }
  return 'unknown'
}
function supported() {
  if (getMobileOperatingSystem() == 'Windows Phone') return false
  if (getMobileOperatingSystem() == 'unknown') return false
  return true
}

export default {
  head() {
    return {
      script: [
        {
          src: 'https://frogcat.github.io/canvas-arrow/canvas-arrow.js',
          callback: () => {
            this.drawArrow()
          },
        },
      ],
    }
  },
  layout: 'default',
  components: {},
  middleware: [],
  props: ['target_deg'],
  data: () => ({
    error: !supported() && 'ジャイロ機能がありません',
    permissionRequired: getMobileOperatingSystem() == 'iOS' || 'Android',
    hasAccess: false,
    heading: 0,
    heading_to_target: 0,
    beta: 0,
    gamma: 0,
  }),
  watch: {},
  computed: {
    //方角　確認用
    direction() {
      if (this.heading < 0) return 'Ooops'
      if (this.heading < 45 - 22.5) return 'North'
      if (this.heading < 90 - 22.5) return 'North-East'
      if (this.heading < 135 - 22.5) return 'East'
      if (this.heading < 180 - 22.5) return 'South-East'
      if (this.heading < 225 - 22.5) return 'South'
      if (this.heading < 270 - 22.5) return 'South-West'
      if (this.heading < 315 - 22.5) return 'West'
      if (this.heading < 360 - 22.5) return 'North-West'
      if (this.heading < 360) return 'North'
      return 'Ooops'
    },
  },
  created() {
    if (!this.permissionRequired) this.listen()
  },
  beforeMount() {},
  mounted() {},
  beforeDestroy() {},
  methods: {
    drawArrow() {
      const canvas2 = document.getElementById('canvas2')
      var context2 = canvas2.getContext('2d')
      context2.lineWidth = 2
      // context.fillStyle = '#0ff'
      context2.font = '15px sans-serif'
      context2.globalAlpha = 0.5

      context2.fillText('E', 90, 50)
      context2.fillText('W', 0, 50)
      context2.fillText('S', 45, 99)
      // context2.fillStyle = 'rgb(128,0,0)'
      context2.fillText('N', 45, 12)
      const canvas = document.getElementById('canvas')
      var context = canvas.getContext('2d')
      context.beginPath()
      context.arrow(50, 90, 50, 15, [30, 0, 20, 25, 20, 25])
      context.fillStyle = '#F2B816'
      // context.globalAlpha = 0.5
      context.fill()
    },
    //デバイスのジャイロ許可
    async requestPermission() {
      // The call of this function has to be the result of a user action
      try {
        const permissionState = await DeviceOrientationEvent.requestPermission()
        if (permissionState == 'granted') {
          this.hasAccess = true
          this.listen()
        } else {
          this.error = `Access ${permissionState}`
        }
      } catch {
        this.error = 'ジャイロ機能がありません'
      }
    },
    // デバイスの角度変わった時のイベント処理関数を追加
    listen() {
      if ('ondeviceorientationabsolute' in window) {
        window.addEventListener('deviceorientationabsolute', this.handle)
      } else if ('ondeviceorientation' in window) {
        window.addEventListener('deviceorientation', this.handle)
      } else {
        this.error = 'Device orientation not supported by your device'
      }
      this.drawArrow()
    },
    //イベント処理
    //heading　:デバイスの方角(北0°)
    //heading_to_target:　デバイスから目的地への方角(°)
    //beta_rev:デバイスの縦方向の傾き（矢印の奥行きを表現）
    handle(event) {
      let heading
      if (event.webkitCompassHeading) {
        heading = event.webkitCompassHeading
      } else if (event.absolute) {
        heading = event.alpha
      } else {
        return
      }
      this.gamma = parseInt(event.gamma)
      if (event.beta > 60) {
        // this.beta = 0
        this.beta_rev = 60
      } else if (event.beta < 0) {
        // this.beta = 80
        this.beta_rev = 0
      } else {
        // this.beta = 90 - parseInt(event.beta)
        this.beta_rev = event.beta
      }
      // Landscape mode
      if (window.innerWidth > window.innerHeight) {
        heading += 90
        heading %= 360
      }
      if (getMobileOperatingSystem() == 'Android') {
        heading = 360 - heading
      }
      this.heading = heading

      this.heading_to_target =
        this.target_deg - heading < 0 ? this.target_deg - heading + 360 : this.target_deg - heading
    },
  },
}
</script>
<style>
/* 奥行きを表現するためのdiv wrapper */
.perspective_wrapper {
  -webkit-perspective: 800px;
  -moz-perspective: 800px;
  perspective: 800px;
}

.canvas-wrap {
  width: 120px;
  height: 120px;
  max-width: 100%;
  position: relative;
  padding: 0;
  box-sizing: content-box;
}
.canvas_warp:before {
  content: '';
  display: block;
  padding-top: 50%;
}
#canvas {
  position: absolute;
  left: 10px;
  top: 10px;
  border: 0;
  max-width: 100%;
  box-sizing: content-box;
  padding: 0;
  margin: 0;
}
#canvas2 {
  position: absolute;
  left: 10px;
  top: 10px;
  border: 0;
  max-width: 100%;
  box-sizing: content-box;
  padding: 0;
  margin: 0;
}
</style>
