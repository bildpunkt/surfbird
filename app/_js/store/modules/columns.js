import * as types from '../mutation-types'

const state = []

const getters = {
  allColumns: state => state
}

const actions = {
  addColumn ({ commit, state}, column) {
    commit(types.ADD_COLUMN, { column })
  }
}

const mutations = {
  [types.ADD_COLUMN] (state, { column }) {
    state.push(column)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
