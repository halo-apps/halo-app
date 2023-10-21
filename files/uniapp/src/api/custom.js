import request from '../plugins/request'

//获取系统配置信息
export function getSetting() {
	return request.get('/system/setting')
}

//获取autocomplete数据
export function getAutocomplete(name, data) {
	return request.post('/autocomplete/' + name, data)
}

//上传文件删除
export function uploadDelete(data) {
	return request.post('/system/uploaddelete', data)
}
