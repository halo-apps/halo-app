//获取控件的值，自动区分搜索控件和提交表单控件
export function getValue(form, index, table, field) {
  let result
  if (index == -1) {
    result = form[table.name][field.name]
  } else {
    result = form[table.name][index][field.name]
  }
  return result
}

//设置表单控件的值
export function setValue(val, form, index, table, field) {
  if (index == -1) {
    form[table.name][field.name] = val
  } else {
    form[table.name][index][field.name] = val
  }
}

//把数组分成每行columns列的数组
export function splitRows(array, columns) {
  let result = []
  for (let i = 0; i < array.length; i += columns) {
    result.push(array.slice(i, i + columns));
  }
  return result
}
