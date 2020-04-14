import Cookie from 'js-cookie'
import COOKIE from '../infra/Cookie'

export const actions = {
  /**
   * Check authentication before the first page appearance.
   *
   * It causes the following warning if logged in.
   * [Vue warn]: The client-side rendered virtual DOM tree is not matching server-rendered content.
   */
  nuxtClientInit({ state, commit, dispatch, rootState }, payload = {}) { // eslint-disable-line no-unused-vars
    const sid = Cookie.get(COOKIE.KEY.SESSION_ID)
    if (sid) {
      const loginInfo = { sid }
      const { $axios } = payload
      dispatch('auth/userLogin', { loginInfo, $axios })
    }
  },
}
