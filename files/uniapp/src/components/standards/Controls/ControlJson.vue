<template>
  <control-code :table="table" :field="field" :index="index" :form="form" :from="from" @change="change"></control-code>
</template>

<script>
  import ControlCode from './ControlCode'

  export default {
    name: 'ControlJson',
    components: { ControlCode },
    props: {
      table: { type: Object, default: null },
      field: { type: Object, default: null },
      index: { type: Number, default: null },
      form: { type: Object, default: null },
      from: { type: String, default: null }
    },
		methods:{
			change(form){
				this.$emit('change', form)
			}
		}
  }
</script>

<style lang="scss">

</style>
