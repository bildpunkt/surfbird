import Profile from '../../models/profile'
import Column from '../../models/column'
import * as types from '../mutation-types'

import { sortInsertionPoint } from '../../util/sort'

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
  },
  addColumn ({ commit, state }, column) {
    commit(types.ADD_COLUMN, { column })
  },
  startStreaming ({ commit, state, rootState }, payload) {
    const client = rootState.accounts.all[payload.owner].client
    const functions = client.COLUMNS[payload.type].functions

    if (functions.initialData !== undefined) {
      client[functions.initialData]((post) => {
        payload.post = post
        commit(types.ADD_POST_TO_COLUMN, { payload })
      })
    }

    client[functions.data]((post) => {
      payload.post = post
      commit(types.ADD_POST_TO_COLUMN, { payload })
    })
  },
  sendAction ({ commit, state, rootState }, payload) {
    let activeAccount = rootState.accounts.activeAccount

    rootState.accounts.all[activeAccount].client[payload.action](payload.data, (post) => {
      let p = {
        index: payload.columnData.index,
        profile: state.activeProfile,
        owner: payload.columnData.owner,
        post: post
      }

      commit(types.UPDATE_POST_IN_COLUMN, { p })
    })
  }
}

const mutations = {
  [types.ADD_PROFILE] (state, { profile }) {
    state.all.push(new Profile(profile))
  },
  [types.SET_ACTIVE_PROFILE] (state, { id }) {
    state.activeProfile = id
  },
  [types.ADD_COLUMN] (state, { column }) {
    state.all[state.activeProfile].columns.push(new Column(column.name, column.type, column.owner))
  },
  [types.ADD_POST_TO_COLUMN] (state, { payload }) {
    const column = state.all[payload.profile].columns[payload.index]

    if (!column.postStorage.ids.includes(payload.post.id_str)) {
      const position = sortInsertionPoint(column.postStorage.ids, payload.post.id_str)
      column.postStorage.ids.splice(position, 0, payload.post.id_str)
    }
    column.postStorage.posts[payload.post.id_str] = payload.post
  },
  [types.UPDATE_POST_IN_COLUMN] (state, { p }) {
    state.all[p.profile].columns[p.index].postStorage.posts[p.post.id_str] = p.post
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
