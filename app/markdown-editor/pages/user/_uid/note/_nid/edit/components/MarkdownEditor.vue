<template>
  <div class="markdown-editor">
    <!-- エディタ -->
    <el-input
      type="textarea"
      :autosize="{ minRows: 8, maxRows: 16 }"
      placeholder="Please input"
      v-model="markdownInput"
      @keyup.native="updateCursorPosition"
      @click.native="updateCursorPosition"
    />

    <!-- ヘルパー -->
    <div class="helper">
      <div
        class="helper-button"
        @click="showHelperDialog(MARKDOWN.HELPER.LINK)"
      >
        <el-tooltip content="リンク"><i class="el-icon-link" /></el-tooltip>
      </div>
      <div
        class="helper-button"
        @click="showHelperDialog(MARKDOWN.HELPER.IMAGE_LARGE)"
      >
        <el-tooltip content="画像（大）"><i class="el-icon-picture-outline" /></el-tooltip>
      </div>
      <!--
      <div
        class="helper-button"
        @click="showHelperDialog(MARKDOWN.HELPER.IMAGE_MEDIUM)"
      >
        <el-tooltip content="画像（中）"><i class="el-icon-picture-outline" /></el-tooltip>
      </div>
      <div
        class="helper-button"
        @click="showHelperDialog(MARKDOWN.HELPER.IMAGE_SMALL)"
      >
        <el-tooltip content="画像（小）"><i class="el-icon-picture-outline" /></el-tooltip>
      </div>
       -->
      <!--
      <div
        class="helper-button"
        @click="showHelperDialog(MARKDOWN.HELPER.HEADER_1)"
      >
        <el-tooltip content="ヘッダ（大）"><i class="el-icon-document-remove" /></el-tooltip>
      </div>
      <div
        class="helper-button"
        @click="showHelperDialog(MARKDOWN.HELPER.HEADER_2)"
      >
        <el-tooltip content="ヘッダ（中）"><i class="el-icon-document-remove" /></el-tooltip>
      </div>
      <div
        class="helper-button"
        @click="showHelperDialog(MARKDOWN.HELPER.HEADER_3)"
      >
        <el-tooltip content="ヘッダ（小）"><i class="el-icon-document-remove" /></el-tooltip>
      </div>
      -->
      <div
        class="helper-button"
        @click="updateMarkdownWithHelper('\n---\n')"
      >
        <el-tooltip content="区切り線"><i class="el-icon-minus" /></el-tooltip>
      </div>
      <div
        class="helper-button"
        @click="updateMarkdownWithHelper(editorCursorSelection ? `~~${editorCursorSelection}~~` : '')"
      >
        <el-tooltip content="選択部分を打ち消し"><span style="text-decoration:line-through;">S</span></el-tooltip>
      </div>
      <div
        class="helper-button"
        @click="updateMarkdownWithHelper(editorCursorSelection ? `**${editorCursorSelection}**` : '')"
      >
        <el-tooltip content="選択部分を強調"><span style="font-weight:bold; font-size:19px;">B</span></el-tooltip>
      </div>
      <div
        class="helper-button"
        @click="updateMarkdownWithHelper(editorCursorSelection ? `*${editorCursorSelection}*` : '')"
      >
        <el-tooltip content="選択部分をイタリック"><span style="font-style:italic;">I</span></el-tooltip>
      </div>
      <!--
      <div
        class="helper-button"
        @click="updateMarkdownWithHelper(`> ${editorCursorSelection}`)"
      >
        <el-tooltip content="選択部分を引用"><i class="el-icon-arrow-right" /></el-tooltip>
      </div>
      <div
        class="helper-button"
        @click="updateMarkdownWithHelper(`* ${editorCursorSelection}`)"
      >
        <el-tooltip content="選択部分を箇条書き"><i class="el-icon-more" /></el-tooltip>
      </div>
      <div
        class="helper-button"
        @click="updateMarkdownWithHelper(`${editorCursorSelection.split('\n').map((s, i) => `${i+1}. s`).join('\n')}`)"
      >
        <el-tooltip content="選択部分を箇条書き（数字付き）"><span>123</span></el-tooltip>
      </div>
      -->
    </div>

    <!-- ヘルパーのダイアログ -->
    <LinkDialog
      v-if="displayedDialogName === MARKDOWN.HELPER.LINK"
      @close="updateMarkdownWithHelper"
    />
    <ImageDialog
      v-if="displayedDialogName === MARKDOWN.HELPER.IMAGE_LARGE ||
        displayedDialogName === MARKDOWN.HELPER.IMAGE_MEDIUM ||
        displayedDialogName === MARKDOWN.HELPER.IMAGE_SMALL"
      :type="displayedDialogName"
      @close="updateMarkdownWithHelper"
    />
  </div>
</template>

<script>
import MARKDOWN from './Markdown'
import LinkDialog from './components/LinkDialog.vue'
import ImageDialog from './components/ImageDialog.vue'

export default {
  components: {
    LinkDialog,
    ImageDialog,
  },
  props: {
    // for v-model
    value: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      MARKDOWN,

      // エディタ入力欄のカーソル位置と選択文字列
      editorCursorPositionStart: 0,
      editorCursorPositionEnd: 0,
      editorCursorSelection: '',

      // 表示するダイアログ名
      displayedDialogName: '',
    }
  },
  computed: {
    // エディタに入力されてるマークダウン文字列
    markdownInput: {
      get() {
        return this.value
      },
      set(newValue) {
        this.$emit('input', newValue) // for v-model
      },
    },
  },
  methods: {
    /**
     * カーソル位置を更新。
     * el-inputのonfocusを利用する場合はsetTimeoutが必要（dom更新が遅れるため。なぜかnextTickではダメ）
     */
    updateCursorPosition(event) {
      this.editorCursorPositionStart = event.target.selectionStart
      this.editorCursorPositionEnd = event.target.selectionEnd
      this.editorCursorSelection = event.target.value.substring(this.editorCursorPositionStart, this.editorCursorPositionEnd)
    },

    /**
     * ヘルパー効果を適用する。
     */
    updateMarkdownWithHelper(additionalString = '') {
      if (additionalString) {
        const front = this.markdownInput.substr(0, this.editorCursorPositionStart)
        const back = this.markdownInput.substr(this.editorCursorPositionEnd)
        this.markdownInput = `${front}${additionalString}${back}`
      }
      this.closeHelperDialog()
    },

    /**
     * ヘルパーダイアログを表示する。
     */
    showHelperDialog(key) {
      this.displayedDialogName = key
    },

    /**
     * ヘルパーダイアログを閉じる。
     */
    closeHelperDialog() {
      this.displayedDialogName = ''
    },
  },
}
</script>

<style scoped>
.helper {
  margin: 12px 0;
  display: flex;
  flex-wrap: wrap;
}
.helper-button {
  margin: 4px;
  width: 32px;
  font-size: 20px;
  cursor: pointer;
  display: flex;
  justify-content: center;
}
.helper-button:hover {
  color: darkcyan;
}
</style>
