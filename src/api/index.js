import request from '@/utils/request'

export const requestPost = (url,data)=>{
  return  request({
    method: 'post',
    url: url,
    data:data
  })
}
export const requestGet = (url)=>{
  return  request({
    method: 'get',
    url: url,
  })
}

export const getNewCartGoods = (skuId) => {
  return request({
    method: 'get',
    url: `/goods/stock/${skuId}`
  })
}

export const mergeLocalCart = (data) => {
  return request({
    method: 'post',
    url: '/member/cart/merge',
    data: data
  })
}
