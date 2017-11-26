import Account from '../../models/account'
import * as types from '../mutation-types'

const state = {
  activeAccount: 0,
  lastAddedAccount: 0,
  all: []
}

const getters = {
  activeAccount: state => state.activeAccount,
  allAccounts: state => state.allAccounts
}

const actions = {
  addAccount ({ commit, dispatch, state }, account) {
    commit(types.ADD_ACCOUNT, { account })
    dispatch('refreshUserInfo', state.lastAddedAccount)
  },
  setActiveAccount ({ commit, state }, id) {
    commit(types.SET_ACTIVE_ACCOUNT, { id })
  },
  refreshUserInfo ({ commit, state }, id) {
    state.all[state.lastAddedAccount].client.verifyCredentials((user) => {
      let payload = {
        id: state.lastAddedAccount,
        data: user
      }

      commit(types.REFRESH_USER_INFO, { payload })
    })
  }
}

const mutations = {
  [types.ADD_ACCOUNT] (state, { account }) {
    state.all.push(new Account(account, 'twitter'))
    state.lastAddedAccount = state.all.length - 1

    state.all[state.lastAddedAccount].client.verifyCredentials((user) => {
      state.all[state.lastAddedAccount].user = user
    })
  },
  [types.SET_ACTIVE_ACCOUNT] (state, { id }) {
    state.activeAccount = id
  },
  [types.REFRESH_USER_INFO] (state, { payload }) {
    state.all[payload.id].user = payload.data
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
