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
      <div>ノート</div>
      <div v-for="note in notes" :key="note.id">
        <nuxt-link :to="`/user/${$route.params.uid}/note/${note.id}/edit`">
          <div>{{ note.title }}</div>
          <div>{{ note.description }}</div>
          <div>
            <img :src="note.thumbnail" alt="">
          </div>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Note from './note/Note'

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
        new Note({ id: 0, title: 'note0', description: 'note0 desu.' }),
        new Note({ id: 1, title: 'note1', description: 'note1 desuyo.' }),
        new Note({ id: 2, title: 'hogehogehoge', description: 'note2 desuyo hogehoge.' }),
      ]
      return mock
    },

    /**
     * ログアウト。
     */
    async logout() {
      await this.userLogout()
      this.$router.push('/')
    },
  },
}
</script>

<style scoped>
.user-page {
  display: flex;
}
.side-menu {
  width: 20%;
}
.logout {
  cursor: pointer;
}
.main-content {
  width: 80%;
}
@media screen and (max-width: 640px) {
  .user-page {
    flex-direction: column;
  }
  .side-menu {
    width: 100%;
  }
  .main-content {
    width: 100%;
  }
}
</style>
