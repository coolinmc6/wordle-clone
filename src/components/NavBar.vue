<script>
export default {
  setup() {
    return {};
  },
};
</script>

<template>
  <div class="navbar-wrapper">
    <router-link to="/" class="wordle-link">Wordle</router-link>
    <router-link to="/quordle" class="quordle-link">Quordle</router-link>
    <router-link to="/trainer" class="trainer-link">Trainer</router-link>
  </div>
</template>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
.navbar-wrapper {
  padding: 5px;
  background-color: #74b9ff;
  text-align: center;
  a {
    text-decoration: none;
    color: black;
    display: inline-block;
    padding: 5px;
    &:hover {
      color: white;
    }
  }
}
.wordle-link {
  font-family: 'Open Sans', sans-serif;
}
</style>
