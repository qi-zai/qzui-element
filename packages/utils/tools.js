/**
 * 获取 mold 数据
 * @param {Array} molds
 * @param {Object} param1
 */
export const fetchMoldValues = (molds, { origin, key }) => {
  const obj = {}
  for (const v of molds) {
    const value = origin ? origin[v[key]] : v.value
    if (!v.key) continue

    if (v.key.includes(',')) {
      v.key.split(',').forEach((k, i) => k && (value || typeof value === 'number') && value[i] && (obj[k] = value[i]))
    } else if (v.key.includes('.')) {
      const temp = v.key.resolveObject(value)
      for (const k in temp) obj[k] = temp[k]
    } else {
      obj[v.key] = value
    }
  }
  return obj
}
