import Vue from 'vue'
import App from './App.vue'
import 'amfe-flexible/index.js'
import router from './router'
import store from './store'
import 'vant/lib/button/style'
import 'vant/lib/uploader/style'
import 'vant/lib/image/style'
import 'vant/lib/icon/style'
import 'vant/lib/panel/style'
import 'vant/lib/radio-group/style'
import 'vant/lib/radio/style'
import 'vant/lib/field/style'
import 'vant/lib/cell/style'
import CellGroup from 'vant/lib/cell-group'
Vue.use(Cell).use(CellGroup);
import  Uploader from 'vant/lib/uploader';
import Cell from 'vant/lib/cell';
import  Image  from 'vant/lib/image';
import  Icon  from 'vant/lib/icon';
import Button from 'vant/lib/button';
import Panel from 'vant/lib/panel';
import  RadioGroup from 'vant/lib/radio-group';
import  Radio from 'vant/lib/radio';
import Field from 'vant/lib/field';
import Row from 'vant/lib/row';
import 'vant/lib/row/style'
import Col from 'vant/lib/col'
import 'vant/lib/col/style'
// import 'vant/lib/toast/style'
// import Toast from 'vant/lib/toast'
// Vue.use(Toast);
import 'vant/lib/overlay/style'
import Overlay from 'vant/lib/overlay';
import 'vant/lib/loading/style'
import Loading from 'vant/lib/loading'
Vue.use(Loading);
Vue.use(Overlay);
import "vant/lib/lazyload/style"
import LazyLoad from  'vant/lib/lazyload'
Vue.use(LazyLoad);
Vue.use(Row).use(Col);
Vue.use(Field);
Vue.use(RadioGroup);
Vue.use(Radio);
Vue.use(Panel);
Vue.use(Button);
Vue.use(Icon);
Vue.use(Uploader);
Vue.use(Image);
import {post, fetch, patch, put, imgUpload} from './http'
Vue.prototype.$post = post;
Vue.prototype.$fetch = fetch;
Vue.prototype.$patch = patch;
Vue.prototype.$put = put;
Vue.prototype.$imgUpload = imgUpload;
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
