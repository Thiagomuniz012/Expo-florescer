<template>
  <div id="app">
    <router-view v-if="!isLoginPage"></router-view>
    <div v-if="!isLoginPage">
      <tab-bar></tab-bar>
    </div>
    <router-view v-if="isLoginPage"></router-view>
  </div>

</template>

<script>

//Página principal onde é renderizado o tab menu e as páginas

import TabBar from './components/TabBar.vue';

export default {
  components: {
    TabBar
  },
  computed: {
    isLoginPage() {
      return this.$route.path === '/';
    }
  }
};
</script>

<style>
  
</style>
