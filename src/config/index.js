import { message } from 'antd'

export const IS_DEV = process.env.NODE_ENV==='development'

export const PAGE_SIZE = 5

// 全局设置message
message.config({
  duration: 3,
  top: 30
})