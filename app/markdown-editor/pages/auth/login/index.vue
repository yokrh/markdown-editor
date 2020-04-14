<template>
  <div class="login-page">
    <el-button
      class="login"
      type="primary"
      @click="login"
    >
      Login
    </el-button>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters('user', ['isLoggedIn', 'uid']),
  },
  mounted() {
    if (this.isLoggedIn()) {
      this.login()
    }
  },
  methods: {
    ...mapActions('auth', [
      'userLogin',
    ]),
    async login() {
      const loginInfo = null
      const { $axios, $message } = this
      await this.userLogin({ loginInfo, $axios, $message })

      if (this.uid) {
        this.$router.push(`/user/${this.uid}`)
        return
      }
      this.$router.push('/')
    },
  },
}
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  padding-top: 20px;
  display: flex;
  justify-content: center;
}
.login {
  height: 40px;
}
</style>
