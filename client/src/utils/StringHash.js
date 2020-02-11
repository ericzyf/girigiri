const sjcl = require('sjcl')

const ENCODER = new TextEncoder()

export default {
  async sha256(str) {
    if (window.crypto.subtle) {
      // use web crypto if available
      console.log('sha256-webcrypto')
      const res = await window.crypto.subtle.digest('SHA-256', ENCODER.encode(str))
      const u8Array = new Uint8Array(res)
      let hexBuf = new Array(32)
      for (let i = 0; i < 32; ++i) {
        let s = u8Array[i].toString(16)
        hexBuf[i] = (s.length == 1) ? ('0' + s) : s
      }
      return hexBuf.join('')
    } else {
      // use sjcl
      console.log('sha256-sjcl')
      const b = sjcl.hash.sha256.hash(str)
      return sjcl.codec.hex.fromBits(b)
    }
  }
}
