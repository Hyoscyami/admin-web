import axios from 'axios'
import { ElMessageBox, ElMessage } from 'element-plus'
import store from '@/store'
import { getToken } from '@/utils/auth'
import { CommonEnum } from '../enums/CommonEnum'
import { isBlank } from './common'

// create an axios instance
const service = axios.create({
  baseURL: '/api', // url = base url + request url
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  (config) => {
    // do something before request is sent

    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['X-Auth-Token'] = getToken()
      config.headers['orgId'] = store.getters.orgId
      if (!isBlank(store.getters.permissionId)) {
        config.headers['permissionId'] = store.getters.permissionId
      }
    }
    return config
  },
  (error) => {
    // do something with request error
    console.log('request error:', error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  (response) => {
    const res = response.data

    // if the custom code is not 20000, it is judged as an error.
    if (res.code !== CommonEnum.SUCCESS_CODE) {
      ElMessage({
        message: res.msg || 'Error',
        type: 'error',
        duration: 5 * 1000
      })

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (res.code === 'A0301') {
        // to re-login
        ElMessageBox.confirm('您已退出登录，是否重新登录', '确定退出', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }
      return Promise.reject(new Error(res.msg || 'Error'))
    } else {
      return res
    }
  },
  (error) => {
    console.log('err' + error) // for debug
    if (error.response.status === 401) {
      ElMessageBox.confirm('您登录已过期，是否重新登录', '确定退出', {
        confirmButtonText: '重新登录',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        store.dispatch('user/resetToken').then(() => {
          location.reload()
        })
      })
    }
    return Promise.reject(error)
  }
)

export default service
