<script>
  import store from 'src/store/index.js'
  import {
    getHeader
  } from './src/plugins/auth.js'
  export default {
    data: {
      title: null,
    },
    //应用启动时执行
    //TODO: 概念区分，后台接口是否可以添加 Launch 概念，表示当配置解析完成后的启动操作
    onLaunch: function({
      path,
      query,
      scene
    }) {
      //首先获取配置信息
      store.dispatch('system/getSettings').then((res) => {
        //有配置信息后，才能够发起请求
        let login = store.state.user.login
        if (login) {
          //有token，根据token获取用户信息

          //获取菜单信息
          store.dispatch('user/getMenu')
        } else {
          if (path != '/login') {
            uni.navigateTo({
              url: "/src/pages/commons/Login"
            })
          }
        }
      })
    },
    onShow: function() {
      uni.setNavigationBarTitle({
        title: this.title
      })
    },
    onHide: function() {
      this.title = document.title
      uni.setNavigationBarTitle({
        title: '等你回来'
      })
    }
  }
</script>

<style lang="scss">
  //重置文本框样式
  uni-input {
    line-height: inherit;
    height: inherit;
    min-height: inherit;
  }

  /*每个页面公共css */
  //常规布局
  .normal-layout {
    padding: .25rem .5rem .25rem;

    .normal-row {

      .normal-field {
        display: flex;
        justify-content: space-between;
        font-size: .9rem;
        border-bottom: thin solid #d5d5d5;
        padding: .5rem .6rem;

        .normal-title {
          color: #818181;
          display: flex;
          width: 4rem;
        }

        .normal-text {
          display: flex;
          color: #323232;
          flex: 1;
        }
      }
    }

    &.primary {
      .normal-row {
        .normal-field {
          &:last-child {
            border-bottom: 0;
          }
        }
      }
    }

    //c从表第1个字段备注加深颜色
    &.child {
      .normal-row {
        .normal-field {
          &:last-child {
            border-bottom: 1px solid #cadbef;
          }
        }

        &.normal-row:last-child {
          .normal-field {
            &:last-child {
              border-bottom: 0;
            }
          }
        }
      }
    }
  }

  //选项卡切换
  .tab-control {
    width: 100%;
    background: #F8F8F8;
    display: -webkit-inline-box;
    flex-wrap: nowrap;
    overflow-x: scroll;
    border-top: thin solid #ddd;

    //隐藏父元素出现的滚动条
    &::-webkit-scrollbar {
      display: none;
    }

    .tab-item {
      font-size: .7rem;
      width: 20%;
      padding: .5rem 0;
      color: #7a7e83;

      &:active {
        background-color: #f1f1f1;
      }

      .uni-icons {
        display: flex;
        justify-content: center;
        color: #7a7e83 !important;
        font-size: 1.2rem !important;
      }

      .tab-name {
        display: flex;
        white-space: nowrap;
        justify-content: center;
        align-items: center;
      }

      &.active {
        color: #007aff;

        .uni-icons {
          color: #007aff !important;
        }
      }
    }
  }

  //子菜单切换
  .menu-control {
    background: #F8F8F8;
    display: flex;
    flex-wrap: wrap;

    .menu-item {
      font-size: .7rem;
      padding: .8rem 0;
      color: #7a7e83;
      width: 20%;
      display: flex;
      flex-direction: column;

      .uni-icons {
        display: flex;
        justify-content: center;
        color: #7a7e83 !important;
      }

      .menu-name {
        display: flex;
        white-space: nowrap;
        justify-content: center;
        align-items: center;
      }

      &:active {
        background-color: #f1f1f1;
      }
    }
  }

  //列表常规布局
  .paging-normal {
    .list-normal {
      .list-item {
        padding: .5rem .7rem 0;

        .list-wrapper {
          display: flex;
          flex-direction: row;
          flex: 1;
          overflow: hidden;
          padding-bottom: .5rem;
          position: relative;

          &::after {
            content: '';
            width: 100%;
            height: 0;
            position: absolute;
            border-bottom: thin solid #c8c7cc;
            bottom: 0;
          }
        }

        .list-container {
          display: flex;
          flex-direction: column;
          flex: 1;
          overflow: hidden; //不隐藏，会导致右侧图标错位
        }

        .list-title {
          color: #3b4144;
          font-size: .9rem;
        }

        .list-content {
          font-size: .8rem;
          max-height: 1.2rem;
          color: #999;
        }

        .list-operation {
          display: flex;
          justify-content: flex-end;
          align-items: center;

          .uni-icons {
            color: #bbbbbb !important;
            font-size: 1em !important;
          }
        }

        &:active {
          background-color: #f1f1f1;
        }
      }
    }

    .paging-operation {
      position: fixed;
      bottom: 1.5rem;
      right: 1.5rem;
      padding: .2rem;
      border-radius: 50%;
      background: rgb(0, 122, 255);
      width: 2.5rem;
      height: 2.5rem;
      display: flex;
      justify-content: center;
      align-items: center;

      .uni-icons {
        color: #fff !important;
        font-size: 1.5rem !important;
      }
    }
  }

  //上拉加载图标样式
  .uni-load-more {
    height: 3rem !important;

    .uni-load-more__img {
      width: .8rem !important;
      height: .8rem !important;
    }
  }

  //控件 autocomplete
  .control-autocomplete {
    height: auto !important;

    .uni-combox {
      height: auto !important;
    }

    .uni-combox__input {
      font-size: .9rem !important;
    }

    .uni-combox__input-arrow {
      padding: 0 !important;
    }
  }

  //控件 rate，包括详情和表单
  .control-rate {
    display: flex;

    .uni-rate {
      margin-top: 8px;

      .uni-icons {}
    }
  }

  //富文本控件
  .control-rich-text {
    word-break: break-all;
    width: calc(100vw - 4rem);
    display: block;

    .ql-container {
      height: 100%;
    }
  }

  //表格布局
  .table-layout {
    overflow-x: scroll;

    //隐藏父元素出现的滚动条
    &::-webkit-scrollbar {
      display: none;
    }

    .table-container {
      width: 100%;
      display: table; //才能出现滚动条
      border-collapse: collapse;
    }

    .tr {
      border-bottom: thin solid #d5d5d5;
      display: table-row;
    }

    .th {
      padding: .5rem .7rem;
      white-space: nowrap;
      font-size: .9rem;
      font-weight: normal;
      color: #323232;
      text-align: left;
      display: table-cell;
    }


    .td {
      padding: .5rem .7rem;
      font-size: .9rem;
      color: #818181;
      white-space: nowrap;
      display: table-cell;
    }
  }

  //页面自定义滚动
  .page-scroll-view {
    height: calc(100vh - 3.4rem);

    //#ifdef H5
    height: calc(100vh - 5.7rem);
    //#endif
  }

  //页脚操作
  .footer {}
</style>
