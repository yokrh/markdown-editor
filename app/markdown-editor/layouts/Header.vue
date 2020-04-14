<template>
  <!-- フッター -->
  <div id="header">
    <div class="home">
      <nuxt-link to="/">
        ホーム
      </nuxt-link>
    </div>
    <div class="mypage">
      <template v-if="isLoggedIn && uid">
        <div class="user">{{ uid }}</div>
        <nuxt-link :to="`/user/${uid}`">マイページ</nuxt-link>
      </template>
      <template v-else>
        <nuxt-link to="/auth/login">ログイン</nuxt-link>
      </template>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters('user', ['isLoggedIn', 'uid']),
  },
}
</script>

<style scoped>
a {
  text-decoration: none;
}
#header {
  padding: 0 20px;
  height: 54px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: aliceblue;
  box-shadow: 0px 1px 4px #aabbee;
}
.home {
  font-size: 16px;
}
.mypage {
  font-size: 16px;
}
.user {
  display: inline-block;
}
</style>
