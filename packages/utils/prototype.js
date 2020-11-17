export default function() {
  /**
   * 通过字符串，获取对象的值
   *
   * @param {Object} object 源对象
   */
  String.prototype.fetchValue = function(object) {
    return this.split('.').reduce((o, k) => (o === undefined ? undefined : o[k]), object)
  }

  // String.prototype.resolveObject = function(value) {
  //   const ns = this.split('.')
  //   let o = { [ns[ns.length - 1]]: value }
  //   if (ns.length > 1)
  //     for (let i = ns.length - 1; i--; ) {
  //       o = { [ns[i]]: o }
  //     }
  //   return o
  // }

  String.prototype.resolveObject = function(value) {
    const [first, ...os] = this.split('.').reverse()
    return os.reduce((o, k) => ({ [k]: o }), { [first]: value })
  }
}
