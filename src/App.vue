<script setup lang="ts">
import { ref } from "vue";
import PTable from "./packages/p-table/index.vue";
import PLazyloading from "./packages/p-lazyLoading/index.vue";
import { tableColumnsList } from "./packages/p-table/index";

import { generateDataFn } from "./utils/table";

const data = generateDataFn(10, 10000);

// const selectFn = (row, index) => {
//     if (index === 2) return true
// }

// const rowStyle = (row, index) => {

// }

const tableSetUp = ref({
  readonly: true,
  tableColumns: tableColumnsList,
  highlightCurrentRow: false,
  scrollbarAlwaysOn: false,
  maxHeight: 800,
  tabelHeight: 500,
  draggable: true,
  showSelection: true,
  showSummary: true,
  defaultSort: {
    prop: "a",
    order: "ascending",
  },
  sortOrders: ["descending", "ascending"],
  showOperation: {
    showDelLine: true,
    showEditLine: true,
    showView: true,
  },
  // selectFn: selectFn,
  showPagination: {
    pageSize: 10,
    pageSizeOptions: [10, 20, 50, 100, 1000, 10000, 100000, 1000000],
  },
});

const pTable = ref();

const tableData = ref(data);

const handleDelete = (e: any) => {
  console.log(e);
  debugger;
};

const handleCurrentChange = (e: any) => {
  console.log(e);
  debugger;
};

const 选中 = () => {
  pTable.value.setCurrentRow([tableData.value[0], tableData.value[2]]);
};

const handleSelectionChange = (e: any) => {
  debugger;
};
</script>

<template>
  <P-Table
    ref="pTable"
    :tableData="tableData"
    :tableSetUp="tableSetUp"
    @handleCurrent-change="handleCurrentChange"
    @handleSelection-change="handleSelectionChange"
    @handleDelete="handleDelete"
  >
    <!-- <template v-slot:tableAction="slotProps">
            <el-input size="mini"
                      v-model="slotProps.scope.row['a']">
            </el-input>
        </template> -->
  </P-Table>
  <!-- <p-lazyloading>

    </p-lazyloading> -->
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
