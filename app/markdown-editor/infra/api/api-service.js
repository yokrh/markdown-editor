import Session from '../Session'
import User from '../User'
import Note from '../Note'
import { API, HTTP_RESPONSE_STATUS_OK } from './API'

export default class ApiService {
  constructor(params) {
    this.axios = params.$axios || null
    this.message = params.$message || null
  }

  /**
   * Common get method.
   */
  get(url, params) {
    if (!this.axios) {
      throw new Error('No axios')
    }

    return this.axios.get(url, params)
      .then(res => res.data)
      .then((res) => {
        if (res.code !== HTTP_RESPONSE_STATUS_OK) {
          throw res.msg
        }
        return res.data
      })
      .catch((msg) => {
        if (this.message) {
          this.message.error(msg)
        }
        throw msg
      })
  }

  /**
   * Common post method.
   */
  post(url, body) {
    if (!this.axios) {
      throw new Error('No axios')
    }

    return this.axios.post(url, body)
      .then(res => res.data)
      .then((res) => {
        if (res.code !== HTTP_RESPONSE_STATUS_OK) {
          throw res.msg
        }
        return res.data
      })
      .catch((msg) => {
        if (this.message) {
          this.message.error(msg)
        }
        throw msg
      })
  }

  /**
   * Get note list.
   */
  fetchUserNotes(params) {
    const path = API.USER_NOTE_LIST

    const { uid } = params
    const reqParams = { uid }
    return this.get(path, reqParams)
      .then(notes => notes.map(n => new Note(n)))
      .catch((msg) => { throw msg })
  }

  /**
   * Login.
   */
  login(params) {
    return {
      session: new Session({ id: 'abcd12345678' }),
      user: new User({ id: 123, name: 'username1' }),
    }
    // const path = API.AUTH_LOGIN

    // const { loginInfo } = params
    // const reqBody = { loginInfo }
    // return this.post(path, reqBody).catch((msg) => { throw msg })
  }

  /**
   * Logout.
   */
  logout(params) {
    return {
      succeeded: true,
    }
    // const path = API.AUTH_LOGOUT

    // const { user, session } = params
    // const reqBody = { user, session }
    // return this.post(path, reqBody).catch((msg) => { throw msg })
  }
}
