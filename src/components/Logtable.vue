<template>
  <DataTable
    class=""
    responsiveLayout="scroll"
    @page="onPage($event)"
    :lazy="true"
    :totalRecords="totalRecords"
    :value="logs"
    :paginator="true"
    :rows="10"
    :rowsPerPageOptions="[10, 20, 50]"
    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
  >
    <template #header>
      <div class="table-header d-flex justify-content-between">
        <Button label="" icon="pi pi-refresh" @click="search" />
        <div class="p-inputgroup w-auto">
          <InputText v-model="keyword" placeholder="Search" />
          <Button label="" icon="pi pi-search" @click="search" />
        </div>
      </div>
    </template>
    <Column field="admin_user" header="管理者"></Column>
    <Column field="time" header="時間"></Column>
    <Column field="ip" header="IP位置"></Column>
    <Column field="description" header="說明"></Column>
  </DataTable>
</template>

<script>
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
// import Dropdown from 'primevue/dropdown'
export default {
  props: {
    logs: {
      type: Array,
      default: function () {
        return []
      }
    },
    totalRecords: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      keyword: '',
      param: {
        current: 1,
        perPage: 10
      }
    }
  },
  components: {
    DataTable,
    Column,
    InputText,
    Button
    // Dropdown
  },
  mounted () {},
  watch: {
    param: {
      handler: function (newParam) {
        this.search()
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    onPage (event) {
      this.param.current = event.page + 1
      this.param.perPage = event.rows
    },
    search () {
      const param = {
        current: this.param.current,
        perPage: this.param.perPage,
        keyword: this.keyword
      }
      this.$emit('getLogTableList', param)
    }
  }
}
</script>

<style></style>
