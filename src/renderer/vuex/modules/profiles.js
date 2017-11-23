import Profile from '../../models/profile'
import * as types from '../mutation-types'

const state = {
  activeProfile: 0,
  all: []
}

const getters = {
  allProfiles: state => state.all
}

const actions = {
  addProfile ({ commit, state }, profile) {
    commit(types.ADD_PROFILE, { profile })
  },
  setActiveProfile ({ commit, state }, id) {
    commit(types.SET_ACTIVE_PROFILE, { id })
  }
}

const mutations = {
  [types.ADD_PROFILE] (state, { profile }) {
    state.all.push(new Profile(profile))
  },
  [types.SET_ACTIVE_PROFILE] (state, { id }) {
    state.activeProfile = id
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
