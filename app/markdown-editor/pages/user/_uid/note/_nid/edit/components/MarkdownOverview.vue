<template>
  <div class="markdown-overview">
    <div class="overview">
      <!-- タイトル -->
      <div class="overview-label">タイトル</div>
      <el-input
        class="overview-content"
        v-model="overviewTitle"
        clearable
      />

      <!-- 説明 -->
      <div class="overview-label">説明</div>
      <el-input
        class="overview-content"
        type="textarea"
        v-model="overviewDescription"
      />

      <!-- タグリスト -->
      <div class="overview-label">タグ</div>
      <div class="overview-content">
        <!-- タグ -->
        <div
          class="tag"
          v-for="tag in overviewTags"
          :key="tag.id"
        >
          {{ tag.name }}
        </div>
        <!-- 新規タグ入力欄 -->
        <el-input
          v-if="isShowNewTagInput"
          class="new-tag"
          v-model="tmpNewTagName"
          @blur="addTag(tmpNewTagName)"
          @keyup.native.enter="addTag(tmpNewTagName)"
        />
        <!-- 新規タグ追加ボタン -->
        <i
          v-else
          class="add-tag el-icon-circle-plus-outline"
          @click="isShowNewTagInput = true"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Tag from './Tag'

export default {
  props: {
    // タイトル
    title: {
      type: String,
      default: '',
    },
    // 説明
    description: {
      type: String,
      default: '',
    },
    // タグ
    tags: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      // タグ追加を表示するか否か
      isShowNewTagInput: false,
      // 新タグ名
      tmpNewTagName: '',
    }
  },
  computed: {
    // タイトル
    overviewTitle: {
      get() {
        return this.title
      },
      set(newValue) {
        this.update({
          title: newValue,
          description: this.overviewDescription,
          tags: this.tags,
        })
      },
    },
    // 説明
    overviewDescription: {
      get() {
        return this.description
      },
      set(newValue) {
        this.update({
          title: this.overviewTitle,
          description: newValue,
          tags: this.tags,
        })
      },
    },
    // タグ
    overviewTags: {
      get() {
        return this.tags
      },
      set(newValue) {
        this.update({
          title: this.overviewTitle,
          description: this.overviewDescription,
          tags: newValue,
        })
      },
    },
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
     * 概要情報の更新
     */
    update(newProps) {
      this.$emit('update', newProps)
    },
  },
}
</script>

<style scoped>
.overview {
  margin-left: calc(-50vw + 50%);
  padding: 0 12px;
  width: calc(100vw - 24px);
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
</style>
