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
                  <Column field="id" header="ID"></Column>
                  <Column field="code" header="代碼"> </Column>
                  <Column field="option_text" header="標籤">
                    <template #body="slotProps">
                      <span
                        v-for="(item, index) of slotProps.data.option_text"
                        :key="index"
                        ><small v-if="index !== 0">、</small>{{ item }}</span
                      >
                    </template>
                  </Column>
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
      <div class="row mb-5">
        <div class="col-6 my-3">
          <p class="float-start">代碼</p>
          <div class="p-inputgroup">
            <InputText v-model="form.code" placeholder="" />
          </div>
        </div>
        <div class="col-6 my-3">
          <p class="float-start">標籤</p>
          <div class="p-inputgroup">
            <MultiSelect
              class="float-start"
              v-model="selected"
              :options="type"
              optionLabel="title"
              optionValue="id"
              placeholder=""
            />
          </div>
        </div>
        <div class="col-6 my-3">
          <p class="float-start">狀態</p>
          <div class="p-inputgroup">
            <SelectButton
              v-model="form.status"
              :options="options"
              optionLabel="label"
              optionValue="value"
            />
          </div>
        </div>
        <div class="col-6 my-3">
          <p class="float-start">排序編號</p>
          <div class="p-inputgroup">
            <InputText v-model="form.sort" placeholder="" />
          </div>
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
import ConfirmDialog from 'primevue/confirmdialog'
import MultiSelect from 'primevue/multiselect'
import BlockUI from 'primevue/blockui'
import ProgressSpinner from 'primevue/progressspinner'
import Logtable from '@/components/Logtable.vue'
import frontpageApi from '@/api/frontpageApi'
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
      form: {
        id: null,
        code: '',
        status: 1,
        sort: null,
        language: 'tw'
      },
      loading: false,
      logLoading: false,
      totalRecords: 0,
      selected: '',
      type: []
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
    MultiSelect,
    ConfirmDialog,
    BlockUI,
    ProgressSpinner,
    Logtable
  },
  created () {
    this.initFilters()
    this.getTableList()
    this.getSelectList()
  },
  mounted () {},
  watch: {
    selected: {
      handler: function (newValue) {
        this.form.option = newValue
      }
    }
  },
  methods: {
    // 獲取log資料
    getLogTableList (param) {
      this.logLoading = true
      frontpageApi
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
      frontpageApi
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
    getSelectList () {
      frontpageApi.fcGetSelectList().then(res => {
        this.type = res.data.map(item => {
          return {
            id: item.id,
            title: item.title
          }
        })
        // console.log(this.type)
      })
    },
    // 編輯資料
    edit (data) {
      this.form = data
      this.selected = data.option
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
          frontpageApi
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
      this.form.language = 'tw' // 先寫死中文
      if (this.form.id) {
        // 修改
        frontpageApi
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
        frontpageApi
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
        code: '',
        status: 1,
        sort: null,
        language: 'tw',
        option: ''
      }
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
