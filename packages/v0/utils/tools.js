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

/**
 * 数组填充
 *
 * @param {number} len 长度
 * @param {Function} fn 回调
 */
export function fillArray(len, fn) {
  const list = []
  for (let i = 0; i < len; i++) list.push(fn && fn(i))
  return list
}

/**
 * 随机字符串
 */
function random() {
  return Math.random()
    .toString(16)
    .substr(2)
}

/**
 * 随机 uuid
 *
 * @param {number} len 默认 35 位
 */
export function uuid(len = 35) {
  return fillArray(Math.ceil(len / random().length), random)
    .join('')
    .substr(0, len)
}
