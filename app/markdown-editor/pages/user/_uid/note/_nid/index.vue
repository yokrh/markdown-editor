<template>
  <div class="note-page" v-if="note">
    <!-- 概要 -->
    <slot name="overview">
      <!-- タイトル -->
      <h1 class="note-title">{{ note.title }}</h1>
      <!-- 説明 -->
      <p class="note-description">{{ note.description }}</p>
      <!-- タグリスト -->
      <ul class="note-tags">
        <!-- タグ -->
        <li
          class="tag"
          v-for="tag in note.tags"
          :key="tag.id"
        >
          {{ tag.name }}
        </li>
      </ul>
    </slot>

    <!-- 編集（編集画面から利用） -->
    <slot name="edit" />

    <!-- 本文 -->
    <slot name="content">
      <div class="content">
        <MarkdownPreview :md="note.markdown" />
      </div>
    </slot>

    <!-- アクション（編集画面から利用） -->
    <slot name="action" />
  </div>
</template>

<script>
import ApiService from '../../../../../infra/api/api-service'
import MarkdownPreview from './edit/components/MarkdownPreview.vue'

export default {
  components: {
    MarkdownPreview,
  },
  props: {
    propNote: {
      type: Object,
      default: null,
    },
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
  mounted() {
    if (this.propNote) {
      this.note = this.propNote
      return
    }

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
  },
}
</script>

<style scoped>
.note-page {
  min-height: 100vh;
  padding: 0 4%;
}
.note-title {
  margin-top: 24px;
  font-size: 36px;
  font-weight: bold;
  color: #333;
}
.note-description {
  margin-top: 12px;
  font-size: 20px;
  color: #555;
}
.note-tags {
  margin-top: 12px;
  padding-bottom: 20px;
  border-bottom: 1px solid #ccc;
}
.note-tags .tag {
  display: inline-block;
  margin: 0 8px 4px 0;
  padding: 0 8px;
  line-height: 28px;
  font-size: 14px;
  word-break: break-all;
  background-color: #f0ffff;
  border: 1px solid #eaeeee;
  border-radius: 2px;
}
.content {
  padding: 0 2%;
}
</style>
