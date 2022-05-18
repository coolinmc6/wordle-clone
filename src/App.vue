<script>
import NavBar from '@/components/NavBar.vue';
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  components: {
    NavBar,
  },
  setup() {},
});
</script>

<template>
  <div id="app">
    <NavBar />
    <router-view/>
  </div>
</template>

<style lang="scss">
body {
  margin: 0;
  padding: 0;
  height: 100vh;
  width: 100%;
  &:focus {
    outline: none;
  }
}
</style>
