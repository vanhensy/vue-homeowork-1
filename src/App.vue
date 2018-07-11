<template>
  <div id="app">
    <a href="/">
      <img src="./assets/film-bug-logo.png" class="logo">
    </a>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width: 960px;
  margin: 0 auto;
}
.logo {
  max-width: 240px;
  margin: 50px 0 80px 0;
}
</style>
