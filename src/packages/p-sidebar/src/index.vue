<template>
  <div class="sidebar-container">
    <div class="sidebar-title">
      <span class="sidebar-title-class">{{ title }}</span>
      <i class="iconfont icon-arrow-left"  @click="controlDisplay($event)"/>
    </div>
    <div class="sidebar-slot" v-if="pdata.iFon">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import {reactive} from "vue";

export default {
  name: "p-sidebar",
  props: {
    title: {
      type: String
    }
  },
  setup() {
    let pdata = reactive({
      iFon: true,
    })

    let controlDisplay = (e) => {// 控制隐藏
      let main = e.currentTarget.parentElement; // 获取当前父级DOM
      // let list = main.querySelector(".sidebarParentContent"); //获取Li列DOM
      // let icon = main.querySelector(".iconfont"); //获取Icon列DOM
      console.log(main);
      // if (list.classList.contains("ifShow")) { //判断当前状态是否隐藏；
      //   list.classList.remove("ifShow");
      //
      //   icon.classList.remove("icon-arrow-down");
      //   icon.classList.add("icon-arrow-up");
      // } else {
      //   list.classList.add("ifShow");
      //
      //   icon.classList.remove("icon-arrow-up");
      //   icon.classList.add("icon-arrow-down");
      // }
    };
    return {
      pdata,
      controlDisplay,
    }
  }
}
</script>

<style scoped>
.sidebar-container {
  height: 100%;
}
.sidebar-title {
  height: 26px;
  padding: 10px 10px 10px 20px;
}
.sidebar-title i:last-child {
  font-size: 26px;
  float: right;
}
.sidebar-title-class {
  font-size: 18px;
  font-weight: 460;
  color: #363639;
}
.sidebar-slot {
  margin-top: 100px;
}
</style>