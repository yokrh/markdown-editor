import Cookie from 'js-cookie'
import COOKIE from '../../infra/Cookie'
import ApiService from '../../infra/api/api-service'

const actions = {
  /**
   * ログイン。
   */
  async userLogin({ state, commit, dispatch, rootState, $axios, $message }, payload = {}) { // eslint-disable-line no-unused-vars
    const { loginInfo } = payload

    // ログイン
    const res = await new ApiService({ $axios, $message }).login({ loginInfo })
    const { user, session } = res

    if (user && session) {
      // ユーザー情報保持
      dispatch('user/setUser', { user }, { root: true })

      // セッション情報のクッキー保存
      Cookie.set(COOKIE.KEY.SESSION_ID, `${session.id}`, { expires: COOKIE.EXPIRES })
    }
  },

  /**
   * ログアウト。
   */
  async userLogout({ state, commit, dispatch, rootState, $axios, $message }, payload = {}) { // eslint-disable-line no-unused-vars
    const { user, session } = payload

    // ログアウト
    const res = await new ApiService({ $axios, $message }).logout({ user, session })
    const { succeeded } = res

    if (succeeded) {
      // ユーザー情報削除
      dispatch('user/setUser', { user: null }, { root: true })

      // セッション情報のクッキー削除
      Cookie.remove(COOKIE.KEY.SESSION_ID)
    }
  },
}

export default actions
