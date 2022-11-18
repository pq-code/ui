<template>
<!--props传值形式-->
  <ul class="drawerList" v-if="off">
    <li class="drawerItem" v-for="(items, indexs) of casedata">
    <!--标题-->
      <div
        class="sidebarParentTitile"
        :id="indexs"
        :key="items.key ??= indexs"
        @click="controlDisplay($event)"
      >
        <span class="SidebarHead">{{ items.label}}</span>
        <i class="iconfont icon-arrow-up"/>
      </div>
    <!--列表内容-->
      <div class="sidebarParentContent">
        <p-link class="home-detail-title"
          v-for="(item, index) of items.children"
          :href="item.phref ??= '/home'"
          :key="item.key"
          :target="item.target"
        >
          <div class="column">
            <span class="span1">
              {{item.label}}
            </span>
          </div>
        </p-link>
      </div>
    </li>
  </ul>
<!--自定义列表内容形式-->
  <ul class="drawerList" v-if="!off">
    <li class="drawerItem">
      <div class="sidebarParentTitile" @click="controlDisplay($event)">
        <span class="SidebarHead">{{ title }}</span>
        <i class="iconfont icon-arrow-up"/>
      </div>
      <div class="sidebarParentContent">
        <slot></slot>
      </div>
    </li>
  </ul>
</template>

<script lang="ts">
import { reactive, computed } from "vue";

export default {
	name: "p-collapse",
	props: {
		casedata: {
			type: Array,
		},
		title: {
			type: String,
		},
		target: {
			type: String,
		},
	},
	setup(props) {

		let pdata = reactive({
		});

		let off = computed(() => {
			if (props.casedata) {
				return props.casedata.length > 0;
			}
			return false;
		});

		let controlDisplay = (e:object) => {// 控制隐藏
			let main = e.currentTarget.parentElement; // 获取当前父级DOM
			let list = main.querySelector(".sidebarParentContent"); //获取Li列DOM
			let icon = main.querySelector(".iconfont"); //获取Icon列DOM
			if (list.classList.contains("ifShow")) { //判断当前状态是否隐藏；
				list.classList.remove("ifShow");

				icon.classList.remove("icon-arrow-down");
				icon.classList.add("icon-arrow-up");
			} else {
				list.classList.add("ifShow");

				icon.classList.remove("icon-arrow-up");
				icon.classList.add("icon-arrow-down");
			}
		};

		return {
			pdata,
			off,
			controlDisplay,
		};
	},
};
</script>
<style scoped>
.drawerList {
  width: 100%;
  text-align: left;
  margin: 0;
  padding: 0;
}
.drawerItem {
  width: 100%;
}
.sidebarParentTitile {
  white-space: nowrap;
  padding: 10px 10px 10px 20px;
  text-align: left;
}
.sidebarParentTitile i:last-child {
  float: right;
  font-size: 26px;
}
.ifShow {
  display: none;
}
.sidebarParentContent {
  width: 100%;
  box-sizing: border-box;
  text-align: left;
  /*display: inline-block;*/
  /*display: none;*/
}
.SidebarHead {
  writing-mode: horizontal-tb;
  font-size: 18px;
  font-weight: 460;
  color: #363639;
}
.home-detail-title {
  writing-mode: horizontal-tb;
  font-size: 18px;
  font-weight: 460;
  color: #363639;
  text-align: left;
  text-decoration: none;
}
.home-detail-title:hover {
  color: #71a8e2;
}
.column {
  padding: 10px 10px 10px 40px;
  /*display: none;*/
  cursor: pointer; /*鼠标变成手指*/
}
.column:hover {
  background-color: rgba(203, 203, 203, 0.54);
}

.span1 {
  white-space: nowrap;
  text-align: right;
  font-size: 16px;
  font-weight: 600;
}

.span1:hover {
  color: #71a8e2;
}
</style>
