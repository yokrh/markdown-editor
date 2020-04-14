const actions = {
  /**
   * ユーザー情報をセット。
   */
  setUser({ state, commit, dispatch, rootState }, payload) { // eslint-disable-line no-unused-vars
    const { user } = payload
    commit('setUser', { user })
  },
}

export default actions
