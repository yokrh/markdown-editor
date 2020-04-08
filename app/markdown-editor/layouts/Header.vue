<template>
  <!-- フッター -->
  <div id="header">
    <div class="home">
      <nuxt-link to="/">
        ホーム
      </nuxt-link>
    </div>
    <div class="mypage">
      <nuxt-link to="/user/0/">
        マイページ
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
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
