<template>
	<view class="tree-layout">
		<ly-tree :tree-data="table.layout.data" :ready="ready" node-key="Id" @node-expand="nodeExpand" @node-click="handleNodeClick">
		</ly-tree>
		<!-- <el-tree ref="tree" node-key="Id" show-checkbox highlight-current :default-expand-all="false" :default-expanded-keys="expandedKeys"
		 :check-strictly="true" :data="[item]" :default-checked-keys="checkedKeys[`${rowIndex}.${columnIndex}`]" :props="{children: 'Children', label: layout.text}"
		 :expand-on-click-node="false" @node-expand="nodeExpand" @node-collapse="nodeCollapse" @check="check(...arguments, table,rowIndex*layout.columns+columnIndex)">
		</el-tree> -->
	</view>
</template>

<script>
	import LyTree from '@/components/ly-tree/ly-tree.vue'
	import {
		splitRows
	} from '../../../plugins/standards/control-helper'

	export default {
		name: 'UpdateTree',
		components: {
			LyTree
		},
		data() {
			return {
				ready: false
			}
		},
		props: {
			form: {
				type: Object,
				required: true
			},
			table: {
				type: Object,
				required: true
			},
		},
		data() {
			return {
				checkedKeys: null, //所有树默认被选中的节点，不能更新，会导致树自动收缩
				expandedKeys: [],
			}
		},
		methods: {
			//设置每棵树的默认选中节点（使用同一的对象，会导致树自动收缩）
			init() {
				if (!this.checkedKeys) {
					this.checkedKeys = {}
				}
				for (let rowIndex = 0; rowIndex < this.rows.length; rowIndex++) {
					let row = this.rows[rowIndex]
					for (let columnIndex = 0; columnIndex < row.length; columnIndex++) {
						let tree = row[columnIndex]
						let children = this.getChildren(tree[this.layout.id], [tree])
						let childrenIds = children.map(n => n[this.layout.id])
						let checkedKeys = this.form[this.table.name].filter(n => childrenIds.indexOf(n[this.layout.checked]) != -1).map(n =>
							n[this.layout.checked])
						this.$set(this.checkedKeys, `${rowIndex}.${columnIndex}`, checkedKeys)
					}
				}
				//设置展开的节点
				this.expandedKeys = this.form[this.table.name].filter(n => n[this.layout.expand] == 'true').map(n => n[
					"PermissionId"])
				this.ready = true
			},
			nodeExpand(data, node, el) {
				let row = this.form[this.table.name].find(n => n["PermissionId"] == data[this.layout.id])
				//节点没有选中，不保存展开状态
				if (!row) return
				row[this.layout.expand] = true
			},
			handleNodeClick(){
				
			},
			nodeCollapse(data, node, el) {
				let row = this.form[this.table.name].find(n => n["PermissionId"] == data[this.layout.id])
				//节点没有选中，不保存展开状态
				if (!row) return
				row[this.layout.expand] = false
			},
			check(data, check, table, treeIndex) {
				let treeDataChecked = this.form[table.name]

				//获取所有树被选中的节点
				let checkedKeys = []
				this.$refs.tree.forEach(tree => {
					checkedKeys.push(...tree.getCheckedKeys())
				})
				//获取数据源中被选中的节点（也就是老的被选中的节点）
				let oldCheckedKeys = treeDataChecked.map(n => n[table.layout.checked])

				let inserted = checkedKeys.filter(n => oldCheckedKeys.indexOf(n) == -1)
				let deleted = oldCheckedKeys.filter(n => checkedKeys.indexOf(n) == -1)
				inserted.forEach(key => {
					let children = this.getChildren(key, table.layout.data)
					children.forEach(child => {
						let item = treeDataChecked.find(n => n[table.layout.checked] == child[this.layout.id])
						if (item == null) {
							treeDataChecked.push({
								[table.layout.checked]: child[this.layout.id]
							})
							//人为选中子节点，在每棵树上设置全部的选中节点也没有关系，因为有的节点不存在，也不会被选中
							this.$refs.tree[treeIndex].setChecked(child[this.layout.id], true)
						}
					})
				})
				deleted.forEach(item => {
					let children = this.getChildren(item, table.layout.data)
					children.forEach(child => {
						let node = treeDataChecked.find(n => n[table.layout.checked] == child[this.layout.id])
						let index = treeDataChecked.indexOf(node)
						treeDataChecked.splice(index, 1)
						//人为取消子节点选中，在每棵树上设置全部的选中节点也没有关系，因为有的节点不存在，也不会被选中
						this.$refs.tree[treeIndex].setChecked(child[this.layout.id], false)
					})
				})

				//更新默认被选中的对象，会导致树收缩，所以，不能更新
				// this.$set(this.checkedKeys, name, [])
			},
			//获取所有子节点
			getChildren(value, nodes) {
				let result = [] //最外层元素也作为子节点
				let node = this.getItem(value, nodes)
				if (node) {
					result.push(node)
					if (node.Children.length > 0) {
						node.Children.forEach(child => {
							let items = this.getChildren(child[this.layout.id], nodes)
							result.push(...items)
						})
					}
				}
				return result
			},
			getItem(value, items) {
				if (!items) {
					return null
				}
				let result = items.find(n => n[this.layout.id] == value) || null
				if (result != null) {
					return result
				}
				for (let i = 0; i < items.length; i++) {
					let item = this.getItem(value, items[i].Children)
					if (item != null) {
						result = item
						break
					}
				}
				return result
			},
			//获取所有父节点
			getParents(value, items, result, history) {
				for (let i = 0; i < items.length; i++) {
					let item = items[i]
					if (item[this.layout.id] == value) {
						result.push(...history, item)
					} else {
						let containsItem = this.getItem(value, item.Children)
						if (containsItem != null) {
							history.push(item)
							this.getParents(value, item.Children, result, history)
						}
					}
				}
				return result
			}
		},
		onLoad() {
			this.init()
		},
		computed: {
			layout() {
				return this.table.layout
			}
		},
		watch: {
			$route() {
				this.init()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.tree-layout {}
</style>
