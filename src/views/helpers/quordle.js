import Wordle from './wordle';
import { getUniqueWords } from '../../assets/five-word';

export default class Quordle {
  constructor() {
    this.gameHistory = [];
    this.words = [];
    this.newGame();
    this.letterObjects = [];
  }

  /**
   * This function clears out the old game, adds it to history, and creates a new one
   */
  newGame() {
    if (this.words.length) {
      const oldGame = {
        words: [...this.words],
      };
      this.gameHistory.push(oldGame);
      this.words = [];
    }
    const words = getUniqueWords();
    words.map((word) => this.words.push(new Wordle({ answer: word, guesses: 9 })));
  }

  addLetter(letter) {
    this.words.map((wordle) => wordle.addLetter(letter));
  }

  removeLetter() {
    this.words.map((wordle) => wordle.removeLetter());
  }

  /**
   * a quick way to add letters to the quordle object
   * @param {*} word the word to be added
   */
  addGuess(word) {
    word.split('').map((letter) => this.addLetter(letter));
  }

  /**
   *
   * @returns {string} returns the word that is active or false
   */
  getActiveWord() {
    const wordle = this.words[0];
    const word = wordle.grid[wordle.activeGuess].join('');
    return word.length === wordle.length ? word : false;
  }

  letterHints() {
    this.words.map((wordle) => wordle.letterHints());
    this.letterObjects = this.words.map((wordle) => wordle.letters); // eslint-disable-line
    return this.words[0].hints[0];
  }
}
