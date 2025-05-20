<template>
  <div id="app">
    <LoggingPage />
  </div>
</template>

<script>
import LoggingPage from './components/LoggingPage.vue';

export default {
  name: 'App',
  components: {
    LoggingPage
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
