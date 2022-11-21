<script setup lang="ts">
import { computed, ref } from 'vue';
import { ElTable } from 'element-plus'

const props = defineProps({
    tableSetUp: {
        type: Object,
        default() {
            return {};
        },
    },
    tableData: {
        type: Array,
        default() {
            return [];
        },
    }
});

const table = ref<InstanceType<typeof ElTable>>()

const pData = ref({
    currentRow: {}
})

const emits = defineEmits(['handleDelete', 'handleEdit', 'handleView', 'handleCurrentChange', 'handleSelectionChange'])

const randomId = ref(`pTable${Number(Math.random() * 10000).toFixed(0)}`)

const tableClass = computed(() => {
    return props.tableSetUp.class ? '' : 'tabel-default';
})

const tabelHeight = computed(() => {
    return props.tableSetUp.height ? props.tableSetUp.height : '300'
})

const handleDelete = (index: String, row: Object) => {
    emits('handleDelete', index, row)
}

const handleEdit = (index: String, row: Object) => {
    emits('handleEdit', index, row)
}

const handleView = (index: String, row: Object) => {
    emits('handleView', index, row)
}

const handleCurrentChange = (val: any) => {
    emits('handleCurrentChange', val)
}

const handleSelectionChange = (val: any) => {
    emits('handleSelectionChange', val)
}

const setCurrentRow = (e: any) => {
    table.value!.setCurrentRow(e)
}

const getDetails = (e) => {
    console.log(e);
    debugger
}

defineExpose({
    table,
    setCurrentRow
})

</script>
<template>
    <div :id="randomId"
         :class="tableClass">
        <el-table :id="tableSetUp.id"
                  ref="table"
                  :data="tableData"
                  :border="true"
                  :height="tabelHeight"
                  @row-click="getDetails"
                  :highlight-current-row="tableSetUp.highlightCurrentRow"
                  @current-change="handleCurrentChange"
                  @selection-change="handleSelectionChange"
                  :scrollbar-always-on:="tableSetUp.scrollbarAlwaysOn"
                  :sort-orders="tableSetUp.sortOrders"
                  style="width: 100%">
            <el-table-column type="selection"
                             width="55" />
            <!-- 可编辑表格 -->
            <template v-if="tableSetUp.readonly == false">
                <template v-for="(item, index) in tableSetUp.tableColumns"
                          :key="`column_${item.prop}_${index}`">
                    <!-- 可编辑中默认都是可以编辑的 -->
                    <el-table-column :class-name="`p-${item.prop}`"
                                     :formatter="item.formatter"
                                     :width="item.width"
                                     :show-overflow-tooltip="item.showOverflowTooltip"
                                     :prop="item.prop"
                                     :min-width="item.minWidth"
                                     :label="item.label"
                                     :fixed="item.fixed"
                                     :align="item.center">
                        <template slot-scope="scope"
                                  v-slot="scope"
                                  v-if="item.slotName != null && item.slotName != ''">
                            <slot :name="item.slotName"
                                  v-bind:scope="scope"></slot>
                        </template>
                        <template slot-scope="scope"
                                  v-slot="scope"
                                  v-else>
                            <el-input size="mini"
                                      v-if="!item.readonly"
                                      v-model="scope.row[item.prop]" />
                        </template>
                    </el-table-column>
                    <!-- 单独有某行不想可编辑 -->
                </template>
                <!-- 常见的3个按钮形式 -->
                <el-table-column v-if="tableSetUp.showOperation"
                                 class-name="draggable"
                                 key="操作"
                                 label="操作"
                                 :width="230"
                                 fixed="right">
                    <template slot-scope="scope"
                              v-if="tableSetUp.showOperation"
                              v-slot="scope">
                        <el-button size="mini"
                                   type="danger"
                                   v-if="tableSetUp.showOperation.showDelLine"
                                   @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                        <el-button size="mini"
                                   type="primary"
                                   v-if="tableSetUp.showOperation.showEditLine"
                                   @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button size="mini"
                                   type="success"
                                   v-if="tableSetUp.showOperation.showView"
                                   @click="handleView(scope.$index, scope.row)">查看</el-button>
                    </template>
                </el-table-column>
            </template>

            <!-- 不可编辑表格 -->
            <template v-else>
                <template v-for="(item, index) in tableSetUp.tableColumns"
                          :key="`column_${item.prop}_${index}`">
                    <el-table-column :class-name="`p-${item.prop}`"
                                     :formatter="item.formatter"
                                     :width="item.width"
                                     :show-overflow-tooltip="item.showOverflowTooltip"
                                     :prop="item.prop"
                                     :min-width="item.minWidth"
                                     :label="item.label"
                                     :fixed="item.fixed"
                                     :align="item.center">
                        <template slot-scope="scope"
                                  v-slot="scope"
                                  v-if="item.slotName != null && item.slotName != ''">
                            <slot :name="item.slotName"
                                  v-bind:scope="scope"></slot>
                        </template>
                    </el-table-column>
                </template>
                <el-table-column v-if="tableSetUp.showOperation"
                                 class-name="draggable"
                                 key="操作"
                                 label="操作"
                                 :width="230"
                                 fixed="right">
                    <template slot-scope="scope"
                              v-if="typeof tableSetUp.showOperation == 'object'"
                              v-slot="scope">
                        <el-button size="mini"
                                   type="danger"
                                   v-if="tableSetUp.showOperation.showDelLine"
                                   @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                        <el-button size="mini"
                                   type="primary"
                                   v-if="tableSetUp.showOperation.showEditLine"
                                   @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button size="mini"
                                   type="success"
                                   v-if="tableSetUp.showOperation.showView"
                                   @click="handleView(scope.$index, scope.row)">查看</el-button>
                    </template>
                </el-table-column>
            </template>
        </el-table>
    </div>
</template>
<style lang="less" scoped>
.tabel-default {
    width: 100%;
    height: 100%;
}
</style>
