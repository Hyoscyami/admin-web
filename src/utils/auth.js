import Cookies from 'js-cookie'

const TokenKey = 'token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
const orgIdKey = 'orgId'

export function getOrgId() {
  return Cookies.get(orgIdKey)
}

export function setOrgId(orgId) {
  return Cookies.set(orgIdKey, orgId)
}

export function removeOrgId() {
  return Cookies.remove(orgIdKey)
}
