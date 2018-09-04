
import Vue from 'vue'
import weex from 'weex-vue-render'
weex.init(Vue)
import App from 'views/app.vue'
import buiweex from 'bui-weex'

Vue.use(buiweex);

App.el = '#root'

new Vue(App)