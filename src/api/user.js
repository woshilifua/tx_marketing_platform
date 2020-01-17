import request from '@/utils/request'

export function login(data) {
  return request({
    url: 'http://39.96.167.179:10011/mastermind/m/login',
    method: 'post',
    header: { 'Access-Control-Allow-Credentials': 'true' },
    data
  })
}

export function register(data) {
  return request({
    url: 'http://39.96.167.179:10011/mastermind/m/regist',
    method: 'post',
    header: { 'Access-Control-Allow-Credentials': 'true' },
    data
  })
}

export function getInfo() {
  return Promise.resolve({ data: { roles: ['marketing'] } })
  // return request({
  //   url: 'http://39.96.167.179:10011/mastermind/m/uinfo',
  //   method: 'get',
  //   header: { 'Access-Control-Allow-Credentials': 'true' }
  // })
}

export function logout() {
  //TODO need delete
  return Promise.resolve()
}
