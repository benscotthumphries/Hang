<template>
<div class="discover">
  <image-gallery :photos="photos" />
  <p v-if="error">{{error}}</p>
</div>
</template>

<script>
import axios from 'axios';
import ImageGallery from '@/components/ImageGallery.vue';
export default {
  name: 'Discover',
  components: {
    ImageGallery,
  },
  data() {
    return {
      photos: [],
      error: '',
      searchText: ''
    }
  },
  async created() {
    this.getPhotos();
    try {
        let response = await axios.get('/api/users');
        this.$root.$data.user = response.data.user;
      } catch (error) {
        this.$root.$data.user = null;
      }
  },
  methods: {
    async getPhotos() {
      try {
        let response = await axios.get("/api/photos/all");
        this.photos = response.data;
      } catch (error) {
        this.error = error.response.data.message;
      }
    },
  },
}
</script>