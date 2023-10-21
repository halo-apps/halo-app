<template>
  <v-row>
    <v-col sm="6" offset-sm="3">
      <v-form ref="form">
        <v-text-field v-model="form.email" :rules="rule.email" label="邮箱" required></v-text-field>
        <v-text-field v-model="form.password" type="password" :rules="rule.password" label="密码" required></v-text-field>
      </v-form>
      <v-btn block style="height:36px !important;" :loading="loading" color="primary" class="mr-4" @click="submitLogin">
        登录
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
  import store from "../../store";

  export default {
    name: "Login",
    data() {
      return {
        loading: false,
        form: {
          email: null,
          password: null,
        },
        rule: {
          email: [
            v => !!v || '邮箱不能为空',
            v => /.+@.+\..+/.test(v) || '邮箱格式不正确',
          ],
          password: [
            v => !!v || '密码不能为空',
          ]
        }
      }
    },
    methods: {
      submitLogin() {
        this.loading = true
        store.dispatch("user/login", this.form).then(({data}) => {
          //todo 需要返回来源地址
          this.$router.push({path: '/'})
        }).catch(() => {
          this.loading = false
        })
      }
    }
  }
</script>

<style scoped>

</style>
