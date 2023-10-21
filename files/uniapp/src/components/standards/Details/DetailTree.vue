<template>
  <div class="tree-layout">
    <!-- <el-row v-for="(row,rowIndex) in rows" :key="`${table.name}.${rowIndex}`">
      <el-col :span="24/layout.columns" v-for="(item,columnIndex) in row"
              :key="`${table.name}.${rowIndex}.${columnIndex}`">
         <el-tree ref="tree"
                 node-key="Id"
                 disabled
                 show-checkbox
                 highlight-current
                 :default-expand-all="false"
                 :default-expanded-keys="expandedKeys"
                 :check-strictly="true"
                 :data="[item]"
                 :default-checked-keys="checkedKeys[`${rowIndex}.${columnIndex}`]"
                 :props="{children: 'Children', label: layout.text}"
                 :expand-on-click-node="false">
        </el-tree> 
      </el-col>
    </el-row> -->
  </div>
</template>

<script>
  import {splitRows} from '../../../plugins/standards/control-helper'

  export default {
    name: 'DetailTree',
    props: {
      form: {type: Object, required: true},
      table: {type: Object, required: true}
    },
    data() {
      return {
        checkedKeys: null, //所有树默认被选中的节点，不能更新，会导致树自动收缩
        expandedKeys: []
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
            let checkedKeys = this.form[this.table.name].filter(n => childrenIds.indexOf(n[this.layout.checked]) != -1).map(n => n[this.layout.checked])
            this.$set(this.checkedKeys, `${rowIndex}.${columnIndex}`, checkedKeys)
          }
        }
        //设置展开的节点
        this.expandedKeys = this.form[this.table.name].filter(n => n[this.layout.expand] == 'true').map(n => n["PermissionId"])
      },
      //获取所有子节点
      getChildren(value, nodes) {
        let result = [] //最外层元素也作为子节点
        let node = this.getItem(value, nodes)
        if (node) {
          node.disabled = true //跟修改不同点：禁用节点
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
      }
    },
    created() {
      this.init()
    },
    computed: {
      //获取所有行
      rows() {
        let result = splitRows(this.table.layout.data, this.layout.columns)
        return result
      },
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
  .tree-layout {
  }
</style>
