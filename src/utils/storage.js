/*
  封装了localStorage的函数模块
 */
import store from 'store'

export function getItem(key, defaultValue='') {
  /* const value = localStorage.getItem(key)
  if (defaultValue instanceof Object) {
    return JSON.parse(value) || defaultValue
  } else {
    return value || defaultValue
  } */
  return store.get(key, defaultValue)
}

export function setItem(key, value) {
  // localStorage.setItem(key, value instanceof Object ? JSON.stringify(value) : value)
  store.set(key, value)
}

export function removeItem(key) {
  // localStorage.removeItem(key)
  store.remove(key)
}

