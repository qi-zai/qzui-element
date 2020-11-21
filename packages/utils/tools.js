/**
 * 获取 mold 数据
 * @param {Array} molds
 * @param {Object} param1
 */
export const fetchMoldValues = (molds, config) => {
  const obj = {}
  for (const v of molds) {
    if (!v.key) continue
    const { origin, key } = config || {}
    const value = origin ? origin[v[key]] : v.value

    if (v.key.includes(',')) {
      v.key.split(',').forEach((k, i) => k && value && value[i] && (obj[k] = value[i]))
    } else if (v.key.includes('.')) {
      const temp = v.key.resolveObject(value)
      for (const k in temp) obj[k] = temp[k]
    } else {
      obj[v.key] = value
    }
  }
  return obj
}
