export default function() {
  /**
   * 通过字符串，获取对象的值
   *
   * @param {Object} object 源对象
   */
  String.prototype.fetchValue = function(object) {
    return this.split('.').reduce((o, k) => (o === undefined || o === null ? undefined : o[k]), object || {})
  }

  String.prototype.resolveObject = function(value) {
    const [first, ...os] = this.split('.').reverse()
    return os.reduce((o, k) => ({ [k]: o }), { [first]: value })
  }

  Date.prototype.format = function(fmt) {
    const o = {
      'M+': this.getMonth() + 1, // 月份
      'd+': this.getDate(), // 日
      'h+': this.getHours(), // 小时
      'm+': this.getMinutes(), // 分
      's+': this.getSeconds(), // 秒
      'q+': Math.floor((this.getMonth() + 3) / 3), // 季度
      S: this.getMilliseconds() // 毫秒
    }
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length))
    for (const k in o)
      if (new RegExp('(' + k + ')').test(fmt))
        fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length))
    return fmt
  }

  Date.prototype.toTypeStr = function(timestamp) {
    const time = (timestamp || new Date().getTime()) - this.getTime()
    return time < 60 * 1000
      ? '刚刚'
      : time < 60 * 60 * 1000
      ? Math.floor(time / (60 * 1000)) + '分钟前'
      : time < 24 * 60 * 60 * 1000
      ? Math.floor(time / (60 * 60 * 1000)) + '小时前'
      : time < 48 * 60 * 60 * 1000
      ? '昨天'
      : this.format('yyyy-MM-dd hh:mm')
  }
}
