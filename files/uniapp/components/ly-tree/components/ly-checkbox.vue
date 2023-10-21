<template>
	<text :class="classObj.wrapper" @click.stop="handleClick">
		<text :class="[classObj.input, {'is-indeterminate': indeterminate, 'is-checked': checked, 'is-disabled': disabled}]">
			<text :class="classObj.inner"></text>
		</text>
	</text>
</template>

<script>
	export default {
		data() {
			return {
				classObj: {}
			}
		},
		
		props: {
			type: {
				type: String,
				validator(t) {
					return t === 'radio' || t === 'checkbox'
				}
			},
			checked: Boolean,
			disabled: Boolean,
			indeterminate: Boolean
		},
		
		created() {
			this.classObj = {
				wrapper: `ly-${this.type}`,
				input: `ly-${this.type}__input`,
				inner: `ly-${this.type}__inner`
			}
		},
		
		methods: {
			handleClick() {
				this.$emit('check', this.checked);
			}
		}
	}
</script>