import request from '@/utils/request'

// 销量趋势图表数据
export function getTrend() {
  return request({
    url: 'trend',
    method: 'get'
  })
}

export function getMap() {
  return request({
    url: 'map',
    method: 'get'
  })
}
