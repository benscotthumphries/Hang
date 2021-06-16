<template>
  <div id="app">
    <div id="nav">
      <div class="pure-menu pure-menu-horizontal">
        <ul class="pure-menu-list">
          <li class="pure-menu-item">
            <router-link class="pure-menu-link" to="/">Discover</router-link>
          </li>
          <li class="pure-menu-item">
            <router-link class="pure-menu-link" to="/myhangs">My Hangs</router-link>
          </li>
          <li class="pure-menu-item">
            <router-link class="pure-menu-link" to="/about">Learn More</router-link> 
          </li>
        </ul>
      </div>
    </div>
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding-top: 10px;
  background-color: rgba(169, 173, 185, 0.356);
  padding-bottom: 10px;
  float: center;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: rgb(105, 152, 173);
}



</style>
