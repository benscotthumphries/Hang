<template>
<div class="main">
  <div v-if="user">
    <div class="menu">
      <p><a @click="toggleUpload" class="pure-button">Create a Hang</a></p>
      <p>{{user.firstName}} {{user.lastName}} <a @click="logout" class="pure-button">Logout</a></p>
      <uploader :show="show" @close="close" @uploadFinished="uploadFinished" />
    </div>
    <image-gallery :hangs="hangs" />
  </div>
  <div v-else>
    <p>Please Sign In</p>
  </div>
  <div class='edit'>
    <div class="heading">
        <h2>Edit a Hang</h2>
    </div>
    <div class="edit">
      <div class="form">
        <input v-model="findTitle" placeholder="Search">
        <div class="suggestions" v-if="suggestions.length > 0">
          <div class="suggestion" v-for="s in suggestions" :key="s.id" @click="selectHang(s)">{{s.title}}
          </div>
        </div>
      </div>
      <div class="upload" v-if="findHang">
        <div class="modal-mask">
          <div class="modal-container">
            <form class="pure-form">
              <fieldset>
                <p>Edit Title:</p>
                <input v-model="findHang.title" placeholder="Title">
              </fieldset>
              <fieldset>
                <p>Edit Description:</p>
                <textarea v-model="findHang.description" placeholder="Description:"></textarea>
              </fieldset>
              <fieldset>
                <p>Edit Category:</p>
                <input v-model="findHang.activity" placeholder="Genre: (Sports, Concert, Party)">
              </fieldset>
              <fieldset>
                <p>Edit City:</p>
                <input v-model="findHang.city" placeholder="City">
              </fieldset>
              <fieldset>
                <p>Edit What to Bring:</p>
                <input v-model="findHang.bring" placeholder="What to bring?">
              </fieldset>
              <fieldset class="buttons">
                <button @click="editHang(findHang)">Edit</button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>


<script>
import axios from 'axios';
import Uploader from '@/components/Uploader.vue';
import ImageGallery from '@/components/ImageGallery.vue';

export default {
  name: 'Hang',
  components: {
    Uploader,
    ImageGallery,
    
  },
  data() {
    return {
      show: false,
      hangs: [],
      error: '',
      //added
      findTitle: "",
      findHang: null,
    }
  },
  async created() {
    this.getHangs();
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
    },
    suggestions() {
      let hangs = this.hangs.filter(hang => hang.title.toLowerCase().startsWith(this.findTitle.toLowerCase()));
      return hangs.sort((a, b) => a.title > b.title);
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
    async getHangs() {
      try {
        this.response = await axios.get("/api/hangs");
        this.hangs = this.response.data;
      } catch (error) {
        this.error = error.response.data.message;
      }
    },
    async deleteHang(hang) {
      try {
        await axios.delete("/api/hangs/" + hang._id);
        this.findHang = null;
        this.getHangs();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async editHang(hang) {
      try {
        await axios.put("/api/hangs/" + hang._id, {
          title: this.findHang.title,
          description: this.findHang.description,
          city: this.findHang.city,
          bring: this.findHang.bring,
          activity: this.findHang.activity,
        });
        this.findHang = null;
        this.getHangs();
        location.reload();
        return true;
      } catch (error) {
        console.log(error);
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
      this.getHangs();
    },
    selectHang(hang) {
      this.findTitle = "";
      this.findHang = hang;
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
.edit{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column wrap;
}

.suggestions {
  width: 200px;
  border: 1px solid #ccc;
  align-items: center;
  float: none;
  display: block;
  margin-left: auto;
  margin-right: auto;
}
form{
  align-self: center;
}
.suggestion {
  min-height: 20px;
}

.suggestion:hover {
  background-color: #5BDEFF;
  color: #fff;
}


</style>