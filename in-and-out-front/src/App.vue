<script setup>
import Navbar from './components/Navbar.vue'
</script>

<template>
  <header>
    <Navbar/>
  </header>
  <body>
    <RouterView/>
  </body>
</template>
<style scoped>
body {
  padding: 3rem;
}
</style>
