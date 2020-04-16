<script>
import Vue from 'vue'

export default Vue.extend({
  fetch({ store, redirect }) {
    if (store && store.state && store.state.user && store.state.user.uid) {
      redirect(301, `/user/${store.state.user.uid}`)
      return
    }

    console.log('unauthorized') // eslint-disable-line
    redirect(301, '/auth/login')
  },
})
</script>
