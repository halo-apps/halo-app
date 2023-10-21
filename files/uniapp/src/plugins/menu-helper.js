import store from '../store/index.js'

//根据路径获取路由信息
export function getMenuByPath(path) {
	let user = store.state.user
	for (let i = 0; i < user.menu.menus.length; i++) {
		let menu = user.menu.menus[i]
		let tmp = getMenuChildrenByPath(menu, path)
		if (tmp) {
			return tmp //跳出并结束执行
		}
	}
	return null
}

//根据路径获取菜单信息
function getMenuChildrenByPath(menu, path) {
	if (menu.url == path)
		return menu
	for (let i = 0; i < menu.children; i++) {
		let child = menu.children[i]
		if (child.url == path)
			return child
		else
			return getMenuChildrenByPath(child, path)
	}
}
