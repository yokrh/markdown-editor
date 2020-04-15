<template>
  <Dialog
    :title="title"
    :yes="yes"
    :no="no"
    @yes="update"
    @no="cancel"
  >
    <div slot="default">
      <!-- 新規タグ入力欄 -->
      <el-input
        v-model="linkName"
        placeholder="Exampleさんのサイト"
      />
      <!-- 新規タグ入力欄 -->
      <el-input
        v-model="linkUrl"
        style="margin-top:8px;"
        placeholder="https://www.example.com/"
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
      title: 'リンク',
      yes: '追加',
      no: 'キャンセル',
      linkName: '',
      linkUrl: '',
    }
  },
  methods: {
    cancel() {
      this.$emit('close')
    },
    update() {
      if (!this.validate()) {
        return
      }

      const additionalString = `<a href="${this.linkUrl}" target="_blank" rel="noopener">${this.linkName}</a>`
      this.$emit('close', additionalString)
    },
    validate() {
      if (!this.linkUrl.startsWith('https://')) {
        this.$message('URLが不正またはhttpsではありません')
        return false
      }

      return true
    },
  },
}
</script>

<style>
</style>
