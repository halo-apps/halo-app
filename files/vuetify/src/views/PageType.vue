<template>
  <div :is="pageType" ref="pageType">{{meta}}</div>
</template>

<script>
  import Index from "./Standards/Index";
  import List from "./Standards/List";
  import Detail from "./Standards/Detail";
  import Update from "./Standards/Update";
  import Custom from "./Customs/Custom";
  import Tree from "./Standards/Tree";

  export default {
    name: "PageType",
    components: {Tree, Custom, Update, Detail, List, Index},
    methods: {
      refresh() {
        this.$refs.pageType.refresh()
      }
    },
    computed: {
      pageType() {
        let result = this.meta.pageType
        if (result == 'Insert') {
          result = 'Update'
        }
        return result
      },
      meta() {
        let matched = this.$route.matched
        let result = matched[matched.length - 1].meta
        return result
      }
    }
  }
</script>

<style scoped>

</style>
