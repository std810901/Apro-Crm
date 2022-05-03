<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12">
        <Card class="my-2">
          <template #content>
            <p class="text-start">語系設定</p>
            <div class="position-relative">
              <ProgressSpinner
                v-if="loading"
                class="progress_container"
                strokeWidth="8"
                animationDuration="0.5s"
              />
              <BlockUI :blocked="loading">
                <DataTable
                  :value="languages"
                  :editingRows.sync="editingRows"
                  @row-edit-save="onRowEditSave"
                  editMode="row"
                  dataKey="id"
                  responsiveLayout="scroll"
                >
                  <Column header="狀態" field="status" :styles="{ width: '20%' }">
                    <template #body="slotProps">
                      {{ slotProps.data.status === 1 ? '啟用' : '停用' }}
                    </template>
                    <template #editor="slotProps">
                      <InputSwitch
                        v-model="slotProps.data['statusBoolean']"
                      />
                    </template>
                  </Column>
                  <Column header="設定檔" field="code" :styles="{ width: '20%' }">
                  </Column>
                  <Column header="顯示" field="name" :styles="{ width: '20%' }">
                    <template #editor="slotProps">
                      <InputText
                        v-model="slotProps.data[slotProps.column.field]"
                        autofocus
                      />
                    </template>
                  </Column>
                  <Column header="排序" field="sort" :styles="{ width: '20%' }">
                    <template #editor="slotProps">
                      <InputText
                        v-model="slotProps.data[slotProps.column.field]"
                        autofocus
                      />
                    </template>
                  </Column>
                  <Column
                    :rowEditor="true"
                    :styles="{ width: '10%', 'min-width': '8rem' }"
                    :bodyStyle="{ 'text-align': 'center' }"
                  ></Column>
                </DataTable>
              </BlockUI>
            </div>
          </template>
        </Card>
      </div>
    </div>
  </div>
</template>

<script>
import settingApi from '@/api/settingApi'
import Card from 'primevue/card'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import InputSwitch from 'primevue/inputswitch'
import InputText from 'primevue/inputtext'
import BlockUI from 'primevue/blockui'
import ProgressSpinner from 'primevue/progressspinner'
export default {
  data () {
    return {
      languages: [],
      editingRows: [],
      loading: false
    }
  },
  components: {
    Card,
    DataTable,
    Column,
    InputSwitch,
    InputText,
    BlockUI,
    ProgressSpinner
  },
  created () {
    this.getLanguageTableList()
  },
  methods: {
    onRowEditSave (event) {
      const { newData, index } = event // 解構參數
      // boolean 轉換
      switch (newData.statusBoolean) {
        case true:
          Object.assign(newData, { status: 1 })
          break
        case false:
          Object.assign(newData, { status: 0 })
          break
        default:
          Object.assign(newData, { status: null })
          break
      }
      this.languages[index] = newData // 更新
      // call api
      this.loading = true
      settingApi
        .fcUpdateLanguageTableList(this.languages)
        .then(res => {
          this.loading = false
          this.apiHandle(res)
          this.getLanguageTableList()
        })
        .catch(err => {
          this.loading = false
          this.apiHandle(err)
        })
    },
    getLanguageTableList () {
      this.loading = true
      settingApi
        .fcGetLanguageTableList()
        .then(res => {
          this.loading = false
          this.apiHandle(res, false)
          this.languages = res.data.list
          // 數字轉換boolean
          this.languages.forEach(each => {
            switch (each.status) {
              case 0:
                Object.assign(each, { statusBoolean: false })
                break
              case 1:
                Object.assign(each, { statusBoolean: true })
                break
              default:
                Object.assign(each, { statusBoolean: null })
                break
            }
          })
        })
        .catch(err => {
          this.loading = false
          this.apiHandle(err)
        })
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
