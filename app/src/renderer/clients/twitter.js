import Twitter from 'twitter'
import credentials from '../../../resources/credentials.json'

export default class TwitterClient {
  constructor (tokens) {
    this.api = new Twitter({
      consumer_key: credentials['twitter']['consumerKey'],
      consumer_secret: credentials['twitter']['consumerSecret'],
      access_token_key: tokens['accessToken'],
      access_token_secret: tokens['accessTokenSecret']
    })
  }

  verifyCredentials (callback) {
    this.api.get('account/verify_credentials', {}, (error, data, response) => {
      if (error) { console.log(error) }

      callback(data)
    })
  }

  startStreaming (path, callback) {
    this.api.stream('user', {with: 'followings', include_rts: 'false'}, (stream) => {
      stream.on('data', (tweet) => {
        callback(tweet)
      })
    })
  }
}
