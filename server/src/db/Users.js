let NEXTUID = 0

module.exports = {
  store: new Map(),
  getNextUid() {
    return NEXTUID
  },
  incNextUid() {
    ++NEXTUID
  }
}
