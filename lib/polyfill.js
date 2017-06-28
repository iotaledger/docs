if (!Array.prototype.find) {
  // https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/find
  Array.prototype.find = function ArrayFindPolyfill(predicate) {
    if (null == this) {
      throw new TypeError('Array.prototype.find called on null or undefined')
    }
    if ('function' !== typeof predicate) {
      throw new TypeError('predicate must be a function')
    }

    const list = Object(this)
    const length = list.length >>> 0
    const thisArg = arguments[1]

    for (let i = 0; i < length; i++) {
      const value = list[i]
      if (predicate.call(thisArg, value, i, list)) {
        return value
      }
    }
  }
}
