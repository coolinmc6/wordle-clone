<script>
import {
  defineComponent, onMounted, reactive, ref,
} from '@vue/composition-api';
import Trainer from '@/views/helpers/trainer';
import WordleTile from '@/components/WordleTile.vue';
import TrainerKeyboard from '@/components/TrainerKeyboard.vue';

export default defineComponent({
  components: {
    TrainerKeyboard,
    WordleTile,
  },
  setup(_props, { refs }) {
    const trainer = reactive(new Trainer());
    const availableWords = ref([]);

    console.log(trainer);

    const handleKey = (event) => {
      const { keyCode } = event;
      switch (keyCode) {
        // Delete
        case 8:
          trainer.removeLetter();
          break;
        // Enter
        case 13:
          trainer.showWords();
          break;
        default:
          trainer.addLetter(String.fromCharCode(keyCode));
          break;
      }
    };

    const focusGameBoard = () => {
      refs.game.focus();
    };

    onMounted(() => {
      focusGameBoard();
    });

    const showWords = () => {
      const words = trainer.getMatchingWords();
      availableWords.value = words;
    };

    const handleClick = (index) => {
      trainer.changeStatus(index);
      showWords();
    };

    const handleKeyboard = (key) => {
      trainer.toggleClass(key);
      showWords();
    };

    return {
      availableWords,
      handleClick,
      handleKey,
      handleKeyboard,
      trainer,
    };
  },
});
</script>

<template>
  <div class="trainer-wrapper">
    <h1>Wordle Trainer</h1>
    <div class="home" @keydown="handleKey" tabindex="0" ref="game">
      <div class="row">
        <wordle-tile
          v-for="(letter, letterIndex) in trainer.letters"
          @click="handleClick(letterIndex)"
          :key="`${letter}-${letterIndex}`"
          :letter="letter"
          :status="trainer.statuses[letterIndex]"
          type="trainer"
        />
        <trainer-keyboard @click="handleKeyboard" :letterObject="trainer.letterObject"/>
      </div>
      <div class="words">
        <div class="heading">Words: {{ availableWords.length }}</div>
        <div class="word-list">
          <div class="word" v-for="word in availableWords" :key="word">
            {{ word }}
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
h1 {
  text-align: center;
}
.home {
  height: 90vh;
  &:focus {
    outline: none;
  }
}
.row {
  text-align: center;
}
.words {
  margin: 0px auto;
  margin-top: 30px;
  max-width: 900px;

  .heading {
    text-align: center;
    font-size: 25px;
    margin-bottom: 20px;
  }

  .word-list {
    text-align: center;
  }

  .word {
    display: inline-block;
    padding: 5px;
    font-size: 20px;
  }
}

</style>
