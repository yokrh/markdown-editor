<template>
  <div class="edit-page" v-if="note">
    <NotePage>
      <!-- 概要 -->
      <div slot="overview">
        <div class="section-title overview-title">概要</div>
        <MarkdownOverview
          :title="note.title"
          :description="note.description"
          :tags="note.tags"
        />
      </div>

      <!-- 編集 -->
      <div slot="edit">
        <div class="section-title">編集</div>
        <MarkdownEditor v-model="note.markdown" />
      </div>

      <!-- 本文 -->
      <div slot="content">
        <div class="section-title">プレビュー</div>
        <MarkdownPreview :md="note.markdown" />
      </div>

      <!-- アクション -->
      <div slot="action">
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
      </div>
    </NotePage>

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
import ApiService from '../../../../../../infra/api/api-service'
import NotePage from '../index.vue'
import Dialog from '../../../../../../components/Dialog.vue'
import MarkdownOverview from './components/MarkdownOverview.vue'
import MarkdownEditor from './components/MarkdownEditor.vue'
import MarkdownPreview from './components/MarkdownPreview.vue'

export default {
  components: {
    NotePage,
    MarkdownOverview,
    MarkdownEditor,
    MarkdownPreview,
    Dialog,
  },
  data() {
    return {
      // API service
      apiService: null,

      // ノート
      note: null,

      // 保存キャンセルダイアログを表示するか否か
      cancelDialogVisible: false,
    }
  },
  computed: {
    ...mapGetters('user', ['uid', 'isLoggedIn']),
  },
  created() {
    if (!this.isLoggedIn()) {
      this.$router.push(`/user/${this.$route.params.uid}/note/${this.$route.params.nid}/`)
    }
  },
  mounted() {
    this.apiService = new ApiService(this)
    this.fetchNote()
      .then((res) => {
        this.note = res
      })
  },
  methods: {
    /**
     * ノートを取得。
     */
    async fetchNote() {
      const params = {
        uid: this.$route.params.uid,
        nid: this.$route.params.nid,
      }
      const res = await this.apiService.fetchUserNote(params)
      return res
    },

    /**
     * 概要を同期。
     */
    updateOverview(newProps) {
      this.note.title = newProps.title
      this.note.description = newProps.description
      this.note.tags = newProps.tags
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
      // TODO: save note

      this.$message.success({ message: '保存しました', duration: 1000 })
      this.$router.push(`/user/${this.uid}`)
    },
  },
}
</script>

<style scoped>
.edit-page {
  min-height: 100vh;
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
.overview-title {
  margin-top: 0;
}
.action-container {
  margin: 40px 0;
}
.action {
  margin: 12px 12px 0 0;
}
.edit-page .action >>> .el-button+.el-button {
  margin-left: 0 !important;
}
</style>
