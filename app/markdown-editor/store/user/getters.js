const getters = {
  /**
   * ログインしているか否か。
   */
  isLoggedIn: (state, selfGetters) => () => { // eslint-disable-line
    return !!state.user
  },

  /**
   * ユーザー情報の中のユーザーID。
   */
  uid: (state) => {
    if (!state.user) {
      return null
    }
    return state.user.id
  },
}

export default getters
