<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import { ElTable } from 'element-plus';
import Sortable from 'sortablejs';
import { component } from 'vue/types/umd';
import { el } from 'element-plus/es/locale';
import PPagination from './p-pagination.vue'

const emits = defineEmits(['handleDelete', 'handleEdit', 'handleView', 'handleCurrent-change', 'handleSelection-change', 'rowDblclick'])

const props = defineProps({
    tableSetUp: {
        type: Object,
        default() {
            return {};
        },
    },
    tableData: {
        type: Array,
        default: () => []
    }
});

const tableRef = ref<InstanceType<typeof ElTable>>()

const tableSetUp: Domains.tableSetUp = {}

const pData = ref({
    currentRow: {}, // 当前行数据
    tableData: [],
    pageTableData: [],
    tableSetUp: tableSetUp,
})

const randomId = ref(`pTable${Number(Math.random() * 10000).toFixed(0)}`)

const tableClass = computed(() => {
    return props.tableSetUp.class ? '' : 'tabel-default';
})

const tabelHeight = computed(() => {
    return props.tableSetUp.tabelHeight ? props.tableSetUp.tabelHeight : '300'
})

const showSummary = computed(() => {
    if (pData.value.tableSetUp.showSummary) return true
    if (Array.isArray(pData.value.tableSetUp.showSummary)) return true
})

// 默认过长显示
const showOverflowTooltip = computed(() => {
    return (e) => {
        if (e !== undefined && typeof e == 'boolean') return e
        return true
    }
})
// 删除
const handleDelete = (index: String, row: object) => {
    emits('handleDelete', index, row)
}
// 编辑
const handleEdit = (index: String, row: object) => {
    emits('handleEdit', index, row)
}
// 查看
const handleView = (index: String, row: object) => {
    emits('handleView', index, row)
}
// 当前所选中的行的数据
// const handleCurrentChange = (val: object) => {
//     debugger
//     emits('handleCurrent-change', val)
// }
// 当前所勾选的数据
const handleSelectionChange = (val: object) => {
    debugger
    emits('handleSelection-change', val)
}

const setCurrentRow = (e: object) => {
    debugger
    tableRef.value!.setCurrentRow(e)
}
// 解决选中
const getDetails = (e: object, column: Object) => {
    console.log(column);
    if (!column) {
        pData.value.currentRow = e
        if (pData.value.tableSetUp.showSelection && !pData.value.tableSetUp.selectFn) {
            tableRef.value.toggleRowSelection(e);
        }
    }
}
// 是否可以选中设置
const selectFn = (row, index) => {
    if (props.tableSetUp.selectFn) {
        if (props.tableSetUp.selectFn.call(null, row, index)) {
            return true
        } else {
            return false
        }
    } else {
        return true
    }
}
// 点击
const rowDblClick = (row: object, column: object, event: object) => {
    emits("rowDblclick", row, column, event)
}
// 排血
const changeTableSort = (e: object) => {
    console.log(e)
    debugger
}

// watch(() => props.tableData, (n, o) => {
//     debugger
//     pData.value.tableData = JSON.parse(JSON.stringify(n))
// }, { deep: true, immediate: true })

watch(() => props.tableSetUp, (n, o) => {
    pData.value.tableSetUp = JSON.parse(JSON.stringify(n))
}, { deep: true, immediate: true })

// 列拖拽
const columnDrop = () => {
    const wrapperTr = document.querySelector(`#${randomId.value} .el-table__header-wrapper tr`) as HTMLElement;

    if (!wrapperTr) return false;

    Sortable.create(wrapperTr, {
        filter: ".ignore-elements",
        draggable: ".draggable",
        animation: 180,
        delay: 0,
        onEnd: (evt: { newIndex: any; oldIndex: any }) => {
            if (pData.value.tableSetUp.showSelection) {
                const oldItem = pData.value.tableSetUp.tableColumns.splice(evt.oldIndex - 1, 1)[0];
                pData.value.tableSetUp.tableColumns.splice(evt.newIndex - 1, 0, oldItem);
            } else {
                const oldItem = pData.value.tableSetUp.tableColumns.splice(evt.oldIndex, 1)[0];
                pData.value.tableSetUp.tableColumns.splice(evt.newIndex, 0, oldItem);
            }
        },
    });
}

// 合计
const getSummaries = (param: Domains.SummaryMethodProps) => {
    const { columns, data } = param
    const sums: string[] = []
    columns.forEach((column, index) => {
        if (index === 0 && pData.value.tableSetUp.showSelection) {
            sums[index] = '合计'
            return
        }
        const values = data.map((item: any) => Number(item[column.property]))
        // 可以指定列计算，默认全部列
        if ((Array.isArray(pData.value.tableSetUp.showSummary) &&
            pData.value.tableSetUp.showSummary?.indexOf(column.property) !== -1) ||
            pData.value.tableSetUp.showSummary == true) {
            if (!values.every((value) => Number.isNaN(value))) {
                sums[index] = `${values.reduce((prev, curr) => {
                    const value = Number(curr)
                    if (!Number.isNaN(value)) {
                        return prev + curr
                    } else {
                        return prev
                    }
                }, 0)}`
            } else {
                sums[index] = ''
            }
        } else {
            sums[index] = ''
        }

    })
    return sums
}

// 分页
const sizeChange = (e) => {
    pageSizeDatalFn(props.tableData, e)
}
// 当前页
const currentChange = (e) => {
    pData.value.tableData = pData.value.pageTableData[e - 1]
}
// 分页数据处理
const pageSizeDatalFn = (res, pageSize) => {
    let index = 0
    let data = JSON.parse(JSON.stringify(res))
    pData.value.pageTableData.length = 0
    while (index < data.length) {
        pData.value.pageTableData.push(data.slice(index, (index += pageSize)))
    }
    pData.value.tableData = pData.value.pageTableData[0]
}

// 高级搜索
const advancedSearch = () => {
    debugger
}

onMounted(() => {
    // 需要分页的时候的数据处理
    if (pData.value.tableSetUp.showPagination) {
        if (pData.value.tableSetUp.showPagination.pageSizeOptions) {
            pageSizeDatalFn(props.tableData, pData.value.tableSetUp.showPagination.pageSizeOptions[0])
        } else {
            pageSizeDatalFn(props.tableData, 10)
        }
    }
    // 拖拽开关
    if (pData.value.tableSetUp.draggable == true) {
        columnDrop();
    }
})

defineExpose({
    tableRef,
    setCurrentRow
})

</script>
<template>
    <div :id="randomId"
         :class="tableClass">
        <el-table :row-key="pData.tableSetUp.id"
                  ref="tableRef"
                  :height="tabelHeight"
                  :data="pData.tableData"
                  :border="true"
                  :max-height="pData.tableSetUp.maxHeight"
                  :highlight-current-row="pData.tableSetUp.highlightCurrentRow"
                  :scrollbar-always-on:="pData.tableSetUp.scrollbarAlwaysOn"
                  :sort-orders="pData.tableSetUp.sortOrders"
                  :sortable="true"
                  :default-sort="pData.tableSetUp.defaultSort"
                  :show-summary="showSummary"
                  :summary-method="getSummaries"
                  @row-click="getDetails"
                  @row-dblclick="rowDblClick"
                  @selection-change="handleSelectionChange"
                  @sort-change="changeTableSort"
                  style="width: 100%">

            <el-table-column v-if="pData.tableSetUp.showSelection"
                             class-name="ignore-elements"
                             :selectable="selectFn"
                             type="selection"
                             width="55" />
            <!-- 可编辑表格 -->
            <template v-if="pData.tableSetUp.readonly == false">
                <!-- 可编辑中默认都是可以编辑的 -->
                <el-table-column class-name="draggable"
                                 v-for="(item, index) in pData.tableSetUp.tableColumns"
                                 :key="`column_${item.prop}_${index}`"
                                 :resizable="true"
                                 :formatter="item.formatter"
                                 :type="item.type"
                                 :width="item.width"
                                 :show-overflow-tooltip="showOverflowTooltip(item.showOverflowTooltip)"
                                 :prop="item.prop"
                                 :min-width="item.minWidth"
                                 :label="item.label"
                                 :fixed="item.fixed"
                                 :align="item.align">
                    <template #header
                              v-if="item.required">
                        <span style="color:red">*</span>{{ item.label }}
                    </template>
                    <template slot-scope="scope"
                              v-slot="scope"
                              :key="`input_${scope.$index}_${index}`"
                              v-if="item.slotName != null && item.slotName != ''">
                        <slot :name="item.slotName"
                              v-bind:scope="scope"></slot>
                    </template>
                    <template slot-scope="scope"
                              v-slot="scope"
                              v-else>
                        <el-input v-if="!item.readonly"
                                  :key="`input_${scope.$index}_${index}`"
                                  v-model="scope.row[item.prop]" />
                    </template>
                </el-table-column>
                <!-- 单独有某行不想可编辑 -->
                <!-- 常见的3个按钮形式 -->
                <el-table-column v-if="pData.tableSetUp.showOperation"
                                 class-name="ignore-elements"
                                 key="操作"
                                 label="操作"
                                 :width="230"
                                 fixed="right">
                    <template slot-scope="scope"
                              v-slot="scope">
                        <el-button type="danger"
                                   v-if="pData.tableSetUp.showOperation.showDelLine"
                                   @click.native.stop="handleDelete(scope.$index, scope.row)">删除</el-button>
                        <el-button type="primary"
                                   v-if="pData.tableSetUp.showOperation.showEditLine"
                                   @click.native.stop="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button type="success"
                                   v-if="pData.tableSetUp.showOperation.showView"
                                   @click.native.stop="handleView(scope.$index, scope.row)">查看</el-button>
                    </template>
                </el-table-column>
            </template>

            <!-- 不可编辑表格 -->
            <template v-else>
                <el-table-column class-name="draggable"
                                 :resizable="true"
                                 v-for="(item, index) in pData.tableSetUp.tableColumns"
                                 :key="`column_${item.prop}_${index}`"
                                 :formatter="item.formatter"
                                 :width="item.width"
                                 sortable="custom"
                                 :type="item.type"
                                 :show-overflow-tooltip="showOverflowTooltip(item.showOverflowTooltip)"
                                 :prop="item.prop"
                                 :min-width="item.minWidth"
                                 :label="item.label"
                                 :fixed="item.fixed"
                                 :align="item.align">
                    <template slot-scope="scope"
                              v-slot="scope"
                              v-if="item.slotName != null && item.slotName != ''">
                        <slot :name="item.slotName"
                              v-bind:scope="scope"></slot>
                    </template>
                </el-table-column>
                <el-table-column v-if="pData.tableSetUp.showOperation"
                                 class-name="ignore-elements"
                                 key="操作"
                                 label="操作"
                                 :width="230"
                                 fixed="right">
                    <template slot-scope="scope"
                              v-slot="scope">
                        <el-button type="danger"
                                   v-if="pData.tableSetUp.showOperation.showDelLine"
                                   @click.native.stop="handleDelete(scope.$index, scope.row)">删除</el-button>
                        <el-button type="primary"
                                   v-if="pData.tableSetUp.showOperation.showEditLine"
                                   @click.native.stop="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button type="success"
                                   v-if="pData.tableSetUp.showOperation.showView"
                                   @click.native.stop="handleView(scope.$index, scope.row)">查看</el-button>
                    </template>
                </el-table-column>
            </template>
        </el-table>
        <el-row style="margin-top: 5px;">
            <el-col :span="20"
                    style="text-align: center;"
                    v-if="pData.tableSetUp.showPagination">
                <P-Pagination :totals="tableData.length"
                              :pager-count="pData.tableSetUp.showPagination.pagerCount"
                              :pageSizes="pData.tableSetUp.showPagination.pageSize"
                              :pageSizeOptions="pData.tableSetUp.showPagination.pageSizeOptions"
                              @sizeChange="sizeChange"
                              @currentChange="currentChange"></P-Pagination>
            </el-col>
            <el-col :span="4"
                    v-if="true">
                <el-tooltip content="高级搜索"
                            placement="top"
                            :open-delay="500">
                    <el-button type="primary"
                               link
                               style="float: right; font-size: 16px; padding-top: 7px; padding-bottom: 7px;"
                               class="iconfont icon-sousuo"
                               @click="advancedSearch()">
                    </el-button>
                </el-tooltip>
            </el-col>
        </el-row>
    </div>
</template>
<style lang="less" scoped>
.tabel-default {
    width: 100%;
    height: 100%;
}
</style>
