<template>
	<view class="ly-tree-node" @tap.stop="handleClick" v-show="node.visible" :class="{ 'is-expanded': expanded, 
			'is-current': node.isCurrent, 
			'is-hidden': !node.visible, 
			'is-checked': !node.disabled && node.checked }"
	 role="treeitem" name="LyTreeNode" ref="node">
		<view class="ly-tree-node__content" :style="{ 'padding-left': (node.level - 1) * indent + 'px' }">
			<text @tap.stop="handleExpandIconClick" :class="[{ 'is-leaf': node.isLeaf, expanded: !node.isLeaf && node.expanded }, 'ly-tree-node__expand-icon', iconClass ? iconClass : 'ly-iconfont ly-icon-caret-right']"></text>
			
			<ly-checkbox v-if="checkboxVisible || radioVisible"
				:type="checkboxVisible ? 'checkbox' : 'radio'" 
				:checked="node.checked" 
				:indeterminate="node.indeterminate" 
				:disabled="!!node.disabled"
				@check="handleCheckChange(!node.checked)"/>
			
			<text v-if="node.loading" class="ly-tree-node__loading-icon ly-iconfont ly-icon-loading"></text>
			
			<template v-if="node.icon && node.icon.length > 0">
				<image v-if="node.icon.indexOf('/') !== -1" class="ly-tree-node__icon" :src="node.icon" mode="widthFix"></image>
				<text v-else class="ly-tree-node__icon" :class="node.icon"></text>
			</template>
			
			<text class="ly-tree-node__label">{{node.label}}</text>
		</view>
		
		<view v-if="!renderAfterExpand || childNodeRendered" v-show="expanded" class="ly-tree-node__children" role="group">
			<ly-tree-node v-for="cNodeId in node.childNodesId" 
				:nodeId="cNodeId" 
				:render-after-expand="renderAfterExpand" 
				:show-checkbox="showCheckbox"
				:show-radio="showRadio" 
				:check-only-leaf="checkOnlyLeaf"
				:key="getNodeKey(cNodeId)" 
				:indent="indent" 
				:icon-class="iconClass">
			</ly-tree-node>
		</view>
	</view>
</template>

<script>
	import {getNodeKey} from './tool/util.js';
	import lyCheckbox from './components/ly-checkbox.vue';

	export default {
		name: 'LyTreeNode',
		
		componentName: 'LyTreeNode',
		
		components: {
			lyCheckbox
		},
		
		props: {
			nodeId: [Number, String],
			renderAfterExpand: {
				type: Boolean,
				default: true
			},
			checkOnlyLeaf: {
				type: Boolean,
				default: false
			},
			showCheckbox: {
				type: Boolean,
				default: false
			},
			showRadio: {
				type: Boolean,
				default: false
			},
			indent: Number,
			iconClass: String
		},
		
		data() {
			return {
				node: {
					indeterminate: false,
					checked: false,
					expanded: false
				},
				expanded: false,
				childNodeRendered: false,
				oldChecked: null,
				oldIndeterminate: null
			};
		},
		
		inject: ['tree'],
		
		computed: {
			checkboxVisible() {
				if (this.checkOnlyLeaf) {
					return this.showCheckbox && this.node.isLeaf;
				}
				
				return this.showCheckbox;
			},
			radioVisible() {
				if (this.checkOnlyLeaf) {
					return this.showRadio && this.node.isLeaf;
				}
				
				return this.showRadio;
			}
		},
		
		watch: {
			'node.indeterminate'(val) {
				this.handleSelectChange(this.node.checked, val);
			},
			'node.checked'(val) {
				this.handleSelectChange(val, this.node.indeterminate);
			},
			'node.expanded'(val) {
				this.$nextTick(() => this.expanded = val);
				if (val) {
					this.childNodeRendered = true;
				}
			}
		},
		
		methods: {
			getNodeKey(nodeId) {
				let node = this.tree.store.root.getChildNodes([nodeId])[0];
				return getNodeKey(this.tree.nodeKey, node.data);
			},
			
			handleSelectChange(checked, indeterminate) {
				if (this.oldChecked !== checked && this.oldIndeterminate !== indeterminate) {
					
					if (this.checkOnlyLeaf && !this.node.isLeaf) return;
					
					if (this.checkboxVisible) {
						const allNodes = this.tree.store._getAllNodes();
						this.tree.$emit('check-change', {
							checked,
							indeterminate,
							node: this.node,
							data: this.node.data,
							checkedall: allNodes.every(item => item.checked)
						});
					} else {
						this.tree.$emit('radio-change', {
							checked,
							node: this.node,
							data: this.node.data,
							checkedall: false
						});
					}
				}
				
				if (!this.expanded && this.tree.expandOnCheckNode && checked) {
					this.handleExpandIconClick();
				}
				
				this.oldChecked = checked;
				this.indeterminate = indeterminate;
			},
			
			handleClick() {
				this.tree.store.setCurrentNode(this.node);
				this.tree.$emit('current-change', {
					node: this.node,
					data: this.tree.store.currentNode ? this.tree.store.currentNode.data : null,
					currentNode: this.tree.store.currentNode
				});
				this.tree.currentNode = this.node;
				
				if (this.tree.expandOnClickNode) {
					this.handleExpandIconClick();
				}
				
				if (this.tree.checkOnClickNode && !this.node.disabled) {
					(this.checkboxVisible || this.radioVisible) && this.handleCheckChange(!this.node.checked);
				}
				
				this.tree.$emit('node-click', this.node);
			},
			
			handleExpandIconClick() {
				if (this.node.isLeaf) return;
				
				if (this.expanded) {
					this.tree.$emit('node-collapse', this.node);
					this.node.collapse();
				} else {
					this.node.expand();
					this.tree.$emit('node-expand', this.node);
					
					if (this.tree.accordion) {
						uni.$emit(`${this.tree.elId}-tree-node-expand`, this.node);
					}
				}
			},
			
			handleCheckChange(checked) {
				if (this.node.disabled) return;
				
				if (this.checkboxVisible) {
					this.node.setChecked(checked, !(this.tree.checkStrictly || this.checkOnlyLeaf));
				} else {
					this.node.setRadioChecked(checked);
				}
				
				this.$nextTick(() => {
					this.tree.$emit('check', {
						node: this.node,
						data: this.node.data,
						checkedNodes: this.tree.store.getCheckedNodes(),
						checkedKeys: this.tree.store.getCheckedKeys(),
						halfCheckedNodes: this.tree.store.getHalfCheckedNodes(),
						halfCheckedKeys: this.tree.store.getHalfCheckedKeys()
					});
				});
			}
		},
		
		created() {
			if (!this.tree) {
				throw new Error('Can not find node\'s tree.');
			}
			
			this.node = this.tree.store.nodesMap[this.nodeId];
			
			if (this.node.expanded) {
				this.expanded = true;
				this.childNodeRendered = true;
			}

			const props = this.tree.props || {};
			const childrenKey = props['children'] || 'children';
			this.$watch(`node.data.${childrenKey}`, () => {
				this.node.updateChildren();
			});

			if (this.tree.accordion) {
				uni.$on(`${this.tree.elId}-tree-node-expand`, node => {
					if (this.node.id !== node.id && this.node.level === node.level) {
						this.node.collapse();
					}
				});
			}
		},
		
		beforeDestroy() {
			this.$parent = null;
		}
	};
</script>
