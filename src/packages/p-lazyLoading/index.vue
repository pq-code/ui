<script setup lang='ts'>
import { ref, computed } from 'vue';
import { generateDataFn } from '../../utils/table';

let screenHeight = ref()

const scrollEvent = (e) => {
    screenHeight.value = e.clientHeight
}

const listHeight = computed(() => {
    return data.length * itemSize.value
})

const getTransform = computed(() => {

})

const itemSize = computed(() => {
    return 10
})

const data = generateDataFn(10, 10000)

</script>

<template>
    <div ref="list"
         class="infinite-list-container"
         @scroll="scrollEvent($event)">
        <div class="infinite-list-phantom"
             :style="{ height: listHeight + 'px' }"></div>
        <div class="infinite-list"
             :style="{ transform: getTransform }">
            <div ref="items"
                 class="infinite-list-item"
                 v-for="item in data"
                 :key="item.id"
                 :style="{ height: itemSize + 'px', lineHeight: itemSize + 'px' }">{{ item.id }}</div>
        </div>
    </div>
</template>

<style lang="less" scoped>
.infinite-list-container {
    height: 100%;
    overflow: auto;
    position: relative;

    .infinite-list-phantom {
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        z-index: -1;
    }

    // .infinite-list {
    //     left: 0;
    //     right: 0;
    //     top: 0;
    //     position: absolute;

    //     .infinite-list-item {
    //         line-height: 50px;
    //         text-align: center;
    //         color: #555;
    //         border: 1px solid #ccc;
    //         box-sizing: border-box;
    //     }
    // }
}
</style>
