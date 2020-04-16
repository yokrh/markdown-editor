<template>
  <Dialog
    class="image-dialog"
    :title="title"
    :yes="yes"
    :no="no"
    @yes="update"
    @no="cancel"
  >
    <div slot="default">
      <!-- 画像アップロード -->
      <el-upload
        class="upload"
        drag
        list-type="picture"
        action="https://jsonplaceholder.typicode.com/posts/"
        :file-list="fileList"
        :on-change="handleChange"
      >
        <i class="el-icon-upload" />
        <div>Drop file here or click to upload</div>
      </el-upload>
      <!--  -->

      <!-- 画像Url -->
      <el-input
        v-model="imageUrl"
        placeholder="画像URL（画像をアップロードすると、自動で入力されます）"
        disabled
        style="margin-top:8px;"
      />
      <!-- 画像alt -->
      <el-input
        v-model="imageAlt"
        placeholder="画像の簡易説明（例：相手の倒し方）"
        style="margin-top:8px;"
      />
      <!-- 画像横の説明文 -->
      <el-input
        v-model="description"
        placeholder="画像横の説明文（例：このようにすれば勝てます。コツは早めに入力することです。）"
        style="margin-top:8px;"
      />
    </div>
  </Dialog>
</template>

<script>
import MARKDOWN from '../Markdown'
import Dialog from '../../../../../../../../components/Dialog'

export default {
  components: {
    Dialog,
  },
  props: {
    type: {
      type: String,
      default: MARKDOWN.HELPER.IMAGE_LARGE,
    },
  },
  data() {
    return {
      // ダイアログ設定
      title: '画像の追加',
      yes: '追加',
      no: 'キャンセル',

      // 画像URL
      imageUrl: '',
      // 画像alt属性
      imageAlt: '',
      // 画像横の説明文
      description: '',
      // 画像リスト
      fileList: [],
      // 画像リストサイズ
      fileListMax: 1,
    }
  },
  methods: {
    /**
     * 画像アップロード成功時。
     */
    handleChange(file, fileList) {
      if (file.status === 'ready') {
        this.$message.info('アップロードを開始します')
        return
      }
      if (file.status === 'fail') {
        this.$message.error('アップロードに失敗しました')
        return
      }

      this.$message.success('アップロードに成功しました')
      this.fileList = fileList.slice(-1 * this.fileListMax)

      // TODO
      // upload to cloud storage
      this.imageUrl = file.url // tmp
      this.imageAlt = file.name.includes('.') ? file.name.split('.')[0] : file.name
    },

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

      const additionalString = `<div><img src="${this.imageUrl}" alt="${this.imageAlt}" loading="lazy"></div>`
      this.$emit('close', additionalString)
    },

    /**
     * 更新前のバリデーション。
     */
    validate() {
      if (!this.imageUrl) {
        this.$message.error('画像がありません')
        return false
      }
      if (this.type === MARKDOWN.HELPER.IMAGE_SMALL || this.type === MARKDOWN.HELPER.IMAGE_MEDIUM) {
        if (!this.description) {
          this.$message.error('説明文がありません')
          return false
        }
      }

      return true
    },
  },
}
</script>

<style scoped>
.upload {
  text-align: center;
  margin-bottom: 12px;
}
.image-dialog >>> .el-upload--picture {
  width: 100%;
}
.image-dialog >>> .el-upload-dragger {
  width: 100%;
}
</style>
