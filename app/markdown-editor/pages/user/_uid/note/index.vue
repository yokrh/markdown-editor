<script>
import Vue from 'vue'

export default Vue.extend({
  fetch({ redirect, params }) {
    if (params && params.uid) {
      redirect(301, `/user/${params.uid}/`)
      return
    }
    redirect(301, '/')
  },
})
</script>
