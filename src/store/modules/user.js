import { getInfo, login, logout } from '@/api/user'
import { getToken, removeToken, setToken } from '@/utils/auth'
import { asyncRoutes, resetRouter } from '@/router'
import Layout from '@/layout/index.vue'
import { isNotEmptyCollection } from '@/utils/common'
import { CommonEnum } from '@/enums/CommonEnum'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    orgId: '',
    // 树状路由
    routes: [],
    // 树状路由平铺成list
    routeList: [],
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
  // 保存树状路由平铺成的list
  SET_ROUTE_LIST: (state, routeList) => {
    state.routeList = routeList
  }
}

// 后台返回的权限列表转router格式
function convertRoute(routes, data) {
  data.forEach((item) => {
    const menu = {
      path: item.path,
      component: isNotEmptyCollection(item.children)
        ? Layout
        : (resolve) => require([`@/views${item.path}`], resolve),
      name: item.pageName,
      hidden: item.type === CommonEnum.PERMISSION_MENU ? item.hidden : true, // 是页面的话根据按钮是否隐藏赋值，不是页面的话直接隐藏
      meta: { title: item.name, icon: item.icon, type: item.type },
      children: []
    }
    if (item.children) {
      convertRoute(menu.children, item.children)
    }
    routes.push(menu)
  })
}

/**
 * 树平铺成list，用来判断用户是否有权限
 * @param treeRoutes 树状
 * @param routeList list
 */
function convertRouteList(treeRoutes, routeList) {
  treeRoutes.forEach((item) => {
    if (item.children) {
      convertRouteList(item.children, routeList)
    }
    routeList.push(item)
  })
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password, verifyCode, verifyCodeId, rememberMe } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password, verifyCode, verifyCodeId, rememberMe })
        .then((response) => {
          const { data } = response
          commit('SET_TOKEN', data.token)
          commit('SET_NAME', data.name)
          commit('SET_ORG_ID', data.orgId)
          setToken(data.token)
          resolve()
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  // get user info
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

          // 根节点不显示
          const loadMenuData = response.data.permissionVOS[0].children
          // 清空之前的路由
          asyncRoutes.length = 0
          // 将后台返回的路由转换成vue需要的格式
          convertRoute(asyncRoutes, loadMenuData)
          // 平铺后的路由
          const routeList = []
          //树平铺成list，用来判断用户是否有权限
          convertRouteList(asyncRoutes, routeList)
          const accessedRoutes = asyncRoutes
          // 保存vue需要的树状路由
          commit('SET_ROUTES', accessedRoutes)
          // 保存树状路由平铺成的list
          commit('SET_ROUTE_LIST', routeList)
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
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
