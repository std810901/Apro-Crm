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
                  <Column field="title" header="標題"></Column>
                  <Column
                    field="publication_date"
                    header="發布日期"
                    :sortable="true"
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
        <div class="col-12 mb-3 mt-1">
          <SelectButton
            class="float-start"
            v-model="form.language"
            :options="langOptions"
            optionLabel="label"
            optionValue="value"
          />
        </div>
        <div class="col-6 mb-3">
          <p class="float-start">標題</p>
          <div class="p-inputgroup">
            <InputText v-model="form.title" placeholder="" />
          </div>
        </div>

        <div class="col-6 mb-3">
          <p class="float-start">排序編號</p>
          <div class="p-inputgroup">
            <InputText v-model="form.sort" placeholder="" />
          </div>
        </div>
        <div class="col-6 mb-3">
          <p class="float-start">發布日期</p>
          <Calendar
            class="w-100"
            v-model="form.publication_date"
            dateFormat="yy-mm-dd"
            :yearNavigator="true"
            yearRange="2022:2122"
            :showIcon="true"
          />
        </div>
        <div class="col-6 mb-3">
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

        <div class="col-12 mb-3">
          <p class="float-start">內文</p>
          <Textarea
            class="w-100"
            v-model="form.content"
            rows="15"
          />
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
import Textarea from 'primevue/textarea'
import Calendar from 'primevue/calendar'
import BlockUI from 'primevue/blockui'
import ProgressSpinner from 'primevue/progressspinner'
import Logtable from '@/components/Logtable.vue'
import NewsApi from '@/api/NewsApi'
export default {
  data () {
    return {
      filters: {},
      group: [],
      logs: [],
      displayModal: false,
      options: [
        {
          label: '發佈',
          value: 1
        },
        {
          label: '隱藏',
          value: 0
        }
      ],
      langOptions: [
        {
          label: '繁體中文',
          value: 'tw'
        },
        {
          label: '英文',
          value: 'en'
        }
      ],
      form: {
        id: null,
        title: '',
        content: '',
        publication_date: new Date(+new Date() + 8 * 3600 * 1000)
          .toISOString()
          .split('T')[0],
        status: 1,
        sort: null,
        news_category: this.$route.params.id,
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
    Textarea,
    Calendar,
    ConfirmDialog,
    BlockUI,
    ProgressSpinner,
    Logtable
  },
  created () {
    this.initFilters()
    this.getTableList()
  },
  watch: {
    'form.publication_date': {
      handler: function (newValue, oldValue) {
        this.form.publication_date = new Date(
          +new Date(newValue) + 8 * 3600 * 1000
        )
          .toISOString()
          .split('T')[0]
      },
      deep: true
    }
  },
  mounted () {},
  methods: {
    // 獲取log資料
    getLogTableList (param) {
      this.logLoading = true
      NewsApi.fcGetLogList(param)
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
        news_category: this.$route.params.id
        // current: 1,
        // perPage: 10
      }
      NewsApi.fcGetTableList(param)
        .then(res => {
          this.loading = false
          this.apiHandle(res, false)
          this.group = res.data.list
          this.group.forEach(each => {
            switch (each.status) {
              case 0:
                Object.assign(each, { statusLabel: '隱藏' })
                break
              case 1:
                Object.assign(each, { statusLabel: '發佈' })
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

    // 更新
    dataChange () {
      this.getTableList()
    },
    // 編輯資料
    edit (data) {
      this.form = data
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
          NewsApi.fcDeleteData(data.id)
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
    // 送出
    submit () {
      this.loading = true
      this.form.language = 'tw'
      if (this.form.id) {
        NewsApi.fcEditData(this.form.id, this.form)
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
        NewsApi.fcAddData(this.form)
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
        title: '',
        content: '',
        publication_date: new Date(+new Date() + 8 * 3600 * 1000)
          .toISOString()
          .split('T')[0],
        status: 1,
        sort: null,
        language: 'tw',
        news_category: this.$route.params.id
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
::v-deep .p-dialog {
  .p-dialog-header {
    position: relative;
    bottom: -1px;
    padding: 0.5rem;
  }
}
</style>
