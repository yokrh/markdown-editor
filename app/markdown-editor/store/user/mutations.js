const mutations = {
  /**
   * ユーザー情報をセット。
   */
  setUser(state, payload) {
    state.user = payload.user
  },
}

export default mutations
