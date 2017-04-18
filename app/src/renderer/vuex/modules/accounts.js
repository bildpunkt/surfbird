import Account from '../../models/account'
import * as types from '../mutation-types'

const state = {
  activeAccount: 0,
  all: []
}

const getters = {
  activeAccount: state => state.activeAccount,
  allAccounts: state => state.allAccounts
}

const actions = {
  addAccount ({ commit, state }, account) {
    commit(types.ADD_ACCOUNT, { account })
  },
  setActiveAccount ({ commit, state }, id) {
    commit(types.SET_ACTIVE_ACCOUNT, { id })
  }
}

const mutations = {
  [types.ADD_ACCOUNT] (state, { account }) {
    state.all.push(new Account(account.user, account.tokens))
  },
  [types.SET_ACTIVE_ACCOUNT] (state, { id }) {
    state.activeAccount = id
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
