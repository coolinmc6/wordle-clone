<script>
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  props: {
    letter: {
      type: String,
      default: '',
    },
    status: {
      type: String,
      default: '',
    },
    errored: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: 'wordle',
    },
    // if this tile is part of an active guess
    activeGuess: {
      type: Boolean,
      default: false,
    },
    afterActive: {
      type: Boolean,
      default: false,
    },
  },
  setup() {},
});
</script>
<template>
  <div
    @click="$emit('click')"
    :class="[
      'tile', `${type}-tile`,
      {
        'tile--tbd': status === 'tbd',
        'tile--text': letter !== '',
        'tile--green': status === 'green',
        'tile--black': status === 'black',
        'tile--yellow': status === 'yellow',
        'errored': errored,
        'tile-active': activeGuess,
        'tile-after-active': afterActive,
      },
    ]"
  >
    {{ letter }}
  </div>
</template>
<style lang="scss" scoped>
@keyframes Pop {
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes Bounce {
  0%, 20% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-30px);
  }
  50% {
    transform: translateY(5px);
  }
  60% {
    transform: translateY(-15px);
  }
  80% {
    transform: translateY(2px);
  }
  100% {
    transform: translateY(0);
  }
}

@keyframes Shake {
  10%,
  90% {
    transform: translateX(-1px);
  }

  20%,
  80% {
    transform: translateX(2px);
  }

  30%,
  50%,
  70% {
    transform: translateX(-4px);
  }

  40%,
  60% {
    transform: translateX(4px);
  }
}
@keyframes PopIn {
  from {
    transform: scale(0.8);
    opacity: 0;
  }

  40% {
    transform: scale(1.1);
    opacity: 1;
  }
}
.tile[data-animation='flip-in'] {
  animation-name: FlipIn;
  animation-duration: 250ms;
  animation-timing-function: ease-in;
}
@keyframes FlipIn {
  0% {
    transform: rotateX(0);
  }
  100% {
    transform: rotateX(-90deg);
  }
}
@keyframes FlipOut {
  0% {
    transform: rotateX(-90deg);
  }
  100% {
    transform: rotateX(0);
  }
}
.tile {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  margin: 5px;
  font-size: 2rem;
  line-height: 2rem;
  font-weight: bold;
  vertical-align: middle;
  box-sizing: border-box;
  color: black;
  text-transform: uppercase;
  user-select: none;
}

.wordle-tile {
  width: 62px;
  height: 62px;

  &.tile--tbd {
    // background-color: blue;
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1);

    &.errored {
      animation: wobble 0.5s;
    }
  }
  &.tile--text {
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.3);
    // animation: Pop 0.3s;
  }
  &.tile--green {
    background-color: #538d4e;
    color: white;
    animation-name: FlipIn, FlipOut;
    animation-duration: 0.5s, 0.5s;
    animation-delay: 0s, 0.5s;
  }
  &.tile--black {
    background-color: #999;
    color: white;
  }
  &.tile--yellow {
    background-color: #c9b458;
    color: white;
  }
}

.quordle-tile {
  width: 48px;
  height: 26px;
  font-size: 21px;
  font-weight: normal;
  color: black;
  margin: 2px;
  transition: 0.5s ease-in;
  &.tile--tbd {
    // background-color: blue;
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1);

    &.errored {
      animation: wobble 0.5s;
    }
  }
  &.tile--text {
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.3);
    // animation: Pop 0.3s;
  }
  &.tile--green, &.tile--black, &.tile--yellow {
    border-radius: 4px;
    box-shadow: none;
  }
  &.tile--green {
    background-color: rgb(0, 204, 136);
    animation-name: FlipIn, FlipOut;
    animation-duration: 0.5s, 0.5s;
    animation-delay: 0s, 0.5s;
  }
  &.tile--black {
    background-color: rgb(229, 231, 235);
  }
  &.tile--yellow {
    background-color: rgb(255, 204, 0);
  }
  &.tile-active {
    font-size: 30px;
    height: 48px;
    background-color: rgb(209, 213, 219);
    border-radius: 4px;
    box-shadow: none;
    margin-bottom: 5px;
    transition: 0.2s ease-in;
  }
  &.tile-after-active {
    margin: 0;
    width: 52px;
    background-color: #f3f4f6;
    box-shadow: none;
    margin-bottom: 5px;
    &:first-child {
      border-top-left-radius: 4px;
      border-bottom-left-radius: 4px;
    }
    &:last-child {
      border-top-right-radius: 4px;
      border-bottom-right-radius: 4px;
    }
  }
}

.trainer-tile {
  width: 62px;
  height: 62px;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.3);

  &.tile--tbd {
    // background-color: blue;
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1);
  }
  &.tile--tbd {
    // background-color: blue;
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1);
  }
  &.tile--text {
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.3);
    // animation: Pop 0.3s;
  }
  &.tile--green {
    background-color: #538d4e;
    color: white;
  }
  &.tile--black {
    background-color: #999;
    color: white;
  }
  &.tile--yellow {
    background-color: #c9b458;
    color: white;
  }
}

@media screen and (max-width: 550px) {
  .tile {
    width: 50px;
    height: 50px;
    font-size: 1.5rem;
    line-height: 1.5rem;
  }
  .quordle-tile {
    height: 41px;
    width: 41px;

    &.tile-after-active {
      width: 44px;
      height: 24px;
    }
  }
}

@keyframes wobble {
  0% {
    -webkit-transform: none;
    transform: none;
  }

  15% {
    -webkit-transform: translate3d(-25%, 0, 0) rotate3d(0, 0, 1, -5deg);
    transform: translate3d(-25%, 0, 0) rotate3d(0, 0, 1, -5deg);
  }

  30% {
    -webkit-transform: translate3d(20%, 0, 0) rotate3d(0, 0, 1, 3deg);
    transform: translate3d(20%, 0, 0) rotate3d(0, 0, 1, 3deg);
  }

  45% {
    -webkit-transform: translate3d(-15%, 0, 0) rotate3d(0, 0, 1, -3deg);
    transform: translate3d(-15%, 0, 0) rotate3d(0, 0, 1, -3deg);
  }

  60% {
    -webkit-transform: translate3d(10%, 0, 0) rotate3d(0, 0, 1, 2deg);
    transform: translate3d(10%, 0, 0) rotate3d(0, 0, 1, 2deg);
  }

  75% {
    -webkit-transform: translate3d(-5%, 0, 0) rotate3d(0, 0, 1, -1deg);
    transform: translate3d(-5%, 0, 0) rotate3d(0, 0, 1, -1deg);
  }

  100% {
    -webkit-transform: none;
    transform: none;
  }
}

</style>
