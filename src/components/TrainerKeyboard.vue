<script>
import { reactive } from '@vue/composition-api';

export default {
  name: 'TrainerKeyboard',
  props: {
    letterObject: {
      type: Object,
      required: true,
    },
  },
  setup(props, { emit }) {
    const keyboard = [
      [...'qwertyuiop'.split('')],
      [...'asdfghjkl'.split('')],
      [...'zxcvbnm'.split('')],
    ];

    // Letter squares - not for keyboard
    const letters = reactive({});
    'abcdefghijklmnopqrstuvwxyz'.split('').map((l) => (letters[l] = 'tbd')); // eslint-disable-line

    const toggleClass = (color) => {
      if (color === 'tbd') return 'green';
      if (color === 'green') return 'black';
      if (color === 'black') return 'tbd';
      return 'tbd';
    };

    const handleKey = (key) => {
      if (letters[key]) {
        letters[key] = toggleClass(letters[key]);
      } else {
        letters[key] = 'green';
      }
      emit('click', key);
    };

    /**
     * This function returns a CSS class based the correct object from
     * letterObjects AND the key being given.
     */
    const getLetterClass = (key) => {
      const color = letters[key];
      return `${color}`;
    };

    return {
      getLetterClass,
      handleKey,
      keyboard,
      letters,
    };
  },
};
</script>
<template>
  <div class="wrapper">
    <div class="keyboard">
      <div class="row" v-for="(row, index) in keyboard" :key="index">
        <div
          v-for="key in row"
          :class="['key', {
            'green': getLetterClass(key) === 'green',
            'black': getLetterClass(key) === 'black',
          }]"
          @click="handleKey(key)"
          :key="`${key}-${letterObject[key]}`"
          @touchEnd="handleKey(key)"
        >
          <div class="letter">{{ key.toUpperCase() }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  text-align: center;
}
.keyboard {
  display: inline-block;
  background-color: #74b9ff;
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
      position: relative;
      .letter {
        padding-top: 8px;
        text-align: center;
        z-index: 1;
        position: absolute;
        background-color: transparent;
        height: 100%;
        width: 100%;
        top: 0;
        left: 0;
      }
      &.green {
          background-color: rgb(0, 204, 136);
          color: white;
        }
      &.black {
        background-color: rgb(144, 144, 144);
        color: white;
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
</style>
