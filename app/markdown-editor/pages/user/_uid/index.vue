<template>
  <div class="user-page">
    <!-- サイドメニュー -->
    <div class="side-menu">
      <div
        v-if="isLoggedIn()"
        class="logout"
        @click="logout"
      >
        ログアウト
      </div>
    </div>

    <!-- ノート一覧 -->
    <div class="main-content">
      <div class="section-title">ノート</div>
      <div class="note-container">
        <nuxt-link
          class="note"
          v-for="note in notes"
          :key="note.id"
          :to="`/user/${$route.params.uid}/note/${note.id}/edit`"
        >
          <div class="note-thumbnail">
            <img :src="note.thumbnail" alt="">
          </div>
          <div class="note-title">{{ note.title }}</div>
          <div class="note-description">{{ note.description }}</div>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Note from '../../../infra/Note'

export default {
  data() {
    return {
      notes: [],
    }
  },
  computed: {
    ...mapGetters('user', ['isLoggedIn']),
  },
  mounted() {
    this.notes = this.fetchNotes()
  },
  methods: {
    ...mapActions('auth', [
      'userLogout',
    ]),

    /**
     * ノート一覧を取得。
     */
    fetchNotes() {
      const mock = [
        new Note({ id: '0', title: 'note0', description: 'note0 desu.' }),
        new Note({ id: '1', title: 'note1', description: 'note1 desuyo.' }),
        new Note({ id: '2', title: 'hogehogehoge', description: 'note2 desuyo hogehoge.' }),
      ]
      return mock
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
.section-title {
  margin-top: 16px;
  font-size: 20px;
  font-weight: bold;
}
.note-container {
  padding: 8px;
}
.note {
  position: relative;
  display: block;
  margin-top: 8px;
  min-height: 48px;
}
.note-thumbnail {
  position: absolute;
  top: calc(50% - 16px);
  left: 4px;
  width: 32px;
  height: 32px;
  background-color: lightblue;
}
.note-title {
  margin-left: 48px;
  font-size: 20px;
}
.note-description {
  margin-left: 48px;
  margin-top: 8px;
  font-size: 16px;
}
@media screen and (max-width: 640px) {
  .user-page {
    flex-direction: column;
    padding: 0 2%;
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
    padding: 0;
  }
}
</style>
