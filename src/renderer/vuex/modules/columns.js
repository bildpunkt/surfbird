import Column from '../../models/column'
import * as types from '../mutation-types'

import { sortInsertionPoint } from '../../util/sort'

const state = [
  []
]

const getters = {
  getColumn: (state, getters) => (columnId) => {
    return state[columnId]
  },
  getColumns: (state, getters) => (ids) => {
    let cols = []
    ids.forEach(id => { cols.push(state[id]) })
    return cols
  }
}

const actions = {
  addColumn ({ commit, state, rootState }, column) {
    commit(types.ADD_COLUMN, { column, rootState })
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
  [types.ADD_COLUMN] (state, { column, rootState }) {
    if (state[rootState.profiles.activeProfile] === undefined) {
      state[rootState.profiles.activeProfile] = []
    }

    let col = new Column(column.name, column.type, column.owner)
    state[col.id] = col
    rootState.profiles.all[rootState.profiles.activeProfile].columns.push(col.id)
  },
  [types.ADD_POST_TO_COLUMN] (state, { payload }) {
    const column = state[payload.index]

    if (!column.postStorage.ids.includes(payload.post.id_str)) {
      const position = sortInsertionPoint(column.postStorage.ids, payload.post.id_str)
      column.postStorage.ids.splice(position, 0, payload.post.id_str)
    }
    column.postStorage.posts[payload.post.id_str] = payload.post
  },
  [types.UPDATE_POST_IN_COLUMN] (state, { p }) {
    state[p.index].postStorage.posts[p.post.id_str] = p.post
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
