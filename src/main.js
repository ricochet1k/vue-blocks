// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueDragula from 'vue-dragula';
import App from './App';

// import 'dragula/dist/dragula.css';

Vue.use(VueDragula);


/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
});
