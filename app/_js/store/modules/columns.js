import * as types from '../mutation-types'

const state = []

const getters = {
  allColumns: state => state
}

const actions = {
  addColumn ({ commit, state }, column) {
    commit(types.ADD_COLUMN, { column })
  },
  startStreaming({ commit, state }, index) {
    // TODO: Replace this with the function call to retrieve data from a Twitter stream
    setInterval(function(index) {
      let payload = {tweet: "1", index: index}
      commit(types.ADD_TWEET_TO_COLUMN, { payload })
    }.bind(null, index), 3000)
  }
}

const mutations = {
  [types.ADD_COLUMN] (state, { column }) {
    state.push(column)
  },
  [types.ADD_TWEET_TO_COLUMN] (state, { payload }) {
    state[payload.index].tweets.unshift(payload.tweet)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
