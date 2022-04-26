import { createApp,defineComponent,reactive } from 'vue';
import App from './App.vue';
import './assets/css/reset.scss';
import 'ant-design-vue/dist/antd.css';
import Antd from 'ant-design-vue';

createApp(App).use(Antd).mount('#app')
