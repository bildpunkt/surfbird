import Twitter from 'twitter'
import credentials from '../../resources/credentials.json'
import { processTweet } from '../processors/twitter'

export default class TwitterClient {
  constructor (tokens) {
    this.api = new Twitter({
      consumer_key: credentials['twitter']['consumerKey'],
      consumer_secret: credentials['twitter']['consumerSecret'],
      access_token_key: tokens['accessToken'],
      access_token_secret: tokens['accessTokenSecret']
    })

    this.ACTIONS = [
      {
        name: 'Retweet',
        icon: 'repeat',
        function: 'retweet'
      },
      {
        name: 'Like',
        icon: 'star',
        function: 'like'
      }
    ]

    this.COLUMN_TYPES = [
      'home'
    ]

    this.COLUMNS = {
      home: {
        name: 'Home',
        icon: '',
        type: 'streaming',
        functions: {
          initialData: 'homeInitialData',
          data: 'homeData'
        }
      }
    }
  }

  retweet (tweet, callback) {
    if (tweet.retweeted) {
      this.api.post('statuses/unretweet', {id: tweet.id_str}, (error, data, response) => {
        if (error) { console.log(error) }

        callback(data)
      })
    } else {
      this.api.post('statuses/retweet', {id: tweet.id_str}, (error, data, response) => {
        if (error) { console.log(error) }

        callback(data)
      })
    }
  }

  like (tweet, callback) {
    if (tweet.favorited) {
      this.api.post('favorites/destroy', {id: tweet.id_str}, (error, data, response) => {
        if (error) { console.log(error) }

        callback(data)
      })
    } else {
      this.api.post('favorites/create', {id: tweet.id_str}, (error, data, response) => {
        if (error) { console.log(error) }

        callback(data)
      })
    }
  }

  verifyCredentials (callback) {
    this.api.get('account/verify_credentials', {}, (error, data, response) => {
      if (error) { console.log(error) }

      callback(data)
    })
  }

  startStreaming (path, callback) {
    this.api.stream('user', {with: 'followings', include_rts: 'false', extended_tweet: true}, (stream) => {
      stream.on('data', (tweet) => {
        console.log(tweet)
        callback(this.process(tweet))
      })
    })
  }

  homeInitialData (callback) {
    this.api.get('statuses/home_timeline', {with: 'followings', include_rts: 'false', extended_tweet: true}, (error, data, response) => {
      if (error) { console.log(error) }

      data.forEach(function (tweet) {
        callback(processTweet(tweet))
      })
    })
  }

  homeData (callback) {
    this.api.stream('user', {with: 'followings', include_rts: 'false', extended_tweet: true}, (stream) => {
      stream.on('data', (tweet) => {
        callback(processTweet(tweet))
      })
    })
  }
}

// Reply: #199ff4
// Like: #e91e63
// Retweet: #4caf50
// More: #202020
