<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12">
        <Card class="my-2">
          <template #content>
            <p class="text-start">個人設定</p>
            <div class="position-relative">
              <ProgressSpinner
                v-if="loading"
                class="progress_container"
                strokeWidth="8"
                animationDuration="0.5s"
              />
              <BlockUI :blocked="loading">
                <div class="row">
                  <div class="col-4 mb-3">
                    <p class="float-start">姓名</p>
                    <div class="p-inputgroup">
                      <InputText v-model="form.name" placeholder="" disabled />
                    </div>
                  </div>
                  <div class="col-4 mb-3">
                    <p class="float-start">帳號</p>
                    <div class="p-inputgroup">
                      <InputText
                        v-model="form.username"
                        placeholder=""
                        disabled
                      />
                    </div>
                  </div>
                  <div class="col-4 mb-3">
                    <p class="float-start">部門</p>
                    <div class="p-inputgroup">
                      <InputText
                        v-model="form.admin_group"
                        placeholder=""
                        disabled
                      />
                    </div>
                  </div>
                  <div class="col-12 mb-3">
                    <p class="float-start">信箱</p>
                    <div class="p-inputgroup">
                      <InputText v-model="form.email" placeholder="" disabled />
                    </div>
                  </div>
                </div>
              </BlockUI>
            </div>
          </template>
        </Card>
      </div>
    </div>
  </div>
</template>
<script>
import Card from 'primevue/card'
import InputText from 'primevue/inputtext'
import BlockUI from 'primevue/blockui'
import ProgressSpinner from 'primevue/progressspinner'
import personalApi from '@/api/personalApi'
export default {
  components: {
    Card,
    InputText,
    BlockUI,
    ProgressSpinner
  },
  data () {
    return {
      loading: false,
      invalid: false,
      form: {
        name: '',
        username: '',
        admin_group: '',
        email: ''
      }
    }
  },
  created () {
    this.getPersonData()
  },
  mounted () {},
  watch: {},
  methods: {
    getPersonData () {
      personalApi
        .ApiGetPersonData()
        .then(res => {
          this.apiHandle(res, false)
          Object.assign(this.form, res.data)
        })
        .catch(err => {
          this.apiHandle(err)
        })
    }
  }
}
</script>
<style lang="scss" scoped>
.invalid {
  ::v-deep input {
    border-color: red;
  }
}
</style>
