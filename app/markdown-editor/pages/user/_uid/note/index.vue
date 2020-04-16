<script>
import Vue from 'vue'

export default Vue.extend({
  fetch({ redirect, from }) {
    redirect(301, `/user/${from.params.uid}/`)
  },
})
</script>
