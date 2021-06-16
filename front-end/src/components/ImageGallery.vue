<template>
<div>
  <section class="image-gallery">
    <div class="image" v-for="photo in photos" v-bind:key="photo._id">
      <img class='photo' :src="photo.path" />
      <div class="photoInfo">
        <div class="photoTitle">
          <p class="photoTitle">{{photo.title}}</p>
        </div>
        <div class="photoDescription">
          <p class="photoDescription">Description: <br>{{photo.description}}</p>
        </div>
        <div class="photoCity">
          <p class="photoCity">Location: <br>{{photo.city}}</p>
        </div>
        <div class="photoBring">
          <p class="photoBring">What to bring? <br>{{photo.bring}}</p>
        </div>
        <div class="photoActivity">
          <p class="photoActivity">Category: <br>{{photo.activity}}</p>
        </div>
        <div class="photoName">
          <p class="photoName">Host: <br>{{photo.user.firstName}} {{photo.user.lastName}}</p>
        </div>
        <div class="photoDate">
          <p class="photoDate">Posted: {{formatDate(photo.created)}}</p>
        </div>
      </div>
    </div>
  </section>
</div>
</template>

<script>
import moment from 'moment';

export default {
  name: 'ImageGallery',
  props: {
    photos: Array
  },
  methods: {
    formatDate(date) {
      if (moment(date).diff(Date.now(), 'days') < 15)
        return moment(date).fromNow();
      else
        return moment(date).format('d MMMM YYYY');
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
.photo{
  display: flex;
  width:15%;
  align-content: flex-start;
}
.photoInfo{
  display: flex;
  width:100%;
  padding-left: 10px;
  flex-direction: row;
  flex-wrap: wrap;
  text-align: left;
}
.photoTitle{
  width:20%;
  background-color:darkcyan;
}
.photoDate{
  display: flex;
  width:20%;
  background-color:palevioletred;
}
.photoCity{
  display: flex;
  width:20%;
  background-color: rgb(160, 159, 189);
}
.photoBring{
  display: flex;
  width:20%;
  background-color:gray;
}
.photoActivity{
  display: flex;
  width:20%;
  background-color:maroon;
}
.photoName{
  display: flex;
  width:20%;
  background-color:olive;
}
.photoDescription{
  display: flex;
  width:80%;
  background-color: coral;
}
@media only screen and (max-width: 400px) {
.image{
  flex-direction: column;
}
.photoInfo{
  padding-left: 0px;
  padding-right: 20px;
}
.photo{
  width:50%;
}
  .photoTitle{
  width:auto;
}
.photoDate{
   width:auto;
}
.photoCity{
   width:auto;
}
.photoBring{
   width:auto;
}
.photoActivity{
   width:auto;
}
.photoName{
   width:auto;
}
.photoDescription{
   width:auto;
}
}


</style>

