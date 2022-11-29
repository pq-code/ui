<script setup lang='ts'>
import { ref, watch, computed, onMounted } from 'vue';
const emits = defineEmits(['sizeChange', 'currentChange'])

const props = defineProps({
    totals: {
        type: Number,
        default: 100
    },
    pageSizes: {
        type: Number,
        default: 10
    },
    pageSizeOptions: {
        type: Array,
        default() {
            return [10, 20, 50, 100, 200, 500, 1000];
        },
    }
});

const pageSize = ref(props.pageSizes)
const total = ref(props.totals)
const currentPages = ref(1)


const sizeChange = (e) => {
    pageSize.value = e
    emits('sizeChange', e)
}

const currentChange = (e) => {
    emits('currentChange', e)
}

onMounted(() => {

})
</script>
<template>
    <el-pagination :total="total"
                   :page-size="pageSize"
                   background
                   :pager-count="10"
                   :page-sizes="pageSizeOptions"
                   layout="prev, pager, next, jumper, sizes, total"
                   @size-change="sizeChange"
                   @current-change="currentChange">
    </el-pagination>
</template>

<style lang="lcss" scoped></style>
