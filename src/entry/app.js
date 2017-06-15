/**
 * Created by tonyyls on 2017/6/15.
 */
import App from '../views/app.vue'
import mixins from '../js/mixins.js'

Vue.mixin(mixins);

App.el = '#root'

new Vue(App)