<template>
<div class="discover">
  <discover-gallery :hangs="hangs" />
  <p v-if="error">{{error}}</p>
</div>
</template>

<script>
import axios from 'axios';
import DiscoverGallery from '@/components/DiscoverGallery.vue';
export default {
  name: 'Discover',
  components: {
    DiscoverGallery,
  },
  data() {
    return {
      hangs: [],
      error: '',
      searchText: ''
    }
  },
  async created() {
    this.gethangs();
    try {
        let response = await axios.get('/api/users');
        this.$root.$data.user = response.data.user;
      } catch (error) {
        this.$root.$data.user = null;
      }
  },
  methods: {
    async gethangs() {
      try {
        let response = await axios.get("/api/hangs/all");
        this.hangs = response.data;
      } catch (error) {
        this.error = error.response.data.message;
      }
    },
  },
}
</script>