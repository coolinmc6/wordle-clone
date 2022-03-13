<script>
import { defineComponent, reactive, onMounted } from '@vue/composition-api';
import Wordle from '@/views/helpers/wordle';
import WordleTile from '@/components/WordleTile.vue';
import { getRandomWord } from '@/assets/five-word';

export default defineComponent({
  name: 'Home',
  components: {
    WordleTile,
  },
  setup(_props, { refs }) {
    const wordle = reactive(
      new Wordle({ guesses: 6, length: 5, answer: getRandomWord() }),
    );
    console.log(wordle);
    const handleKey = (event) => {
      const { keyCode } = event;
      switch (keyCode) {
        // Delete
        case 8:
          wordle.removeLetter();
          break;
        // Enter
        case 13:
          wordle.letterHints();
          wordle.action += 1;
          break;
        default:
          wordle.addLetter(String.fromCharCode(keyCode));
          break;
      }
    };

    console.log(wordle.answer);

    const focusGameBoard = () => {
      refs.game.focus();
    };

    onMounted(() => {
      focusGameBoard();
    });

    const keyboard = [
      [...'qwertyuiop'.split('')],
      [...'asdfghjkl'.split('')],
      [...'zxcvbnm'.split('')],
    ];

    keyboard[2].unshift('enter');
    keyboard[2].push('del');

    const newGame = () => {
      wordle.newGame();
      focusGameBoard();
    };

    const handleKeyboardPress = (key) => {
      switch (key) {
        // Delete
        case 'del':
          wordle.removeLetter();
          break;
        // Enter
        case 'enter':
          wordle.letterHints();
          wordle.action += 1;
          break;
        default:
          wordle.addLetter(key);
          break;
      }
    };

    return {
      handleKey,
      wordle,
      keyboard,
      newGame,
      handleKeyboardPress,
    };
  },
});
</script>

<template>
  <div class="home" @keydown="handleKey" tabindex="0" ref="game">
    <div class="game-board">
      <div class="row" v-for="(row, rowIndex) in wordle.grid" :key="rowIndex">
        <wordle-tile
          v-for="(letter, letterIndex) in row"
          :key="`${letter}-${wordle.hints[rowIndex][letterIndex]}-${letterIndex}`"
          :letter="letter"
          :status="wordle.hints[rowIndex][letterIndex]"
        />
      </div>
    </div>
    <div class="keyboard">
      <div class="row" v-for="(row, index) in keyboard" :key="index">
        <div
          :class="[
            {
              green: wordle.getLetterClass(key) === 'green',
              black: wordle.getLetterClass(key) === 'black',
              yellow: wordle.getLetterClass(key) === 'yellow',
              wide: key === 'enter' || key === 'del',
            },
            'key',
          ]"
          v-for="key in row"
          :key="key"
          @click="handleKeyboardPress(key)"
          @touchEnd="handleKeyboardPress(key)"
        >
          {{ key.toUpperCase() }}
        </div>
      </div>
    </div>

    <div class="button-bar">
      <button class="button" @click="newGame">New Game</button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.home {
  height: 100vh;
  width: 100%;
  &:focus {
    outline: none;
  }
}

.game-board {
  .row {
    text-align: center;
  }
}

.keyboard {
  .row {
    display: flex;
    justify-content: center;

    .key {
      padding: 20px 9px;
      font-size: 16px;
      font-weight: bold;
      border-radius: 4px;
      box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1);
      margin: 4px;
      background-color: #e7e7e7;
      width: 25px;
      text-align: center;
      font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;

      &.green {
        background-color: #538d4e;
        color: white;
      }
      &.black {
        background-color: #777;
        color: white;
      }
      &.yellow {
        background-color: #c9b458;
      }
      &.wide {
        width: 50px;
      }
    }
  }
}

@media screen and (max-width: 600px) {
  .keyboard {
    padding: 0px 1px;

    .row {
      .key {
        width: 30px;
        font-size: 14px;
        margin: 3px;

        &.wide {
          width: 45px;
        }
      }
    }
  }
}

.button-bar {
  text-align: center;

  button.button {
    padding: 10px;
    font-size: 16px;
    font-weight: bold;
    border-radius: 4px;
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1);
    margin: 4px;
    background-color: #e7e7e7;
    width: 180px;
    text-align: center;
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }
}
</style>
