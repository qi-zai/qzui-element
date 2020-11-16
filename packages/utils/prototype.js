export default function() {
  /**
   * 通过字符串，获取对象的值
   *
   * @param {Object} object 源对象
   */
  String.prototype.fetchValue = function(object) {
    return this.split('.').reduce((o, k) => (o === undefined ? undefined : o[k]), object)
  }
}
