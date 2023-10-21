<template>
	<textarea class="control-textarea" :placeholder="'请输入'+field.label" :disabled="field.readonly" :value="model" @input="input">
	</textarea>
</template>
<script>
	import {
		getValue,
		setValue
	} from '../../../plugins/standards/control-helper'

	export default {
		name: "ControlTextarea",
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
			submit() {
				this.$emit('submit')
			},
			input({
				detail
			}) {
				this.model = detail.value
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

<style lang="scss">
	.control-textarea {
		background: #fff;
	}
</style>
