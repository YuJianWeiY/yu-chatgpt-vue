import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import axios from 'axios';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import { Search } from '@element-plus/icons-vue';
import { Check } from '@element-plus/icons-vue';

const app = createApp(App);

app.use(ElementPlus);

// 配置全局属性
app.config.globalProperties.$axios = axios;

// 设置默认的 axios 基础 URL
axios.defaults.baseURL = 'http://43.130.240.98:15001';

// 将 Search 图标添加到全局属性中
app.config.globalProperties.Search = Search;

// 将 Check 图标添加到全局属性中
app.config.globalProperties.Check = Check;

// 使用路由
app.use(router);

// 挂载应用
app.mount('#app');
