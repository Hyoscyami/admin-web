import router from './router'
import store from './store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getToken } from '@/utils/auth'
import getPageTitle from '@/utils/get-page-title'
import hasPermission from './utils/permission'

NProgress.configure({ showSpinner: false })

const whiteList = ['/login']
const errorList = ['/401']

router.beforeEach(async (to, _from, next) => {

  NProgress.start()

  document.title = getPageTitle(to.meta.title)


  const hasToken = getToken()

  if (hasToken) {
    if (errorList.indexOf(to.path) !== -1) {
      next()
    } else if (to.path === '/login') {

      next({ path: '/dashboard' })
      NProgress.done()
    } else {
      try {

        await store.dispatch('user/getInfo')

        if (!hasPermission(to.path)) {

          if (to.path.startsWith('/redirect')) {
            next({ path: '/' + to.params.path })
          } else {
            next({ path: '/401' })
          }
        } else {
          store.dispatch('user/setPermissionId', to.path)
          next()
        }
      } catch (error) {

        await store.dispatch('user/resetToken')

        next(`/login?redirect=${to.path}`)
        NProgress.done()
      }
    }
  } else {

    if (whiteList.indexOf(to.path) !== -1) {

      next()
    } else {

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

  NProgress.done()
})
