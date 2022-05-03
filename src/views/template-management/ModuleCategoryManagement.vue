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
                  :value="category"
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
                  <Column field="id" header="ID"> </Column>
                  <Column field="title" header="分類名稱">
                    <template #body="slotProps">
                      <router-link
                        class="text-decoration-none"
                        :to="{
                          name: '模塊列表',
                          params: { id: slotProps.data.id }
                        }"
                        >{{ slotProps.data.title }}</router-link
                      >
                    </template>
                  </Column>
                  <Column field="type_text" header="功能">
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
                      <!-- <Button
                        icon="pi pi-trash"
                        class="p-button-rounded p-button-warning"
                        @click="confirmDelete(slotProps.data)"
                      />  -->
                    </template></Column
                  >
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
        <div class="col-12 mb-3">
          <p class="float-start">分類名稱</p>
          <div class="p-inputgroup">
            <span class="p-inputgroup-addon">
              <i class="pi pi-table"></i>
            </span>
            <InputText v-model="form.title" placeholder="" />
          </div>
        </div>
        <div class="col-6 mb-3">
          <p class="float-start">圖片目錄名稱</p>
          <div class="p-inputgroup">
            <span class="p-inputgroup-addon">
              <i class="pi pi-folder-open"></i>
            </span>
            <InputText v-model="form.folder" placeholder="" />
          </div>
        </div>
        <div class="col-6 mb-3">
          <p class="float-start">功能</p>
          <div class="p-inputgroup">
            <span class="p-inputgroup-addon">
              <i class="pi pi-flag"></i>
            </span>
            <Dropdown
              class="text-start"
              v-model="form.type"
              optionLabel="label"
              optionValue="value"
              :options="feature"
            />
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
import Dropdown from 'primevue/dropdown'
import { FilterMatchMode } from 'primevue/api'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import Card from 'primevue/card'
import Dialog from 'primevue/dialog'
import SelectButton from 'primevue/selectbutton'
import ConfirmDialog from 'primevue/confirmdialog'
import BlockUI from 'primevue/blockui'
import ProgressSpinner from 'primevue/progressspinner'
import Logtable from '@/components/Logtable.vue'
import moduleCategoryApi from '@/api/moduleCategoryApi'
export default {
  data () {
    return {
      filters: {},
      logs: [],
      category: [],
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
      feature: [
        { value: 'header', label: '選單' },
        { value: 'footer', label: '頁尾' },
        { value: 'about', label: '關於我們' },
        { value: 'banner', label: 'Banner' },
        { value: 'product_list', label: '產品列表' },
        { value: 'product', label: '產品詳細內容' },
        { value: 'new_list', label: '最新消息列表' },
        { value: 'news', label: '最新消息' },
        { value: 'album_list', label: '相簿列表' },
        { value: 'album', label: '相簿' },
        { value: 'article_list', label: '文章列表' },
        { value: 'article', label: '文章' },
        { value: 'faq', label: '問與答' },
        { value: 'download', label: '下載' },
        { value: 'contact', label: '聯絡我們' }
      ],
      form: {
        title: '',
        status: 1,
        sort: null,
        id: null,
        language: 'tw',
        folder: '',
        type: '',
        type_text: ''
      },
      loading: false,
      logLoading: false,
      totalRecords: 0
    }
  },
  components: {
    Dropdown,
    DataTable,
    Column,
    InputText,
    Button,
    Card,
    Dialog,
    SelectButton,
    ConfirmDialog,
    BlockUI,
    ProgressSpinner,
    Logtable
  },
  created () {
    this.initFilters()
    this.getTableList()
    this.getDropdownList()
  },
  mounted () {},
  methods: {
    getDropdownList () {
      moduleCategoryApi
        .fcDropDownData()
        .then(res => {
          this.apiHandle(res, false)
          this.feature = Object.entries(res.data).map(d => {
            return {
              value: d[0],
              label: d[1]
            }
          })
        })
        .catch(err => {
          this.apiHandle(err)
        })
    },
    // 獲取log資料
    getLogTableList (param) {
      this.logLoading = true
      moduleCategoryApi
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
      moduleCategoryApi
        .fcGetTableList(param)
        .then(res => {
          this.loading = false
          this.apiHandle(res, false)
          this.category = res.data.list
          this.category.forEach(each => {
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
    },
    // 刪除
    // confirmDelete (data) {
    //   this.$confirm.require({
    //     message: '確定要刪除此資料',
    //     header: '刪除確認',
    //     acceptLabel: '刪除',
    //     acceptIcon: 'pi pi-trash',
    //     rejectLabel: '取消',
    //     rejectIcon: 'pi pi-times',
    //     icon: 'pi pi-info-circle',
    //     acceptClass: 'p-button-danger',
    //     accept: () => {
    //       this.loading = true
    //       moduleCategoryApi
    //         .fcDeleteData(data.id)
    //         .then(res => {
    //           this.apiHandle(res)
    //           this.loading = false
    //           this.dataChange()
    //         })
    //         .catch(err => {
    //           this.loading = false
    //           this.apiHandle(err)
    //         })
    //     },
    //     reject: () => {}
    //   })
    // },
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
        moduleCategoryApi
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
        moduleCategoryApi
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
        title: '',
        status: 1,
        sort: null,
        id: null,
        language: 'tw',
        folder: '',
        type: '',
        type_text: ''
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
