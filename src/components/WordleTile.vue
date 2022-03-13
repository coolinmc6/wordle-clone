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
  },
  setup() {},
});
</script>
<template>
  <div
    :class="[
      'tile',
      {
        'tile--tbd': status === 'tbd',
        'tile--text': letter !== '',
        'tile--green': status === 'green',
        'tile--black': status === 'black',
        'tile--yellow': status === 'yellow',
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
  width: 62px;
  height: 62px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  line-height: 2rem;
  font-weight: bold;
  vertical-align: middle;
  box-sizing: border-box;
  color: black;
  text-transform: uppercase;
  user-select: none;
  margin: 5px;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;

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

@media screen and (max-width: 550px) {
  .tile {
    width: 50px;
    height: 50px;
    font-size: 1.5rem;
    line-height: 1.5rem;
  }
}

</style>
