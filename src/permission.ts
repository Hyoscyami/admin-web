import router from './router'
import store from './store'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'
import hasPermission from './utils/permission'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login'] // no redirect whitelist
const errorList = ['/401'] // 错误页面

router.beforeEach(async (to, _from, next) => {
  // start progress bar
  NProgress.start()
  // set page title
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  const hasToken = getToken()

  if (hasToken) {
    if (errorList.indexOf(to.path) !== -1) {
      next()
    } else if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/dashboard' })
      NProgress.done()
    } else {
      try {
        // get user info
        await store.dispatch('user/getInfo')
        // 没有权限
        if (!hasPermission(to.path)) {
          // 标签页右击刷新
          if (to.path.startsWith('/redirect')) {
            next({ path: '/' + to.params.path })
          } else {
            next({ path: '/401' })
          }
        } else {
          store.dispatch('user/setPermissionId', to.meta.id)
          next()
        }
      } catch (error) {
        // remove token and go to login page to re-login
        await store.dispatch('user/resetToken')
        // ElMessage.error(error || 'Has Error')
        next(`/login?redirect=${to.path}`)
        NProgress.done()
      }
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      if (to.path === '/404') {
        next('/login?redirect=/dashboard')
      } else {
        next(`/login?redirect=${to.path}`)
      }
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
