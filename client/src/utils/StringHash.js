/**
 * Calculate the SHA-256 digest of a UTF-8 encoded string
 * Based on the Web Cryptography API
 *
 * Reference:
 * https://www.w3.org/TR/WebCryptoAPI/
 * https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API
 */

const ENCODER = new TextEncoder()

export default {
  async sha256(str) {
    const res = await window.crypto.subtle.digest('SHA-256', ENCODER.encode(str))
    const u8Array = new Uint8Array(res)
    let hexBuf = new Array(32)
    for (let i = 0; i < 32; ++i) {
      let s = u8Array[i].toString(16)
      hexBuf[i] = (s.length == 1) ? ('0' + s) : s
    }
    return hexBuf.join('')
  }
}
