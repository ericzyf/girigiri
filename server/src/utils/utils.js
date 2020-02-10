module.exports = {

  isEmptyObject(obj) {
    for (const p in obj) {
      return false
    }
    return true
  },

  isUndefined(obj) {
    return typeof obj === 'undefined'
  }

}
