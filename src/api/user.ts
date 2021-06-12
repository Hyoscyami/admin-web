import request from '@/utils/request'
import { Login } from '@/class/model/login'

export function login(data: Login) {
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
