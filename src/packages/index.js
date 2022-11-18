
import Vue from "vue";
// 导入组件
import Plink from './p-link/src/index'
import Phead from './p-head/src/index'
import Pheaditem from './p-head/src/p-head-item'
import Pcontainer from './p-container/src/index'
import Pheader from './p-header/src/index'
import Pmain from './p-main/src/index'
import Paside from  './p-aside/src/index'
import pinput from  './p-input/src/p-input'
import pbutton from  './p-button/src/index'
import pselector from  './p-selector/src/index'
import pcard from  './p-card/src/index'
import pcollapse from  './p-collapse/src/index'
import psidebar from './p-sidebar/src/index'
import ppopup from './p-popup/src/index'

// 存储组件列表
const components = [
    Pcontainer,
    Pheaditem,
    Pheader,
    Paside,
    Pmain,
    Plink,
    Phead,
    pinput,
    pbutton,
    pselector,
    pcard,
    pcollapse,
    psidebar,
    ppopup
]

// 定义 install 方法，接收 Vue 作为参数。如果使用 use 注册插件，则所有的组件都将被注册
const install = function (Vue) {
    // 判断是否安装
    if (install.installed) return
    // 遍历注册全局组件

    components.map((component) => {
        Vue.component(component.name, component)})
}

// 判断是否是直接引入文件
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue)
}
export default {
    version: '0.0.1',
    // 导出的对象必须具有 install，才能被 Vue.use() 方法安装
    install,
    // // 以下是具体的组件列表
    // Pcontainer,
    // Pheader,
    // Pmain,
    // Paside,
    // Plink,
    // Phead,
    // pinput,
    // pbutton,
    // pselector,
    // pcard,
    // pcollapse,

}