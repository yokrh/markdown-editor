<template>
  <Dialog
    class="link-dialog"
    :title="title"
    :yes="yes"
    :no="no"
    @yes="update"
    @no="cancel"
  >
    <div slot="default">
      <!-- リンク表示文字列 -->
      <el-input
        v-model="linkName"
        placeholder="Exampleさんのサイト"
      />
      <!-- リンクURL -->
      <el-input
        v-model="linkUrl"
        placeholder="https://www.example.com/"
        style="margin-top:8px;"
      />
    </div>
  </Dialog>
</template>

<script>
import Dialog from '../../../../../../../../components/Dialog'

export default {
  components: {
    Dialog,
  },
  data() {
    return {
      // ダイアログ設定
      title: 'リンクの追加',
      yes: '追加',
      no: 'キャンセル',

      // リンク表示文字列
      linkName: '',
      // リンクURL
      linkUrl: '',
    }
  },
  methods: {
    /**
     * 閉じる。
     */
    cancel() {
      this.$emit('close')
    },

    /**
     * 更新。
     */
    update() {
      if (!this.validate()) {
        return
      }

      const additionalString = `<a href="${this.linkUrl}" target="_blank" rel="noopener">${this.linkName}</a>`
      this.$emit('close', additionalString)
    },

    /**
     * 更新前のバリデーション。
     */
    validate() {
      if (!this.linkUrl.startsWith('https://')) {
        this.$message.error('URLが不正またはhttpsではありません')
        return false
      }

      return true
    },
  },
}
</script>

<style>
</style>
