<template>
  <div class="edit-page">
    <!-- 概要 -->
    <div class="section-title">概要</div>
    <MarkdownOverview
      :title="title"
      :description="description"
      :tags="tags"
      @update="updateOverview"
    />

    <!-- 編集 -->
    <div class="section-title">編集</div>
    <MarkdownEditor v-model="markdownInput" />

    <!-- プレビュー -->
    <div class="section-title">プレビュー</div>
    <MarkdownPreview :md="markdownInput" />

    <!-- アクション -->
    <div class="action-container">
      <el-button
        class="action"
        plain
        @click="cancelDialogVisible = true"
      >
        保存しない
      </el-button>
      <el-button
        class="action"
        type="primary"
        @click="save"
      >
        保存する
      </el-button>
    </div>

    <!-- ダイアログ -->
    <Dialog
      v-if="cancelDialogVisible"
      title="確認"
      description="保存せず戻りますか？"
      yes="はい"
      no="いいえ"
      @yes="cancelDialogVisible = false || cancel()"
      @no="cancelDialogVisible = false"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Dialog from '../../../../../../components/Dialog.vue'
import MarkdownOverview from './components/MarkdownOverview.vue'
import MarkdownEditor from './components/MarkdownEditor.vue'
import MarkdownPreview from './components/MarkdownPreview.vue'
import mock from './mock/SampleMarkdown.md'

export default {
  components: {
    Dialog,
    MarkdownOverview,
    MarkdownEditor,
    MarkdownPreview,
  },
  data() {
    return {
      // タイトル
      title: '',
      // 説明
      description: '',
      // タグ
      tags: [],

      // 編集内容
      markdownInput: '',

      // 保存キャンセルダイアログを表示するか否か
      cancelDialogVisible: false,
    }
  },
  computed: {
    ...mapGetters('user', ['uid']),
  },
  mounted() {
    this.markdownInput = mock
  },
  methods: {
    /**
     * 概要脳同期更新。
     */
    updateOverview(newProps) {
      this.title = newProps.title
      this.description = newProps.description
      this.tags = newProps.tags
    },

    /**
     * 保存せず終了。
     */
    cancel() {
      this.$router.push(`/user/${this.uid}`)
    },

    /**
     * 保存。
     */
    save() {
      this.$message.success({ message: '保存しました', duration: 1000 })
      this.$router.push(`/user/${this.uid}`)
    },
  },
}
</script>

<style scoped>
.edit-page {
  min-height: 100vh;
  padding: 0 2%;
}
.section-title {
  margin: 48px 0 24px 0;
  margin-left: calc(-50vw + 50%);
  padding: 12px;
  width: calc(100vw - 24px);
  height: 24px;
  line-height: 24px;
  font-size: 20px;
  font-weight: bold;
  color: #fff;
  background-color: #333;
}
.section-title:first-child {
  margin-top: 0;
}
.action-container {
  margin: 40px 0 40px 2%;
}
.action {
  margin: 12px 12px 0 0;
}
.edit-page .action >>> .el-button+.el-button {
  margin-left: 0 !important;
}
</style>
