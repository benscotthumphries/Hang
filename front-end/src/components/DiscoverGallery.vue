<template>
<div>
  <section class="image-gallery">
    <div class="image" v-for="hang in hangs" v-bind:key="hang._id">
      <img class='hang' :src="hang.path" />
      <div class="hangInfo">
        <div class="hangTitle">
          <p class="hangTitle">{{hang.title}}</p>
        </div>
        <div class="hangDescription">
          <p class="hangDescription">Description: <br>{{hang.description}}</p>
        </div>
        <div class="hangCity">
          <p class="hangCity">Location: <br>{{hang.city}}</p>
        </div>
        <div class="hangBring">
          <p class="hangBring">What to bring? <br>{{hang.bring}}</p>
        </div>
        <div class="hangActivity">
          <p class="hangActivity">Category: <br>{{hang.activity}}</p>
        </div>
        <div class="hangName">
          <p class="hangName">Host: <br>{{hang.user.firstName}} {{hang.user.lastName}}</p>
        </div>
        <div class="hangDate">
          <p class="hangDate">Posted: {{formatDate(hang.created)}}</p>
        </div>
      </div>
    </div>
  </section>
</div>
</template>

<script>
import moment from 'moment';
import axios from 'axios';

export default {
  name: 'ImageGallery',
  props: {
    hangs: Array,
  },
  async created() {
      try {
        let response = await axios.get('/api/users');
        this.$root.$data.user = response.data.user;
      } catch (error) {
        this.$root.$data.user = null;
      }
    },
  methods: {
    formatDate(date) {
      if (moment(date).diff(Date.now(), 'days') < 15)
        return moment(date).fromNow();
      else
        return moment(date).format('d MMMM YYYY');
    },
    async deleteHang(hang) {
      try {
        await axios.delete("/api/hangs/" + hang._id);
        this.getHangs();
        return true;
      } catch (error) {
        console.log(error);
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
  },
  computed: {
    user() {
      return this.$root.$data.user;
    }
  }
}
</script>

<style scoped>


.image{
  display: flex;
  padding: 10px;
  width:100%;
}

.hang{
  display: flex;
  width:15%;
  align-content: flex-start;
}
.hangInfo{
  display: flex;
  width:100%;
  padding-left: 10px;
  flex-direction: row;
  flex-wrap: wrap;
  text-align: left;
}
.hangTitle{
  width:20%;
  background-color:rgb(165, 177, 177);
}
.hangDate{
  display: flex;
  width:20%;
  background-color:rgb(165, 177, 177);
}
.hangCity{
  display: flex;
  width:20%;
  background-color: rgb(165, 177, 177);
}
.hangBring{
  display: flex;
  width:20%;
  background-color:rgb(165, 177, 177);
}
.hangActivity{
  display: flex;
  width:20%;
  background-color:rgb(165, 177, 177);
}
.hangName{
  display: flex;
  width:20%;
  background-color:rgb(165, 177, 177);
}
.hangDescription{
  display: flex;
  width:80%;
  background-color: rgb(165, 177, 177);
}
@media only screen and (max-width: 400px) {
.image{
  flex-direction: column;
}
.hangInfo{
  padding-left: 0px;
  padding-right: 20px;
}
.hang{
  width:50%;
}
  .hangTitle{
  width:auto;
}
.hangDate{
   width:auto;
}
.hangCity{
   width:auto;
}
.hangBring{
   width:auto;
}
.hangActivity{
   width:auto;
}
.hangName{
   width:auto;
}
.hangDescription{
   width:auto;
}
}



</style>

