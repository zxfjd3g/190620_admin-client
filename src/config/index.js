import { message } from 'antd'

export const IS_DEV = process.env.NODE_ENV==='development'

// 全局设置message
message.config({
  duration: 4,
  top: 30
})