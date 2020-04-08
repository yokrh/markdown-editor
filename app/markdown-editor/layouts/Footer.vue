<template>
  <!-- フッター -->
  <div id="footer">
    <!-- 言語設定 -->
    <!-- <div id="languages">
      <nuxt-link :to="switchLocalePath('ja')">日本語</nuxt-link>
      <nuxt-link :to="switchLocalePath('en')">English</nuxt-link>
      <nuxt-link :to="switchLocalePath('zh')">中文</nuxt-link>
    </div> -->
    <!-- コピーライト -->
    <div id="copyright">&copy; {{ year }} {{ creater }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 作者
      creater: 'yokrh',
    }
  },
  computed: {
    // 現在の年
    year() {
      return new Date().getFullYear()
    },
  },
}
</script>

<style scoped>
#footer {
  padding: 12px;
  display: flex;
}
#copyright {
  margin-left: auto;
  font-size: 16px;
  color: #888;
}
</style>
