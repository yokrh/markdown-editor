<template>
  <div class="login">
    <el-button
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
      await this.userLogin()

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
.login {
  padding-top: 20px;
  display: flex;
  justify-content: center;
}
</style>
