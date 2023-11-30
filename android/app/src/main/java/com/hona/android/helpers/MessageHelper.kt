package com.hona.android.helpers

import android.content.Context
import android.view.Gravity
import android.view.LayoutInflater
import android.view.View
import android.widget.TextView
import android.widget.Toast
import com.hona.android.R

//消息帮助类
class MessageHelper {
  companion object {
    //Toast长文本提示
    fun toast(context: Context, message: String) {
      // 使用LayoutInflater加载自定义布局
      val inflater = context.getSystemService(Context.LAYOUT_INFLATER_SERVICE) as LayoutInflater
      val layout: View = inflater.inflate(R.layout.toast_layout, null)

      // 设置文本内容

      // 设置文本内容
      val text = layout.findViewById<TextView>(R.id.toast_text)
      text.text = message

      // 创建自定义Toast

      // 创建自定义Toast
      val toast = Toast(context)
      toast.setGravity(Gravity.CENTER_VERTICAL, 0, 0)
      toast.duration = Toast.LENGTH_LONG
      toast.setView(layout)
      toast.show()
    }
  }
}