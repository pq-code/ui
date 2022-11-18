<script setup lang="ts">
import { ref } from 'vue';
import Table from './packages/p-table/index.vue';
import { tableDataList } from './packages/p-table/index';
</script>

<template>
    <Table :tableData="tableDataList" />
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
