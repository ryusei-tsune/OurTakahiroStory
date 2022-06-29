import Vue from 'vue'
import * as VueGoogleMaps from '~/node_modules/vue2-google-maps'

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyBCx7TJrgxghe3UGBp_Vuf898ZCtPpsoLc',
    libraries: 'places',
  },
})
