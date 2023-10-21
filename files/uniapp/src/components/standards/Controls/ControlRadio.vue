<template>
	<radio-group @change="change">
		<radio :disabled="field.readonly" :value="kv.value" :checked="kv.value==model" v-for="kv in field.dictionary.data"
		 :key="kv.value">{{kv.text}}
		</radio>
	</radio-group>
</template>

<script>
	import {
		getValue,
		setValue
	} from '../../../plugins/standards/control-helper'

	export default {
		name: "ControlRadio",
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
			}, //当前行的索引
		},
		methods: {
			change({
				target
			}) {
				this.model = target.value
			}
		},
		computed: {
			model: {
				get() {
					let result = getValue(this.form, this.index, this.table, this.field)
					return result
				},
				set(val) {
					setValue(val, this.form, this.index, this.table, this.field)
					this.$emit('change', this.form)
				}
			}
		}
	}
</script>

<style scoped>

</style>
