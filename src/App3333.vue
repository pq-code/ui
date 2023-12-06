<script setup lang="ts">
import { ref } from 'vue';
import PSide from './packages/p-side/side.vue'

</script>

<template>
    <div class="main">
        <p-side>
            <template #sideHeadLi>
                <button>111</button>
            </template>
            <!-- <template #sideBodyLi>
                <button>111</button>
            </template> -->
        </p-side>
    </div>
</template>

<style scoped>
#app {
    padding: 0;
    height: 100vh;
    width: 100vw;
    background-color: rgb(245, 245, 245);
}

.main {
    padding: 0;
    width: 100px;
    height: 100vh;
}
</style>
