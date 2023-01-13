<script setup lang='ts'>
import { onMounted, ref, useSlots, computed } from 'vue';

const props = defineProps({
    title: {
        type: Object,
        default() {
            return {};
        },
    },
    tableData: {
        type: Array,
        default() {
            return []
        }
    },
    lengthWidth: {
        type: Array,
        default() {
            return []
        }
    }
});

const dataList = ref(
    [
        {},
        {},
        {},
    ]
)

// 判断slot是否有值
const useSlotsFn = (e: string) => {
    return !!useSlots()[e]
}

const sideHeadLi = computed(() => {
    return useSlotsFn('sideHeadLi')
})
const sideBodyLi = computed(() => {
    return useSlotsFn('sideBodyLi')
})

onMounted(() => {

})
</script>
<template>
    <div class="p-side">
        <div class="side-ul">
            <div class="side-head-li"
                 v-if="sideHeadLi">
                <slot name="sideHeadLi"></slot>
            </div>
            <template v-if="sideBodyLi">
                <slot name="sideBodyLi"></slot>
            </template>
            <div class="side-body-li"
                 v-else
                 v-for="(item, index) in dataList">
                <button class="button">
                    <i class="iconfont icon-quanping"></i>
                </button>
            </div>
        </div>
    </div>
</template>
<style scoped lang="less">
.p-side {
    height: 100%;
    width: 80px;
    background-color: aqua;

    .side-ul {
        display: flex;
        flex-direction: column;
        align-items: center;

        .side-head-li {
            display: flex;
            -webkit-box-pack: center;
            justify-content: center;
            -webkit-box-align: center;
            align-items: center;
            width: 100%;
            height: 88px;
            background-color: antiquewhite;
        }

        .side-body-li {
            display: flex;
            -webkit-box-pack: center;
            justify-content: center;
            -webkit-box-align: center;
            align-items: center;
            width: 100%;
            height: 40px;

            .button {
                background: none;
                border-style: none;
            }

            .button:hover {
                font-size: 20px;
                border-radius: 4px;
                background-color: rgb(215, 215, 215);
            }
        }
    }
}
</style>
