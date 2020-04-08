<template>
  <!-- 共通ダイアログ -->
  <el-dialog
    :visible.sync="dialogVisible"
    :show-close="false"
    width="80%"
    :title="title"
    :before-close="onCancel"
  >
    <div>{{ description }}</div>
    <span slot="footer">
      <el-button type="text" size="small" @click="onCancel">{{ no }}</el-button>
      <el-button size="small" type="primary" @click="onConfirm">{{ yes }}</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  props: {
    // タイトル
    title: {
      type: String,
      default: '',
    },

    // 説明文
    description: {
      type: String,
      default: '',
    },

    // はいボタン
    yes: {
      type: String,
      default: '',
    },

    // いいえボタン
    no: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      // 表示フラグ
      dialogVisible: true,
    }
  },
  methods: {
    /**
     * はい。
     */
    onConfirm() {
      this.$emit('confirm')
    },

    /**
     * いいえ。
     */
    onCancel() {
      this.$emit('cancel')
    },
  },
}
</script>

<style scoped>
.el-button {
  margin-left: 20px !important;
}
</style>
