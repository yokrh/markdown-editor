<script>
import Vue from 'vue'

export default Vue.extend({
  fetch({ store, redirect }) {
    const uid = store.state.user.uid

    if (uid) {
      redirect(301, `/user/${uid}`)
      return
    }

    console.log('unauthorized') // eslint-disable-line
    redirect(301, '/auth/login')
  },
})
</script>
