<template>
  <!-- フッター -->
  <div id="header">
    <div class="home">
      <nuxt-link to="/">
        ホーム
      </nuxt-link>
    </div>
    <div class="mypage">
      <div v-if="uid">{{ uid }}</div>

      <nuxt-link
        v-if="uid"
        :to="`/user/${uid}`"
      >
        マイページ
      </nuxt-link>
      <nuxt-link
        v-else
        to="/auth/login"
      >
        マイページ
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters('user', ['uid']),
  },
}
</script>

<style scoped>
#header {
  padding: 0 20px;
  height: 54px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #aabbee;
}
.home {
  font-size: 16px;
}
.mypage {
  font-size: 16px;
}
a {
  text-decoration: none;
}
</style>
