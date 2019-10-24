import React from 'react'
import './index.less'
/* 
组件标签体的内容以children自动传递给组件内部
  字符串
  标签对象
  标签对象的数组
与原生标签对应的标签接收到的children属性会转换成原生标签的标签体内容
*/
function LinkButton (props) {
  /* 将接收到所有属性都传给button */
  return <button className="link-button" {...props}/>
}

export default LinkButton