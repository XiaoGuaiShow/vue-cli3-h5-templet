import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import FastClick from 'fastclick'
import { Tabbar, TabItem } from 'mint-ui';
import 'lib-flexible'
import '@/utils/permission'
import 'styles/common.scss'
import * as filters from './filters/';

FastClick.attach(document.body);
Vue.config.productionTip = false;
Vue.config.errorHandler = (err) => {
    console.error(err);
};

Vue.component(Tabbar.name, Tabbar);
Vue.component(TabItem.name, TabItem);

// 注册过滤器
Object.keys(filters).forEach((key) => {
    Vue.filter(key, filters[key]);
});

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
