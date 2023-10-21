import request from '../plugins/request'

//获取列表
export function getList(url, params) {
	return request({
		url: url,
		method: 'get',
		params,
	})
}

//获取明细
export function getDetail(url, params) {
	return request({
		url: url,
		method: 'get',
		params,
	})
}

//获取更新
export function getUpdate(url, params) {
	return request({
		url: url,
		method: 'get',
		params,
	})
}

//提交更新
export function submitUpdate(url, data) {
	return request({
		url: url,
		method: 'post',
		data
	})
}

//批量删除数据
export function remove(url, data) {
	return request({
		url: url,
		method: 'post',
		data
	})
}

//提交导入
export function submitImport(url, params) {
	return request({
		url: url,
		method: 'get',
		params,
	})
}

//提交导出
export function submitExport(url, params) {
	return request({
		url: url,
		method: 'get',
		params
	})
}
