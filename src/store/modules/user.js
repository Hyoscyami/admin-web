import { getInfo, login, logout } from '@/api/user'
import { getToken, removeToken, setToken, setOrgId, removeOrgId, getOrgId } from '@/utils/auth'
import { asyncRoutes, resetRouter } from '@/router'
import Layout from '@/layout/index.vue'
import { isNotEmptyCollection } from '@/utils/common'
import { CommonEnum } from '@/enums/CommonEnum'
import { isNull } from '../../utils/common'
import { doEncrypt } from '../../utils/password-utils'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    orgId: getOrgId(),

    permissionId: '',

    routes: [],

    routeList: [],

    routeMap: new Map(),
    addRoutes: []
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ORG_ID: (state, orgId) => {
    state.orgId = orgId
  },
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    // state.routes = constantRoutes.concat(routes)
    state.routes = routes
  },

  SET_ROUTE_LIST: (state, routeList) => {
    state.routeList = routeList
  },

  SET_ROUTE_MAP: (state, routeMap) => {
    state.routeMap = routeMap
  },
  SET_PERMISSION_ID: (state, permissionId) => {
    state.permissionId = permissionId
  }
}


function convertRoute(routes, data) {
  data.forEach((item) => {
    const menu = {
      path: item.path,
      component: isNotEmptyCollection(item.children)
        ? Layout
        : (resolve) => require([`@/views${item.path}`], resolve),
      name: item.pageName,
      hidden: item.type === CommonEnum.PERMISSION_MENU ? item.hidden : true,
      meta: { title: item.name, icon: item.icon, type: item.type, id: item.id },
      children: []
    }
    if (item.children) {
      convertRoute(menu.children, item.children)
    }
    routes.push(menu)
  })
}


function convertRouteList(treeRoutes, routeList, routeMap) {
  treeRoutes.forEach((item) => {
    if (item.children) {
      convertRouteList(item.children, routeList, routeMap)
    }
    routeList.push(item)
    routeMap.set(item.path, item)
  })
}

const actions = {

  login({ commit }, userInfo) {
    const formPassword = userInfo.password
    userInfo.password = doEncrypt(userInfo.password)
    const { username, password, verifyCode, verifyCodeId, rememberMe } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password, verifyCode, verifyCodeId, rememberMe })
        .then((response) => {
          const { data } = response
          commit('SET_TOKEN', data.token)
          commit('SET_NAME', data.name)
          commit('SET_ORG_ID', data.orgId)
          setToken(data.token)
          setOrgId(data.orgId)
          resolve()
        })
        .catch((error) => {
          userInfo.password = formPassword
          reject(error)
        })
    })
  },


  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token)
        .then((response) => {
          const { data } = response

          if (!data) {
            return reject('token验证失败，请尝试重新登录')
          }

          const { name, avatar } = data

          commit('SET_NAME', name)
          commit('SET_AVATAR', avatar)


          const loadMenuData = response.data.permissionVOS[0].children

          asyncRoutes.length = 0

          convertRoute(asyncRoutes, loadMenuData)

          const routeList = []

          const routeMap = new Map()

          convertRouteList(asyncRoutes, routeList, routeMap)
          const accessedRoutes = asyncRoutes

          commit('SET_ROUTES', accessedRoutes)

          commit('SET_ROUTE_LIST', routeList)

          commit('SET_ROUTE_MAP', routeMap)
          resolve(data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token)
        .then(() => {
          removeToken() // must remove  token  first
          removeOrgId()
          resetRouter()
          commit('RESET_STATE')
          resolve()
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise((resolve) => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  },

  setPermissionId({ commit }, path) {
    return new Promise((resolve, reject) => {
      const permission = state.routeMap.get(path)
      if (!isNull(permission)) {
        commit('SET_PERMISSION_ID', permission.meta.id)
      }
    })
  },
  //remove permissionId
  resetPermissionId({ commit }) {
    return new Promise((resolve) => {
      commit('SET_PERMISSION_ID', '')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
