<script>
import WordleTile from '@/components/WordleTile.vue';
import { ref } from '@vue/composition-api';

export default {
  components: {
    WordleTile,
  },
  props: {
    wordle: {
      type: Object,
      required: true,
    },
    right: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const nonWord = ref(false);
    return {
      nonWord,
    };
  },
};
</script>
<template>
  <div :class="{ right: right, parent: true }">
    <div class="game-board">
      <div class="row" v-for="(row, rowIndex) in wordle.grid" :key="rowIndex">
        <wordle-tile
          v-for="(letter, letterIndex) in row"
          :key="`${letter}-${wordle.hints[rowIndex][letterIndex]}-${letterIndex}`"
          :letter="letter"
          :status="wordle.hints[rowIndex][letterIndex]"
          :errored="wordle.activeGuess === rowIndex ? nonWord : false"
          :activeGuess="wordle.activeGuess === rowIndex"
          :afterActive="wordle.activeGuess < rowIndex"
          type="quordle"
        />
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.parent {
  text-align: right;
  .game-board {
    padding-right: 10px;
  }
  &.right {
    text-align: left;
    .game-board {
      padding-left: 10px;
      padding-right: 0px;
    }
  }
}
.game-board {
  // margin: 0 auto;
  max-width: 350px;
  display: inline-block;
}
</style>
