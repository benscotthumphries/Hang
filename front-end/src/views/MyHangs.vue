<template>
<div class="main">
  <div v-if="user">
    <div class="menu">
      <p><a @click="toggleUpload" class="pure-button">Create a Hang</a></p>
      <p>{{user.firstName}} {{user.lastName}} <a @click="logout" class="pure-button">Logout</a></p>
      <uploader :show="show" @close="close" @uploadFinished="uploadFinished" />
    </div>
    <image-gallery :photos="photos" />
  </div>
  <div v-else>
    <p>Please Sign In</p>
  </div>
</div>
</template>


<script>
import axios from 'axios';
import Uploader from '@/components/Uploader.vue';
import ImageGallery from '@/components/ImageGallery.vue';
export default {
  name: 'MyPhotos',
  components: {
    Uploader,
    ImageGallery
  },
  data() {
    return {
      show: false,
      photos: [],
      error: '',
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
  computed: {
    user() {
      return this.$root.$data.user;
    }
  },
  
  methods: {
    async logout() {
      try {
        await axios.delete("/api/users");
        this.$root.$data.user = null;
        this.$router.push('/') 
      } catch (error) {
        this.$root.$data.user = null;
      }
    },
    async getPhotos() {
      try {
        this.response = await axios.get("/api/photos");
        this.photos = this.response.data;
      } catch (error) {
        this.error = error.response.data.message;
      }
    },
    close() {
      this.show = false;
    },
    toggleUpload() {
      this.show = true;
    },
    async uploadFinished() {
      this.show = false;
      this.getPhotos();
    },
  }
}
</script>

<style scoped>
.menu {
  display: flex;
  justify-content: space-between;
}

.menu h2 {
  font-size: 14px;
}
</style>