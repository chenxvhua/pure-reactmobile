/**
 * Created by chenxuhua on 2017/11/15.
 */


import * as actionType from '../constant/action-type'
import urlApi from '../commonjs/requestApi';



export const loadingPage = (loading) => ({
    type: actionType.commonState_loading,
    loading,
})

export const productList = (productList) => ({
    type: actionType.productList,
    productList,
})

export const scrollTop = (scrollTop) => ({
    type: actionType.scrollTop,
    scrollTop,
})







