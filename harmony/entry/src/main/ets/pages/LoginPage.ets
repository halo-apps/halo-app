import router from '@ohos.router';
import webView from '@ohos.web.webview';
import MediaQueryModel from '../model/MediaQueryModel';
import { CommonConstants } from '../common/constants/CommonConstants';
import { PrivacyStatementComponent } from '../view/PrivacyStatementComponent';
import { LoginComponent } from '../view/LoginComponent';

/**
 * This template implements the Login function.
 * First register personal details. Log in after entering the username and password.
 * Click the button at the bottom to ask for help and check the privacy statement.
 * Developers can save username and password by Preference or Relational Database.
 */
@Entry
@Component
struct LoginPage {
  controller: WebviewController = new webView.WebviewController()
  title: string = "自定义内容"

  aboutToAppear() {
    MediaQueryModel.register();
  }

  aboutToDisappear() {
    MediaQueryModel.unRegister();
  }

  build() {
    Column() {
      this.Title()

      Row() {
        Text(this.title)
      }

      //https://tool-mobile-dev.honastar.com
      Web({ src: $rawfile("index.html"), controller: this.controller })
        .fileAccess(true)
        .domStorageAccess(true)
        .databaseAccess(true)
        .onTitleReceive((event) => {
          this.title = event.title
          return true
        })
        .onErrorReceive((event) => {
          console.log('getErrorCode:' + event.error.getErrorCode());
          console.log('getErrorInfo:' + event.error.getErrorInfo());
          return false;
        })
        .onConsole((event) => {
          console.log('getMessage:' + event.message.getMessage());
          console.log('getMessageLevel:' + event.message.getMessageLevel());
          return false;
        })

      Scroll() {
        Column() {
          LoginComponent()

          Blank()

          PrivacyStatementComponent()
        }
        .height(CommonConstants.SCROLL_HEIGHT_PERCENT)
        .constraintSize({ minHeight: $r('app.float.scroll_min_height') })
        .alignItems(HorizontalAlign.Start)
        .padding($r('app.float.login_operation_area_padding'))
      }
      .layoutWeight(CommonConstants.LOGIN_SCROLL_LAYOUT_WEIGHT)
    }
    .width(CommonConstants.LOGIN_PAGE_WIDTH_PERCENT)
    .backgroundColor($r('app.color.login_page_background'))
  }

  @Builder Title() {
    Row() {
      Image($r('app.media.ic_back'))
        .width($r('app.float.image_size'))
        .height($r('app.float.image_size'))
        .margin({
          left: $r('app.float.image_margin_left'),
          right: $r('app.float.image_margin_right')
        })
        .onClick(() => {
          router.back();
        })

      Text($r('app.string.title'))
        .fontSize($r('app.float.title_text_size'))
        .fontColor($r('app.color.title'))
        .fontWeight(CommonConstants.TITLE_FONT_WEIGHT)
    }
    .width(CommonConstants.FULL_WIDTH_PERCENT)
    .height($r('app.float.title_height'))
  }
}