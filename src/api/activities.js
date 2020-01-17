import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: 'http://39.96.167.179:10011/mastermind/m/act/list',
    method: 'get',
    params: query
  })
}

export function fetchActivitiesDetails() {
  return request({
    url: 'http://39.96.167.179:10011/mastermind/m/act/channel',
    method: 'get',
    params: { actCode: 'vJp6C4mf1' }
  })
}


export function fetchPv(pv) {
  return request({
    url: '/article/pv',
    method: 'get',
    params: { pv }
  })
}

export function createArticle(data) {
  return request({
    url: '/article/create',
    method: 'post',
    data
  })
}

export function updateArticle(data) {
  return request({
    url: '/article/update',
    method: 'post',
    data
  })
}
