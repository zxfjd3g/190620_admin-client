import {ADD_PRODUCT, UPDATE_PRODUCT} from '../action-types'

export const addProduct = (product) => ({type: ADD_PRODUCT, data: product})

export const update = (product) => ({type: UPDATE_PRODUCT, data: product})