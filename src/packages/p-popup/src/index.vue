<template>
  <div class="box-top on">
    <div class="box">
      <i class="iconfont icon-close icon" @click="popupClose($event)"/>
      <div class="box-layout">
        <slot/>
      </div>
    </div>
  </div>
</template>

<script>
import {reactive} from "vue";

export default {
	name: "p-popup",
	props: {},
	setup() {
		let pdata = reactive({});
		let popupClose = () => {
			let list = document.querySelector(".box-top");
			//获取Li列DOM
			if (list.classList.contains("on")) {
				//判断当前状态是否隐藏；
				list.classList.remove("on");
			} else {
				list.classList.add("on");
			}
		};
		return {
			pdata,
			popupClose,
		};
	}
};
</script>

<style scoped>
.box-top {
  z-index: 99;
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(191, 191, 191, 0.78);
  /*居中*/
  /*display: grid;*/
  /*place-items: center;*/
}
  .box-top.on {
  display: none;
  }
  .box-top .box {
    width: 70%;
    height: 660px;
    border-radius: 16px;
    position: fixed;
    /*margin: 10% 20% 10% 20%;*/
    background-color: #F5F5F7;

    /*居中*/
    /*top: 50%;*/
    /*left: 50%;*/
    /*-webkit-transform: translate(-50%, -50%);*/
    /*-moz-transform: translate(-50%, -50%);*/
    /*-ms-transform: translate(-50%, -50%);*/
    /*-o-transform: translate(-50%, -50%);*/
    /*transform: translate(-50%, -50%);*/
  }
    .box-top .box i:first-child {
      margin: 20px;
      float: right;
      font-size: 26px;
    }
    .box-top .box .box-layout {
      width: 100%;
      height: 100%;
      padding: 40px;
      box-sizing: border-box;
    }

</style>
