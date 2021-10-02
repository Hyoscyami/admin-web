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
    redirect: 'noRedirect',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index.vue'),
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
      },
      {
        path: 'file-config',
        name: 'SysFileConfig',
        component: () => import('@/views/sys/file-config/index.vue'),
        meta: { title: '基础档案设置', icon: 'table' }
      }
    ]
  },
  {
    path: '/bad-debt',
    component: Layout,
    redirect: 'noRedirect',
    name: 'BadDebt',
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
        component: () => import('../views/bad-debt/confirm/index.vue'),
        meta: { title: '核销确认', icon: 'table' }
      },
      {
        path: 'evidence',
        name: 'BadDebtEvidence',
        component: () => import('@/views/bad-debt/evidence/index.vue'),
        meta: { title: '税收证据确认', icon: 'table' }
      }
    ]
  },
  {
    path: '/bad-debt/confirm',
    component: Layout,
    redirect: 'noRedirect',
    children: [
      {
        path: 'add',
        name: 'BadDebtConfirmAdd',
        component: () => import('@/views/bad-debt/confirm/add.vue'),
        meta: { title: '新增呆账核销数据', icon: 'table' },
        hidden: true
      }
    ]
  },
  {
    path: '/bad-debt/confirm',
    component: Layout,
    redirect: 'noRedirect',
    children: [
      {
        path: 'edit',
        name: 'BadDebtConfirmEdit',
        component: () => import('@/views/bad-debt/confirm/edit.vue'),
        meta: { title: '编辑呆账核销数据', icon: 'table' },
        hidden: true
      }
    ]
  },
  {
    path: '/bad-debt/confirm',
    component: Layout,
    redirect: 'noRedirect',
    children: [
      {
        path: 'import',
        name: 'BadDebtConfirmImport',
        component: () => import('../views/bad-debt/confirm/import.vue'),
        meta: { title: '导入会计凭证', icon: 'table' },
        hidden: true
      }
    ]
  },
  {
    path: '/bad-debt/evidence',
    component: Layout,
    redirect: 'noRedirect',
    children: [
      {
        path: 'verify',
        name: 'BadDebtEvidenceVerify',
        component: () => import('@/views/bad-debt/evidence/verify.vue'),
        meta: { title: '税收证据审核', icon: 'table' },
        hidden: true
      }
    ]
  },
  {
    path: '/',
    component: Layout,
    redirect: 'noRedirect',
    children: [
      {
        path: 'declaration-management',
        name: 'DeclarationManagement',
        component: () => import('@/views/declaration-management/index.vue'),
        meta: { title: '申报管理', icon: 'dashboard' }
      }
    ]
  },
  {
    path: '/',
    component: Layout,
    redirect: 'noRedirect',
    children: [
      {
        path: 'deferred-declaration',
        name: 'DeferredDeclaration',
        component: () => import('@/views/deferred-declaration/index.vue'),
        meta: { title: '延后申报', icon: 'dashboard' }
      }
    ]
  },
  {
    path: '/deferred-declaration',
    component: Layout,
    redirect: 'noRedirect',
    children: [
      {
        path: 'verify',
        name: 'DeferredDeclarationVerify',
        component: () => import('@/views/deferred-declaration/verify.vue'),
        meta: { title: '延后申报审核', icon: 'table' },
        hidden: true
      }
    ]
  },
  {
    path: '/',
    component: Layout,
    redirect: 'noRedirect',
    children: [
      {
        path: 'deferred-declaration',
        name: 'DeferredDeclaration',
        component: () => import('@/views/deferred-declaration/index.vue'),
        meta: { title: '延后申报', icon: 'dashboard' }
      }
    ]
  },
  {
    path: '/write-off-recover',
    component: Layout,
    redirect: 'noRedirect',
    name: 'WriteOffRecover',
    meta: { title: '核销收回', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'import',
        name: 'WriteOffRecoverImport',
        component: () => import('@/views/write-off-recover/import/index.vue'),
        meta: { title: '数据导入', icon: 'table' }
      },
      {
        path: 'make-up',
        name: 'WriteOffRecoverMakeUp',
        component: () => import('@/views/write-off-recover/make-up/index.vue'),
        meta: { title: '核销收回补录', icon: 'table' }
      },
      {
        path: 'verify',
        name: 'WriteOffRecoverVerify',
        component: () => import('@/views/write-off-recover/verify/index.vue'),
        meta: { title: '核销收回审核', icon: 'table' }
      }
    ]
  },
  {
    path: '/',
    component: Layout,
    redirect: 'noRedirect',
    children: [
      {
        path: 'laws-regulations',
        name: 'LawsRegulations',
        component: () => import('@/views/laws-regulations/index.vue'),
        meta: { title: '法律法规', icon: 'dashboard' }
      }
    ]
  },
  {
    path: '/sys/file-config',
    component: Layout,
    redirect: 'noRedirect',
    children: [
      {
        path: 'add',
        name: 'FileConfigAdd',
        component: () => import('@/views/sys/file-config/add.vue'),
        meta: { title: '新增基础档案设置', icon: 'dashboard' }
      },
      {
        path: 'edit',
        name: 'FileConfigEdit',
        component: () => import('@/views/sys/file-config/edit.vue'),
        meta: { title: '编辑基础档案设置', icon: 'dashboard' }
      }
    ]
  },
  {
    path: '/',
    component: Layout,
    redirect: 'noRedirect',
    children: [
      {
        path: 'file-management',
        name: 'FileManagement',
        component: () => import('@/views/file-management/index.vue'),
        meta: { title: '文档管理', icon: 'dashboard' }
      }
    ]
  },
  {
    path: '/',
    component: Layout,
    redirect: 'noRedirect',
    children: [
      {
        path: 'statistics',
        name: 'Statistics',
        component: () => import('@/views/statistics/index.vue'),
        meta: { title: '统计查询', icon: 'dashboard' }
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
