const ENCODER = new TextEncoder()

export default {
  // HMAC-SHA256
  async hs256(key, msg) {
    const K = await window.crypto.subtle.importKey(
      'raw',
      ENCODER.encode(key),
      {
        name: 'HMAC',
        hash: 'SHA-256'
      },
      false,
      ['sign']
    )
    const sign = await window.crypto.subtle.sign(
      'HMAC',
      K,
      ENCODER.encode(msg)
    )
    const u8Array = new Uint8Array(sign)
    let hexBuf = new Array(32)
    for (let i = 0; i < 32; ++i) {
      let s = u8Array[i].toString(16)
      hexBuf[i] = (s.length == 1) ? ('0' + s) : s
    }
    return hexBuf.join('')
  }
}
