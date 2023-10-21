//获取某值的字典项
export function getItem(value, items) {
  if (!items) {
    return null
  }
  let result = items.find(n => n.value == value) || null
  if (result != null) {
    return result
  }
  for (let i = 0; i < items.length; i++) {
    let item = getItem(value, items[i].children)
    if (item != null) {
      result = item
      break
    }
  }
  return result
}

//获取某节点的所有父节点
export function getParents(value, items, result, history) {
  for (let i = 0; i < items.length; i++) {
    let item = items[i]
    if (item.value == value) {
      result.push(...history, item)
    } else {
      let containsItem = getItem(value, item.children)
      if (containsItem != null) {
        history.push(item)
        getParents(value, item.children, result, history)
      }
    }
  }
  return result
}
