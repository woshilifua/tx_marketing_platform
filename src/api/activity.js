import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: 'http://39.96.167.179:10011/mastermind/m/act/list',
    method: 'get',
    params: query
  })
}

export function fetchActivity() {

}

export function fetchActivityDetails() {
  return request({
    url: 'http://39.96.167.179:10011/mastermind/m/act/channel',
    method: 'get',
    params: { actCode: 'vJp6C4mf1' }
  })
}

export function fetchActivityChannels() {
  return request({
    url: 'http://39.96.167.179:10011/mastermind/m/act/detail',
    method: 'get',
    params: { channelCode: '1' }
  })
}


export function createActivity(data) {
  return request({
    url: 'http://39.96.167.179:10011/mastermind/m/act/create',
    method: 'post',
    data
  })
}

export function updateActivity(data) {
  return request({
    url: 'http://39.96.167.179:10011/mastermind/a/update/act',
    method: 'post',
    data
  })
}
