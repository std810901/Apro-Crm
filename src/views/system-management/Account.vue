<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12">
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
                  <Column field="name" header="姓名"></Column>
                  <Column field="username" header="帳號"> </Column>
                  <Column field="admin_group" header="部門"> </Column>
                  <Column field="email" header="信箱"> </Column>
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
      <div class="col-12">
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
        <div class="col-6 mb-3">
          <p class="float-start">姓名</p>
          <div class="p-inputgroup">
            <InputText v-model="form.name" placeholder="" />
          </div>
        </div>
        <div class="col-6 mb-3">
          <p class="float-start">部門</p>
          <div class="p-inputgroup">
            <Dropdown
              class="text-start"
              optionLabel="name"
              optionValue="id"
              :options="department"
              v-model="selectedDepartment"
            />
          </div>
        </div>
        <div class="col-6 mb-3">
          <p class="float-start">帳號</p>
          <div class="p-inputgroup">
            <InputText v-model="form.username" placeholder="" />
          </div>
        </div>
        <div class="col-6 mb-3">
          <p class="float-start">密碼</p>
          <div class="p-inputgroup">
            <Password v-model="form.password" placeholder="" toggleMask />
          </div>
        </div>
        <div class="col-12 mb-3">
          <p class="float-start">信箱</p>
          <div class="p-inputgroup">
            <InputText v-model="form.email" placeholder="" />
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
import Password from 'primevue/password'
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
import Dropdown from 'primevue/dropdown'
import Logtable from '@/components/Logtable.vue'
import accountApi from '@/api/accountApi'
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
        id: null,
        admin_group_id: null,
        username: '',
        password: '',
        name: '',
        email: '',
        status: 1,
        sort: null,
        menu: [],
        language: 'tw'
      },
      selectedDepartment: null,
      department: [],
      loading: false,
      logLoading: false,
      totalRecords: 0
    }
  },
  components: {
    Password,
    DataTable,
    Column,
    InputText,
    Button,
    Card,
    Dialog,
    SelectButton,
    Tree,
    Dropdown,
    ConfirmDialog,
    BlockUI,
    ProgressSpinner,
    Logtable
  },
  created () {
    this.initFilters()
    this.getTableList()
    this.getMenuList()
    this.getDepartmentData()
  },
  mounted () {},
  watch: {
    // 監聽下拉
    selectedDepartment: {
      handler: function (newValue, old) {
        this.form.admin_group_id = newValue
        this.selectedKeys = {}
        this.department.forEach(f => {
          if (f.id === newValue) {
            f.menu.forEach(m => {
              const obj = {}
              obj[m] = {
                checked: true,
                partialChecked: false
              }
              Object.assign(this.selectedKeys, obj)
            })
          }
        })
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    // 獲取log資料
    getLogTableList (param) {
      this.logLoading = true
      accountApi
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
      accountApi
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
    getDepartmentData () {
      accountApi
        .fcDropDownData()
        .then(res => {
          this.apiHandle(res, false)
          this.department = res.data.map(d => {
            return {
              id: d.id,
              name: d.name,
              menu: d.menu
            }
          })
        })
        .catch(err => {
          this.apiHandle(err)
        })
    },
    // 編輯資料
    edit (data) {
      this.form = data
      this.selectedDepartment = data.admin_group_id

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
          accountApi
            .fcDeleteData(data.id)
            .then(res => {
              this.loading = false
              this.apiHandle(res)
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
        accountApi
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
        accountApi
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
      accountApi
        .fcGetMenuList()
        .then(res => {
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
        id: null,
        admin_group_id: null,
        username: '',
        password: '',
        name: '',
        email: '',
        status: 1,
        sort: null,
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
