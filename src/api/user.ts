import request from '../utils/request'
import { LoginReq } from '../model/req/LoginReq'

export function login(data: LoginReq) {
  return request({
    url: '/operator/login',
    method: 'post',
    data
  })
}

export function getInfo(token: string) {
  return request({
    url: '/operator/getUserInfo',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/operator/logout',
    method: 'post'
  })
}

export function getCaptcha() {
  return request({ url: '/getCaptcha', method: 'get' })
}
