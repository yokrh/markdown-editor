<template>
  <div class="user-page">
    <!-- サイドメニュー -->
    <div
      v-if="isLoggedIn()"
      class="side-menu"
    >
      <div
        class="logout"
        @click="logout"
      >
        ログアウト
      </div>
    </div>

    <!-- ノート一覧 -->
    <div
      class="main-content"
      :class="{ 'wide': !isLoggedIn() }"
    >
      <div class="section-title">ノート</div>
      <div class="note-container">
        <nuxt-link
          class="note"
          v-for="note in notes"
          :key="note.id"
          :to="getNoteLink(note)"
        >
          <div class="note-title">{{ note.title }}</div>
          <div class="note-description">{{ note.description }}</div>
          <div class="note-thumbnail">
            <img :src="note.thumbnail" alt="">
          </div>
          <div
            v-if="isLoggedIn()"
            class="note-edit"
          >
            <i class="el-icon-edit-outline" />
          </div>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import ApiService from '../../../infra/api/api-service'

export default {
  data() {
    return {
      // API service
      apiService: null,

      // ノート一覧
      notes: [],
    }
  },
  computed: {
    ...mapGetters('user', ['isLoggedIn']),
  },
  mounted() {
    this.apiService = new ApiService(this)
    this.fetchNotes()
      .then((res) => {
        this.notes = res
      })
  },
  methods: {
    ...mapActions('auth', [
      'userLogout',
    ]),

    /**
     * ノート一覧を取得。
     */
    async fetchNotes() {
      const params = {
        uid: this.$route.params.uid,
      }
      const res = await this.apiService.fetchUserNotes(params)
      return res
    },

    /**
     * ノートのリンクを取得。
     */
    getNoteLink(note) {
      if (this.isLoggedIn()) {
        // ログイン時
        return `/user/${this.$route.params.uid}/note/${note.id}/edit/`
      }

      return `/user/${this.$route.params.uid}/note/${note.id}/`
    },

    /**
     * ログアウト。
     */
    async logout() {
      const { $axios, $message } = this
      await this.userLogout({ $axios, $message })
      this.$router.push('/')
    },
  },
}
</script>

<style scoped>
a {
  text-decoration: none;
}
.user-page {
  min-height: 100vh;
  display: flex;
}
.side-menu {
  width: 20%;
  padding: 20px 0;
  background-color: lightslategray;
  border: 1px solid lightslategray;
}
.logout {
  cursor: pointer;
  text-align: center;
  width: 100%;
  height: 40px;
  line-height: 40px;
  background-color: #fff;
}
.main-content {
  width: 80%;
  padding: 20px;
}
.main-content.wide {
  width: 100%;
}
.section-title {
  font-size: 20px;
  font-weight: bold;
  color: #555;
}
.note-container {
  padding: 8px;
}
.note {
  position: relative;
  display: block;
  margin-top: 16px;
  min-height: 48px;
}
.note-title {
  margin-left: 64px;
  font-size: 20px;
}
.note-description {
  margin-left: 64px;
  margin-top: 8px;
  font-size: 16px;
}
.note-thumbnail {
  position: absolute;
  top: 0;
  left: 4px;
  width: 48px;
  height: 48px;
  background-color: lightblue;
}
.note-edit {
  position: absolute;
  top: calc(50% - 16px);
  right: 12px;
  line-height: 32px;
  font-size: 16px;
}
@media screen and (max-width: 640px) {
  .user-page {
    flex-direction: column;
    padding: 0 4%;
  }
  .side-menu {
    order: 2;
    width: 100%;
    padding: 0;
    display: flex;
    justify-content: center;
    margin-top: 12px;
  }
  .main-content {
    order: 1;
    width: 100%;
    padding: 20px 0;
  }
}
</style>
