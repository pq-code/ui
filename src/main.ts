import App from './App.vue';
import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import './style.css';
// import './utils/types/types';

const app = createApp(App);

app.use(ElementPlus);
app.mount('#app');
