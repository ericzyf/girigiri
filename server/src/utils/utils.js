module.exports = {

  isEmptyObject(obj) {
    for (const p in obj) {
      return false
    }
    return true
  },

  isUndefined(obj) {
    return typeof obj === 'undefined'
  },

  isUpperCase(c) {
    return /^[A-Z]+$/.test(c)
  },

  isLowerCase(c) {
    return /^[a-z]+$/.test(c)
  }

}
