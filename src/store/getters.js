const getters = {
    sidebar: (state) => state.app.sidebar,
    device: (state) => state.app.device,
    token: (state) => state.user.token,
    avatar: (state) => state.user.avatar,
    name: (state) => state.user.name,
    orgId: (state) => state.user.orgId,
    permissionId: (state) => state.user.permissionId,
    visitedViews: (state) => state.tagsView.visitedViews,
    cachedViews: (state) => state.tagsView.cachedViews,
    // 树状路由
    permissionTreeRoutes: (state) => state.user.routes,
    // 树状路由平铺成的list
    permissionListRoutes: (state) => state.user.routeList
}
export default getters
