import { createRouter, createWebHistory } from 'vue-router'

/* Layout */
import Layout from '@/layout/index.vue'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/error/404.vue'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/dashboard.vue'),
        meta: { title: '首页', icon: 'dashboard' }
      }
    ]
  },
  {
    path: '/sys',
    component: Layout,
    redirect: 'noRedirect',
    name: 'Sys',
    meta: { title: '系统管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'org',
        name: 'Org',
        component: () => import('@/views/sys/org/index.vue'),
        meta: { title: '组织管理', icon: 'table' }
      },
      {
        path: 'role',
        name: 'Role',
        component: () => import('@/views/sys/role/index.vue'),
        meta: { title: '角色管理', icon: 'table' }
      },
      {
        path: 'operator',
        name: 'Operator',
        component: () => import('@/views/sys/operator/index.vue'),
        meta: { title: '员工管理', icon: 'table' }
      },
      {
        path: 'permission',
        name: 'Permission',
        component: () => import('@/views/sys/permission/index.vue'),
        meta: { title: '权限管理', icon: 'tree' }
      },
      {
        path: 'dict',
        name: 'Dict',
        component: () => import('@/views/sys/dict/index.vue'),
        meta: { title: '字典管理', icon: 'table' }
      },
      {
        path: 'config',
        name: 'Config',
        component: () => import('@/views/sys/config/index.vue'),
        meta: { title: '系统设置', icon: 'table' }
      }
    ]
  },
  {
    path: '/bad-debt',
    component: Layout,
    redirect: 'noRedirect',
    name: 'bad-debt',
    meta: { title: '初始申报', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'import',
        name: 'BadDebtImport',
        component: () => import('@/views/bad-debt/import/index.vue'),
        meta: { title: '数据导入', icon: 'table' }
      },
      {
        path: 'confirm',
        name: 'BadDebtConfirm',
        component: () => import('@/views/bad-debt/confirm/index.vue'),
        meta: { title: '核销确认', icon: 'table' }
      }
    ]
  },
  {
    path: '/401',
    component: () => import('@/views/error/401.vue'),
    hidden: true,
    name: 'Page401'
  },
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index.vue')
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '/:catchAll(.*)', redirect: '/404', hidden: true }
]
export const asyncRoutes = []

const router = createRouter({
  history: createWebHistory(),
  routes: constantRoutes.concat(asyncRoutes)
})

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  // const newRouter = createRouter({
  //   history: createWebHistory(),
  //   routes: constantRoutes.concat(asyncRoutes)
  // })
  // router.matcher = newRouter.matcher // reset router
}

export default router
