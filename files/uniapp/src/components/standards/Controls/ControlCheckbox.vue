<template>
	<checkbox-group @change="change">
		<checkbox :disabled="field.readonly" :value="kv.value" :checked="model.indexOf(kv.value)>-1" v-for="kv in field.dictionary.data"
		 :key="kv.value">{{kv.text}}</checkbox>
	</checkbox-group>
</template>

<script>
	import {
		getValue,
		setValue
	} from '../../../plugins/standards/control-helper'

	export default {
		name: 'ControlCheckbox',
		props: {
			field: {
				type: Object,
				default: null
			},
			table: {
				type: Object,
				default: null
			},
			form: {
				type: Object,
				default: null
			}, //大表单信息
			index: {
				type: Number,
				default: null
			} //当前行的索引，不定义表示是列表搜索控件
		},
		methods: {
			change({
				detail
			}) {
				this.model = detail.value
			}
		},
		computed: {
			model: {
				get() {
					let result = getValue(this.form, this.index, this.table, this.field)
					if (result) {
						return result.split(',')
					}
					return []
				},
				set(val) {
					let value = val.toString()
					setValue(value, this.form, this.index, this.table, this.field)
					this.$emit('change', this.form)
				}
			}
		}
	}
</script>

<style scoped>

</style>
