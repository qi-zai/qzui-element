/**
 * 获取 mold 数据
 *
 * @param {array} molds
 * @param {object} { origin: 数据源, key: 取值的key }
 */
export const fetchMoldValues = (molds, options) => {
  const obj = {}
  for (const v of molds) {
    if (!v.key) continue
    const { origin, key } = options || {}
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
