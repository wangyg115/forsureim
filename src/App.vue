<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'app'
};
</script>
<style scoped>
#app {
  display: flex;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>

