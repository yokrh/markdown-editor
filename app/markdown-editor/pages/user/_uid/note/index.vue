<script>
import Vue from 'vue'
export default Vue.extend({
  fetch({ redirect }) {
    redirect(301, `/user/${this.$route.params.uid}/`)
  },
})
</script>
