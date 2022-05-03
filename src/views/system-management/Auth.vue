<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-xxl-6 col-12">
        <Card class="my-2">
          <template #content>
            <div class="position-relative">
              <ProgressSpinner
                v-if="loading"
                class="progress_container"
                strokeWidth="8"
                animationDuration="0.5s"
              />
              <BlockUI :blocked="loading">
                <DataTable
                  class=""
                  :value="group"
                  responsiveLayout="scroll"
                  :paginator="true"
                  :rows="10"
                  :filters="filters"
                  :rowsPerPageOptions="[10, 20, 50]"
                  paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                >
                  <template #header>
                    <div class="table-header d-flex justify-content-between">
                      <Button
                        label="新增"
                        icon="pi pi-plus"
                        @click="openModal"
                      />
                      <span class="p-input-icon-left">
                        <i class="pi pi-search" />
                        <InputText
                          v-model="filters['global'].value"
                          placeholder="Search"
                        />
                      </span>
                    </div>
                  </template>
                  <Column
                    field="name"
                    header="權限分類"
                  ></Column>
                  <Column field="statusLabel" header="狀態" :sortable="true">
                  </Column>
                  <Column
                    field="sort"
                    header="排序編號"
                    :sortable="true"
                  ></Column>
                  <Column
                    field=""
                    header="操作"
                    :styles="{ 'min-width': '8rem' }"
                  >
                    <template #body="slotProps">
                      <Button
                        icon="pi pi-pencil"
                        class="p-button-rounded p-button-success me-3"
                        @click="
                          edit(slotProps.data)
                          openModal()
                        "
                      />
                      <Button
                        icon="pi pi-trash"
                        class="p-button-rounded p-button-warning"
                        @click="confirmDelete(slotProps.data)"
                      /> </template
                  ></Column>
                </DataTable>
              </BlockUI>
            </div>
          </template>
        </Card>
      </div>
      <div class="col-xxl-6 col-12">
        <Card class="my-2">
          <template #content>
            <div class="position-relative">
              <ProgressSpinner
                v-if="logLoading"
                class="progress_container"
                strokeWidth="8"
                animationDuration="0.5s"
              />
              <BlockUI :blocked="logLoading">
                <Logtable
                  :logs="logs"
                  :totalRecords="totalRecords"
                  @getLogTableList="getLogTableList"
                />
              </BlockUI>
            </div>
          </template>
        </Card>
      </div>
    </div>
    <Dialog
      :closable="false"
      :visible.sync="displayModal"
      :containerStyle="{ width: '90vw', maxWidth: '800px' }"
      :modal="true"
    >
      <template #header>
        <div class="w-100 d-flex justify-content-end">
          <Button
            icon="pi pi-times"
            @click="closeModal"
            class="p-button-text p-button-rounded p-button-plain"
          />
        </div>
      </template>
      <div class="row">
        <div class="col-12">
          <p class="float-start">權限分類</p>
          <div class="p-inputgroup">
            <span class="p-inputgroup-addon">
              <i class="pi pi-users"></i>
            </span>
            <InputText v-model="form.name" placeholder="" />
          </div>
        </div>
        <div
          class="col-6 my-3 d-flex align-items-center justify-content-between"
        >
          <span class="">狀態</span>
          <SelectButton
            v-model="form.status"
            :options="options"
            optionLabel="label"
            optionValue="value"
          />
        </div>
        <div
          class="col-6 my-3 d-flex align-items-center justify-content-between"
        >
          <span class="">排序編號</span>
          <InputText v-model="form.sort" placeholder="" />
        </div>
        <div class="col-12">
          <Tree
            :value="nodes"
            selectionMode="checkbox"
            :selectionKeys.sync="selectedKeys"
            :expandedKeys="expandedKeys"
          ></Tree>
        </div>
      </div>
      <template #footer>
        <div class="text-center">
          <Button label="送出" icon="pi pi-check" @click="submit" autofocus />
          <Button
            label="取消"
            icon="pi pi-times"
            @click="closeModal"
            class="p-button-text text-center"
          />
        </div>
      </template>
    </Dialog>
    <ConfirmDialog></ConfirmDialog>
  </div>
</template>

<script>
import { FilterMatchMode } from 'primevue/api'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import Card from 'primevue/card'
import Dialog from 'primevue/dialog'
import SelectButton from 'primevue/selectbutton'
import Tree from 'primevue/tree'
import ConfirmDialog from 'primevue/confirmdialog'
import BlockUI from 'primevue/blockui'
import ProgressSpinner from 'primevue/progressspinner'
import Logtable from '@/components/Logtable.vue'
import authApi from '@/api/authApi'
export default {
  data () {
    return {
      filters: {},
      logs: [],
      group: [],
      displayModal: false,
      options: [
        {
          label: '啟用',
          value: 1
        },
        {
          label: '停用',
          value: 0
        }
      ],
      selectedKeys: {},
      nodes: [],
      expandedKeys: {},
      form: {
        name: '',
        status: 1,
        sort: null,
        id: null,
        menu: [],
        language: 'tw'
      },
      loading: false,
      logLoading: false,
      totalRecords: 0
    }
  },
  components: {
    DataTable,
    Column,
    InputText,
    Button,
    Card,
    Dialog,
    SelectButton,
    Tree,
    ConfirmDialog,
    BlockUI,
    ProgressSpinner,
    Logtable
  },
  created () {
    this.initFilters()
    this.getTableList()
    this.getMenuList()
  },
  mounted () {},
  methods: {
    // 獲取log資料
    getLogTableList (param) {
      this.logLoading = true
      authApi
        .fcGetLogList(param)
        .then(res => {
          this.logLoading = false
          this.apiHandle(res, false)
          this.logs = res.data.list
          this.totalRecords = res.data.total
        })
        .catch(err => {
          this.logLoading = false
          this.apiHandle(err)
        })
    },
    // 獲取所有資料
    getTableList () {
      this.loading = true
      const param = {
        // current: 1,
        // perPage: 10
      }
      authApi
        .fcGetTableList(param)
        .then(res => {
          this.loading = false
          this.apiHandle(res, false)
          this.group = res.data.list
          this.group.forEach(each => {
            switch (each.status) {
              case 0:
                Object.assign(each, { statusLabel: '停用' })
                break
              case 1:
                Object.assign(each, { statusLabel: '啟用' })
                break
              default:
                Object.assign(each, { statusLabel: '' })
                break
            }
          })
        })
        .catch(err => {
          this.loading = false
          this.apiHandle(err)
        })
    },
    // 編輯資料
    edit (data) {
      this.form = data
      this.selectedKeys = {}
      if (this.form.menu && this.form.menu.length) {
        this.form.menu.forEach(m => {
          const obj = {}
          obj[m] = {
            checked: true,
            partialChecked: false
          }
          Object.assign(this.selectedKeys, obj)
        })
      }
    },
    // 刪除
    confirmDelete (data) {
      this.$confirm.require({
        message: '確定要刪除此資料',
        header: '刪除確認',
        acceptLabel: '刪除',
        acceptIcon: 'pi pi-trash',
        rejectLabel: '取消',
        rejectIcon: 'pi pi-times',
        icon: 'pi pi-info-circle',
        acceptClass: 'p-button-danger',
        accept: () => {
          this.loading = true
          authApi
            .fcDeleteData(data.id)
            .then(res => {
              this.apiHandle(res)
              this.loading = false
              this.dataChange()
            })
            .catch(err => {
              this.loading = false
              this.apiHandle(err)
            })
        },
        reject: () => {}
      })
    },
    // 更新
    dataChange () {
      this.getTableList()
    },
    // 送出
    submit () {
      this.loading = true
      const menu = Object.entries(this.selectedKeys)
        .filter(f => f[1].checked === true || f[1].partialChecked === true) // filter value is cheched
        .map(m => {
          // 用Key來做成ID
          if (m[0].includes('-')) {
            m[0] = m[0].slice(m[0].indexOf('-') + 1)
          }
          return m[0]
        })
      this.form.menu = menu
      this.form.language = 'tw' // 先寫死中文
      if (this.form.id) {
        // 修改
        authApi
          .fcEditData(this.form.id, this.form)
          .then(res => {
            this.loading = false
            this.apiHandle(res)
            this.closeModal()
            this.dataChange()
          })
          .catch(err => {
            this.loading = false
            this.closeModal()
            this.apiHandle(err)
          })
      } else {
        // 新增
        authApi
          .fcAddData(this.form)
          .then(res => {
            this.loading = false
            this.apiHandle(res)
            this.closeModal()
            this.dataChange()
          })
          .catch(err => {
            this.loading = false
            this.closeModal()
            this.apiHandle(err)
          })
      }
    },
    // 樹狀資料
    getMenuList () {
      authApi
        .fcGetMenuList()
        .then(res => {
          this.apiHandle(res, false)
          this.nodes = res.data.map(n => {
            if (n.children && n.children.length) {
              n.children = n.children.map(c => {
                return {
                  id: c.id,
                  key: c.key,
                  icon: c.icon,
                  data: c.data,
                  label: this.$t(c.data)
                }
              })
            }
            return {
              id: n.id,
              key: n.key,
              icon: n.icon,
              data: n.data,
              label: this.$t(n.data),
              children: n.children
            }
          })
          this.expandAll()
        })
        .catch(err => {
          this.apiHandle(err)
        })
    },
    // 展開樹狀
    expandAll () {
      for (const node of this.nodes) {
        this.expandNode(node)
      }

      this.expandedKeys = { ...this.expandedKeys }
    },
    // 樹狀子層
    expandNode (node) {
      if (node.children && node.children.length) {
        this.expandedKeys[node.key] = true

        for (const child of node.children) {
          this.expandNode(child)
        }
      }
    },
    // 打開彈窗
    openModal () {
      this.displayModal = true
    },
    // 關起談窗
    closeModal () {
      this.displayModal = false
      // reset dafault
      this.form = {
        name: '',
        status: 1,
        sort: null,
        id: null,
        menu: [],
        language: 'tw'
      }
      this.selectedKeys = {}
    },
    // 搜尋
    initFilters () {
      this.filters = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.progress_container {
  width: 50px;
  height: 50px;
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 1009;
  transform: translate(-50%, -50%);
}
</style>
