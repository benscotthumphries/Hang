<template>
<div class="dashboard">
  <Discover v-if="user" />
  <Login v-else />
</div>
</template>

<script>
import axios from 'axios';
import Login from '@/components/Login.vue';
import Discover from '../components/Discover.vue';
export default {
  name: 'dashboard',
  components: {
    Login,
    Discover,
  },
  async created() {
      try {
        let response = await axios.get('/api/users');
        this.$root.$data.user = response.data.user;
      } catch (error) {
        this.$root.$data.user = null;
      }
    },
  computed: {
    user() {
      return this.$root.$data.user;
    }
  }
}
</script>

<style scoped>

</style>