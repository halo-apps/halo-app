<template>
  <form class="login" @submit="submit">
    <view class="login-row">
      <view class="login-title">用户名</view>
      <input type="text" class="login-content" :value="form.email" @input="emailChange" placeholder="请输入用户名" />
    </view>
    <view class="login-row">
      <view class="login-title">密码</view>
      <input type="text" class="login-content" password :value="form.password" @input="passwordChange" placeholder="请输入密码" />
    </view>
    <view class="login-operation">
      <button form-type="submit" :disabled="isLogining" :loading="isLogining">登录</button>
    </view>
    <debug>
      {{JSON.stringify(form)}}
    </debug>
  </form>
</template>

<script>
  import Container from '../../components/commons/Container.vue'
  import request from '../../plugins/request.js'
  import store from '../../store/index.js'
  import Debug from '../../components/commons/Debug.vue'

  export default {
    components: {
      Container,
      Debug
    },
    data() {
      return {
        isLogining: false,
        form: {
          email: null,
          password: null,
          platform: 'mobile'
        },
      };
    },
    methods: {
      emailChange({
        detail
      }) {
        console.log('detail:' + JSON.stringify(detail))
        this.form.email = detail.value
      },
      passwordChange({
        detail
      }) {
        this.form.password = detail.value
      },
      submit() {
        this.isLogining = true
        store.dispatch('user/login', this.form).then(({
            data
          }) => {
            //获取菜单信息
            store.dispatch('user/getMenu')

            //todo 需要返回来源地址
            uni.navigateTo({
              url: "/src/pages/Page"
            })
          })
          .catch((res) => {
            this.isLogining = false
          })
      },
    },
    onLoad(e) {},
    onShow(e) {
      this.isLogining = false
    }
  }
</script>

<style lang="scss">
  .login {
    display: block;
    padding: .5rem .6rem;


    .login-row {
      display: flex;
      justify-content: space-between;
      padding: .5rem 0;

      .login-title {
        font-size: .8rem;
        flex: 1;
        display: flex;
      }

      .login-content {
        font-size: .8rem;
        display: flex;
      }
    }

    .login-operation {
      margin-top: .2rem;
    }
  }
</style>
