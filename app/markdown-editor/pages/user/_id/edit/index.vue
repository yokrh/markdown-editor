<template>
  <div class="edit-page">
    <!-- 概要 -->
    <div class="section-title">概要</div>
    <div class="overview">
      <div class="overview-label">タイトル</div>
      <el-input
        class="overview-content"
        v-model="title"
        clearable
      />

      <div class="overview-label">概要</div>
      <el-input
        class="overview-content"
        type="textarea"
        v-model="description"
      />

      <div class="overview-label">タグ</div>
      <div class="overview-content">
        <div
          class="tag"
          v-for="tag in tags"
          :key="tag.id"
        >
          {{ tag.name }}
        </div>
        <el-input
          v-if="isShowNewTagInput"
          class="new-tag"
          v-model="tmpNewTagName"
          @blur="addTag(tmpNewTagName)"
          @keyup.native.enter="addTag(tmpNewTagName)"
        />
        <i
          v-else
          class="add-tag el-icon-circle-plus-outline"
          @click="isShowNewTagInput = true"
        />
      </div>
    </div>

    <!-- 編集 -->
    <div class="section-title">編集</div>
    <div class="input-container">
      <el-input
        type="textarea"
        :autosize="{ minRows: 8, maxRows: 16 }"
        placeholder="Please input"
        v-model="markdownInput"
      />
    </div>

    <!-- プレビュー -->
    <div class="section-title">プレビュー</div>
    <div class="preview-container">
      <MarkdownPreview :md="markdownInput" />
    </div>

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
      @confirm="cancelDialogVisible = false || cancel()"
      @cancel="cancelDialogVisible = false"
    />
  </div>
</template>

<script>
import Dialog from '../../../../components/Dialog.vue'
import MarkdownPreview from '../../../../components/MarkdownPreview.vue'
import mock from './mock/SampleMarkdown.md'
import Tag from './Tag'

export default {
  components: {
    Dialog,
    MarkdownPreview,
  },
  data() {
    return {
      title: '',
      description: '',
      tags: [],

      isShowNewTagInput: false,
      tmpNewTagName: '',

      markdownInput: '',

      cancelDialogVisible: false,
    }
  },
  mounted() {
    this.markdownInput = mock
  },
  methods: {
    /**
     * タグの追加。
     */
    addTag(name) {
      if (name) {
        const id = Date.now()
        const tag = new Tag(id, name)
        this.tags.push(tag)
      }

      this.isShowNewTagInput = false
      this.tmpNewTagName = ''
    },

    /**
     * 保存せず終了。
     */
    cancel() {
      console.log('canceled')
    },

    /**
     * 内容の保存。
     */
    save() {
      console.log('saved')
    },
  },
}
</script>

<style scoped>
.edit-page {
  padding: 0 2%;
  /* overflow: hidden; */
}
.overview {
  margin-left: calc(-50vw + 50%);
  padding: 12px;
  width: calc(100vw - 24px);
  background-color: #fefefe;
  box-shadow: 0 2px 2px #eee;
}
.overview-label {
  margin: 12px 0;
  font-size: 16px;
  color: #333;
}
.overview-content {
  padding-left: 2%;
  width: 98%;
}
.tag-container {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}
.tag {
  display: inline-block;
  margin: 0 4px 4px 0;
  padding: 0 8px;
  line-height: 32px;
  word-break: break-all;
  background-color: #f0ffff;
  border: 1px solid #eaeeee;
  border-radius: 2px;
}
.new-tag >>> .el-input__inner {
  height: 32px;
}
.add-tag {
  height: 32px;
  line-height: 32px;
  font-size: 16px;
  margin-left: 8px;
}
.section-title {
  margin: 24px 0;
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
.input-container {
  margin-left: 4%;
  width: 92%;
}
.preview-container {
  margin-left: 4%;
  width: 92%;
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
