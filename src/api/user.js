import request from '@/utils/request'

export function login(data) {
  return request({
    url: 'http://39.96.167.179:10011/mastermind/m/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
