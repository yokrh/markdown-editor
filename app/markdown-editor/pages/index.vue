<template>
  <div class="home-page">
    <div class="page-title">Markdownエディタ</div>
    <div class="page-description">ちょっとしたノート</div>
  </div>
</template>

<style scoped>
.home-page {
  min-height: 100vh;
  text-align: center;
}
.page-title {
  margin-top: 40px;
  font-size: 32px;
}
.page-description {
  margin-top: 32px;
  font-size: 20px;
}

@media screen and (max-width: 640px) {
  .page-title {
    font-size: 28px;
  }
  .page-description {
    font-size: 16px;
  }
}
</style>
