<script setup lang="ts">
import { ref } from 'vue';
import Table from './packages/p-table/index.vue';
import { tableColumnsList, tableDataList } from './packages/p-table/index';

const selectFn = (row, index) => {
    if (index === 2) return true
}

const tableSetUp = ref({
    readonly: true,
    tableColumns: tableColumnsList,
    highlightCurrentRow: false,
    scrollbarAlwaysOn: false,
    maxHeight: 300,
    // draggable: true,
    showSelection: true,
    showSummary: ['a', 'b'],
    defaultSort: {
        prop: 'a', order: 'ascending'
    },
    sortOrders: ['descending', 'ascending'],
    showOperation: {
        showDelLine: true,
        showEditLine: true,
        showView: true
    },
    selectFn: selectFn
})


const pTable = ref()

const tableData = ref(tableDataList)

const handleDelete = (e) => {
    console.log(e)
    debugger
}

const handleCurrentChange = (e) => {
    // console.log(e)
    // debugger
}

const 选中 = () => {
    pTable.value.setCurrentRow([tableData.value[0], tableData.value[2]])
}

const handleSelectionChange = (e) => {
    debugger
}

</script>

<template>
    <Table ref="pTable"
           :tableData="tableData"
           :tableSetUp="tableSetUp"
           @handleCurrentChange="handleCurrentChange"
           @handleSelectionChange="handleSelectionChange"
           @handleDelete="handleDelete">
        <template v-slot:tableAction="slotProps">
            <el-input size="mini"
                      v-model="slotProps.scope.row['a']">
            </el-input>
        </template>
    </Table>
</template>

<style scoped>
#app {
    padding: 0;
    height: 100vh;
    width: 100vw;
    background-color: rgb(245, 245, 245);
}

/* .logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
} */
</style>
