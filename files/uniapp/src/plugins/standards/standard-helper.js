import { getComponentName } from '../customs/component-helper'

//获取所有行数
export function getRows(fields, column) {
  let result = []

  let row = []
  let width = 0
  fields.forEach((field, index) => {
    width += field.width
    if (width <= column) {
      row.push(field)
    } else {
      result.push(row)
      row = [field]
      width = field.width
    }
    //如果计算后，到了最后一行，2种情况，都要把行追加到结果中
    if (index == fields.length - 1) {
      result.push(row)
    }
  })
  return result
}

//获取表的默认行数据
export function getDefaultRow(table) {
  let row = {}
  table.show.forEach(s => {
    row[s.name] = s.default ? s.default : null
  })
  return row
}

//获取所有数据表的搜索字段信息
export function expandSearch(table) {
  let result = []
  let tables = [table].concat(table.children)
  tables.forEach(table => {
    table.search.forEach(field => {
      result.push({ field: field, table: table })
    })
  })
  return result
}

//展开架构信息
export function expandSchema(table) {
  let tables = [table].concat(table.children)
  tables.forEach(table => {
    //设置自定义部分视图
    table.partial = table.partial ? getComponentName(table.partial) : 'update-children'

    //转换字段的验证规则
    table.fields.forEach(f => {
      if (f.rules) {
        let rules = []
        f.rules.forEach(rule => {
          if (rule.name == 'Required') {
            rules.push({ required: true, message: `${f.label}不能为空`, trigger: 'change' })
          } else if (rule.name == 'Length') {
            rules.push({ max: rule.length, message: `${f.label}不能超过${rule.length}个字符`, trigger: 'change' })
          }
        })
        f.rules = rules
      }
    })

    //显示的字段
    if (table.show) {
      let shows = []
      table.show.forEach(s => {
        let show = table.fields.find(f => f.name == s)
        shows.push(show)
      })
      table.show = shows
    }

    //搜索的字段
    let searches = []
    table.search.forEach(s => {
      let search = table.fields.find(f => f.name == s)
      searches.push(search)
    })
    table.search = searches

    //组织主键
    table.key = table.fields.find(n => n.name == table.key)
  })
  return table
}

//构建主键旧数据
export function buildOldKey(table, data) {
  let tables = [table].concat(table.children)
  tables.forEach(table => {
    data[table.name].forEach(row => {
      row[`Old_${table.key.name}`] = row[table.key.name]
    })
  })
  return data
}
