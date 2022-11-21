<script setup lang="ts">
import { ref } from 'vue';
import Table from './packages/p-table/index.vue';
import { tableColumnsList, tableDataList } from './packages/p-table/index';

const tableSetUp = ref({
    readonly: true,
    tableColumns: tableColumnsList,
    highlightCurrentRow: true,
    scrollbarAlwaysOn: false,
    sortOrders: [],
    showOperation: {
        showDelLine: true,
        showEditLine: true,
        showView: true
    },
})

const pTable = ref()

const tableData = ref(tableDataList)

const handleDelete = () => {
    debugger
}

const handleCurrentChange = (e) => {
    // console.log(e)
    // debugger
}

const 选中 = () => {
    pTable.value.setCurrentRow(tableData.value[0])
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
    <el-button @click="选中"></el-button>
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
