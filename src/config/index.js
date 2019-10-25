import { message } from 'antd'

export const IS_DEV = process.env.NODE_ENV==='development'

export const PAGE_SIZE = 5

export const IMG_BASE_URL = 'http://localhost:4000/upload/'

// 全局设置message
message.config({
  duration: 3,
  top: 30
})