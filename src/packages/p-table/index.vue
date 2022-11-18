<script setup lang="ts">
import { ref, defineProps } from 'vue';
const props = defineProps({
  tableData: {
    type: Array,
    default() {
      return [];
    },
  },
});
</script>
<template>
  <el-table :data="tableData" :border="true" height="250" style="width: 100%">
    <el-table-column v-for="(dataItem, index) in tableData" :key="index" :width="dataItem.width" :prop="dataItem.prop" :label="dataItem.label" :align="dataItem.center" />
  </el-table>
</template>
<style lang="less" scoped></style>
