import store from '@/store'

/**
 * @param  path 权限值
 * @returns {Boolean}
 * @example see @/views/permission/directive.vue
 */
export default function hasPermission(path: string): boolean {
  return store.getters.permissionListRoutes.some((item: { path: string }) => item.path === path)
}
