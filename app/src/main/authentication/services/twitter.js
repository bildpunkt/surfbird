export default {
  authenticate (callback) {
    const tokens = {
      accesstoken: 'hi',
      accesssecret: 'hello'
    }

    callback(tokens)
  }
}
