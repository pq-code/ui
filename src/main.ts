import App from './App.vue';
import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import zhCn from 'element-plus/es/locale/lang/zh-cn';
import './style.css';
// import './utils/types/types';

const app = createApp(App);
app.use(ElementPlus, { locale: zhCn });
app.mount('#app');
