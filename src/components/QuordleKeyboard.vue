<script>
// import { onUpdated } from '@vue/composition-api';

export default {
  name: 'QuordleKeyboard',
  props: {
    letterObjects: {
      type: Array,
      required: true,
    },
  },
  setup(props, { emit }) {
    const keyboard = [
      [...'qwertyuiop'.split('')],
      [...'asdfghjkl'.split('')],
      ['enter', ...'zxcvbnm'.split(''), 'del'],
    ];

    const handleKeyboardPress = (key) => {
      switch (key) {
        // Delete
        case 'del':
          emit('removeLetter');
          break;
        // Enter
        case 'enter':
          emit('letterHints');
          break;
        default:
          emit('addLetter', key);
          break;
      }
    };

    /**
     * This function returns a CSS class based the correct object from
     * letterObjects AND the key being given.
     */
    const getLetterClass = (key, index) => {
      const letter = props.letterObjects?.[index];
      const str = letter?.[key] ? letter[key] : 'blank';
      return `box box-${index} ${str}`;
    };

    return {
      getLetterClass,
      handleKeyboardPress,
      keyboard,
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
          :class="['key',
          { wide: key === 'enter' || key === 'del' },
          ]"
          @click="handleKeyboardPress(key)"
          :key="key"
          @touchEnd="handleKeyboardPress(key)"
        >
          <div class="letter">{{ key.toUpperCase() }}</div>
          <div
            v-for="(_l, index) in letterObjects"
            :class="getLetterClass(key, index)"
            :key="index"></div>
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
      .box {
        height: 50%;
        width: 50%;
        font-size: 0;
        position: absolute;
        background-color: #fcfcfc;

        &.green {
          background-color: rgb(0, 204, 136);
          color: white;
        }
        &.black {
          background-color: rgb(229, 231, 235);
          color: white;
        }
        &.yellow {
          background-color: rgb(255, 204, 0);
        }
        &.blank {
          background-color: #fcfcfc;
        }
      }
      .box-0 {
        top: 0;
        left: 0;
        border-top-left-radius: 4px;
      }
      .box-1 {
        top: 0;
        right: 0;
        border-top-right-radius: 4px;
      }
      .box-2 {
        bottom: 0;
        left: 0;
        border-bottom-left-radius: 4px;
      }
      .box-3 {
        bottom: 0;
        right: 0;
        border-bottom-right-radius: 4px;
      }

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
</style>
