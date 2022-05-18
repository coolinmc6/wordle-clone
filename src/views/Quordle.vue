<script>
/**
 * Next steps:
 * - create Quordle Keyboard and fit into screen
 * - Add NavBar
 */
import { reactive, ref } from '@vue/composition-api';
import Quordle from '@/views/helpers/quordle';
import QuordleGrid from '@/components/QuordleGrid.vue';
import QuordleKeyboard from '@/components/QuordleKeyboard.vue';
import { isWord } from '@/assets/five-word';

export default {
  name: 'Quordle',
  components: {
    QuordleGrid,
    QuordleKeyboard,
  },
  setup() {
    const quordle = reactive(new Quordle());

    console.log(quordle);

    // const letterObjects = reactive(quordle.words.map((wordle) => wordle.letters));
    const letterObjects = [
      reactive(quordle.words[0]),
      reactive(quordle.words[1]),
      reactive(quordle.words[2]),
      reactive(quordle.words[3]),
    ];

    const nonWord = ref(false);

    const handleKey = (event) => {
      const { keyCode } = event;
      console.log(keyCode);
      switch (keyCode) {
        // Delete
        case 8:
          quordle.removeLetter();
          break;
        // Enter
        case 13:
          const activeWord = quordle.getActiveWord(); // eslint-disable-line
          if (!activeWord || !isWord(activeWord)) {
            nonWord.value = true;
            setTimeout(() => {
              nonWord.value = false;
            }, 500);
            return;
          }
          quordle.letterHints();
          break;
        default:
          quordle.addLetter(String.fromCharCode(keyCode));
          break;
      }
    };

    const handleAddLetter = (key) => {
      console.log(key);
      quordle.addLetter(key);
    };

    return {
      quordle, handleAddLetter, handleKey, letterObjects,
    };
  },
};
</script>
<template>
  <div class="quordle" @keydown="handleKey" tabindex="0" ref="game">
    <quordle-grid v-for="(wordle, index) in quordle.words"
      :wordle="wordle" :key="index" :right="index % 2 === 1" />
    <quordle-keyboard
      @addLetter="handleAddLetter"
       class="keyboard-parent"
      :letter-objects="quordle.letterObjects"
      @letterHints="[quordle.letterHints()]"
      @removeLetter="quordle.removeLetter()"
    />
    <div class="button-bar">
      <button @click="quordle.newGame()">New Game</button>
    </div>

  </div>
</template>

<style lang="scss" scoped>
.quordle {
  height: 100vh;
  width: 100%;
  &:focus {
    outline: none;
  }
  display: grid;
  grid-template-areas:
    "a b"
    "c d"
    "e e"
    "f f";
}
.keyboard-parent {
  grid-area: e;
}
.button-bar {
  grid-area: f;
  text-align: center;
}
</style>
