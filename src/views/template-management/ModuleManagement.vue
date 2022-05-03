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
                  :value="tags"
                  responsiveLayout="scroll"
                  :paginator="true"
                  :rows="10"
                  :filters="filters"
                  :rowsPerPageOptions="[10, 20, 50]"
                  paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                >
                  <template #header>
                    <Button
                      icon="pi pi-arrow-left"
                      label="返回"
                      class="p-button-text float-start me-3"
                      @click="$router.go(-1)"
                    />
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
                  <Column field="code" header="代碼"></Column>
                  <Column field="image_url" header="示意圖">
                    <template #body="slotProps">
                      <img :src="slotProps.data.image_url" alt="" style="max-width: 300px" />
                    </template>
                  </Column>
                  <Column field="count" header="使用次數"></Column>
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
        <div class="col-12 mb-3">
          <p class="float-start">代碼</p>
          <div class="p-inputgroup">
            <span class="p-inputgroup-addon">
              <i class="pi pi-ticket"></i>
            </span>
            <InputText v-model="form.code" placeholder="" />
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
        <div class="col-12 mb-3">
          <p class="text-start">示意圖</p>
          <div>
            <FileUpload
              class="text-start"
              @select="mySelectFile"
              @clear="clearFile"
              :showUploadButton="false"
              :fileLimit=1
              :maxFileSize="1000000"
              :previewWidth=200
              :originalFile="originalFile"
              invalidFileSizeMessage="{0}：文件大小無效，文件大小應小於 {1}。"
              invalidFileTypeMessage="{0}：文件類型無效，允許的文件類型：{1}。"
              invalidFileLimitMessage="超出最大文件數，限制最多為 {0}。"
              accept="image/*"
            >
            </FileUpload>
          </div>
        </div>
        <div class="col-12 mb-3">
          <p class="float-start">資料檔</p>
          <Textarea v-model="form.data" class="w-100" rows="5" />
        </div>
        <div class="col-12 mb-3">
          <p class="float-start">設定檔</p>
          <Textarea v-model="form.config" class="w-100" rows="5" />
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
import BlockUI from 'primevue/blockui'
import ProgressSpinner from 'primevue/progressspinner'
import Textarea from 'primevue/textarea'
import FileUpload from '@/components/FileUpload.vue'
import Logtable from '@/components/Logtable.vue'
import moduleApi from '@/api/moduleApi'
export default {
  data () {
    return {
      filters: {},
      logs: [],
      tags: [],
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
        code: '',
        status: 1,
        sort: null,
        id: null,
        language: 'tw',
        module: this.$route.params.id,
        config: '',
        data: '',
        use_image: 0,
        image: ''
      },
      loading: false,
      logLoading: false,
      totalRecords: 0,
      originalFile: []
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
    ConfirmDialog,
    BlockUI,
    ProgressSpinner,
    Textarea,
    FileUpload,
    Logtable
  },
  created () {
    this.initFilters()
    this.getTableList()
  },
  mounted () {},
  methods: {
    clearFile () {
      this.form.use_image = 0
      this.form.image = ''
      console.log(this.form)
    },
    mySelectFile (event) {
      console.log(event.files)
      if (event.files && event.files.length === 1) {
        this.form.image = event.files[0]
        this.form.use_image = 1
        console.log(this.form)
      }
    },
    // 獲取log資料
    getLogTableList (param) {
      this.logLoading = true
      moduleApi
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
        module: this.$route.params.id
        // current: 1,
        // perPage: 10
      }
      moduleApi
        .fcGetTableList(param)
        .then(res => {
          this.loading = false
          this.apiHandle(res, false)
          this.tags = res.data.list
          this.tags.forEach(each => {
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
      this.form = Object.assign(this.form, data)
      this.form.use_image = 1
      this.originalFile = [{
        objectURL: data.image_url,
        name: '使用原圖',
        size: 0,
        type: 'image/*'
      }]
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
    //       moduleApi
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
        moduleApi
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
        moduleApi
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
      this.originalFile = []
      this.form = {
        code: '',
        status: 1,
        sort: null,
        id: null,
        language: 'tw',
        module: this.$route.params.id,
        config: '',
        data: '',
        use_image: 0,
        image: ''
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
