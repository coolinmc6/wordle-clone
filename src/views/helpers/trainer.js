import { getLetterMatches, getRegexMatches } from '@/assets/five-word';

/**
 * Creates new Trainer object
 */
export default class Trainer {
  constructor() {
    this.letters = new Array(5).fill('');
    this.statuses = new Array(5).fill('tbd');
    this.activeLetter = 0;
    this.letterObject = 'abcdefghijklmnopqrstuvwxyz'.split('').reduce((acc, letter) => {
      acc[letter] = 'tbd';
      return acc;
    }, {});
  }

  addLetter(_letter) {
    // if not a letter, return
    const letter = _letter.toLowerCase();
    if (!/^[a-z]+$/.test(letter)) return;

    // if no more empty spaces, return
    const emptySpaces = this.letters.filter((l) => l === '');
    if (emptySpaces.length === 0) return;

    // add letter to the array
    this.letters.splice(this.activeLetter, 1, letter);

    // increment letter
    this.activeLetter += 1;
  }

  /**
   * This function removes the last letter from a particular row
   */
  removeLetter() {
    // Three cases:
    // #1: findIndex === 0 => do nothing
    // #2: findIndex === -1 => replace last element
    // #3: findIndex > 0 => replace element at findIndex - 1
    const findIndex = this.letters.findIndex((l) => l === '');

    // case #1
    if (findIndex === 0) return;
    if (findIndex === -1) {
      // case #2
      this.letters.splice(this.activeLetter - 1, 1, '');
    } else {
      // case #3
      this.letters.splice(findIndex - 1, 1, '');
    }
    this.activeLetter -= 1;
  }

  showWords() {
    console.log('showWords');
    const words = this.letters.join('');
    console.log(words);
  }

  changeStatus(index) {
    const current = this.statuses[index];
    if (current === 'tbd') {
      this.statuses.splice(index, 1, 'green');
    } else if (current === 'green') {
      this.statuses.splice(index, 1, 'yellow');
    } else if (current === 'yellow') {
      this.statuses.splice(index, 1, 'black');
    } else if (current === 'black') {
      this.statuses.splice(index, 1, 'tbd');
    }
    console.log(index);
  }

  /**
   * This function returns all words that match the user's desired hints. It first
   * filters out the black words, and then the greens, and then the yellows.
   */
  getMatchingWords() {
    // Not accurate. Must figure out greens - I can't remove all words that have a
    // "p", for example, if there is already a green "p".
    const blackLetters = this.statuses.reduce((acc, curr, index) => {
      if (curr === 'black') {
        acc.push(this.letters[index]);
      }
      return acc;
    }, []);
    const regexBlack = `[^${blackLetters.join('')}]{5}`;
    const blackWords = getRegexMatches(regexBlack);
    // console.log(blackWords);

    const greenRegex = this.statuses.reduce((acc, curr, index) => {
      if (curr === 'green') {
        acc.push(this.letters[index]);
      } else {
        acc.push('.');
      }
      return acc;
    }, []).join('');

    const greenBlack = getRegexMatches(greenRegex, blackWords);
    const blackKeyboard = [];
    const greenKeyboard = Object.keys(this.letterObject).reduce((acc, letter) => {
      if (this.letterObject[letter] === 'green') {
        acc.push(letter); // eslint-disable-line
      }
      if (this.letterObject[letter] === 'black') {
        blackKeyboard.push(letter);
      }
      return acc;
    }, []);
    // console.log(greenKeyboard);
    const blackKeyboardRegex = `[^${blackKeyboard.join('')}]{5}`;

    const step3 = getLetterMatches(greenKeyboard, greenBlack);
    const step4 = getRegexMatches(blackKeyboardRegex, step3);
    console.log({ step4, step3 });
    const yellows = [];
    const yellowLetters = this.statuses.reduce((acc, curr, index) => {
      if (curr === 'yellow') {
        yellows.push(this.letters[index]);
        acc.push(`[^${this.letters[index]}]{1}`);
      } else {
        acc.push('.');
      }
      return acc;
    }, []);

    const remainingWords = getRegexMatches(yellowLetters.join(''), step4);
    // console.log(remainingWords);
    // const afterYellows = yellows.reduce((acc, letter, index) => {
    //   if (index === 0) {
    //     acc.concat(remainingWords.filter((word) => word.includes(letter)));
    //     return acc;
    //   }
    //   return acc.filter((word) => word.includes(letter));
    // }, []);

    // console.log(afterYellows);

    return remainingWords;
  }

  /**
   * Toggle letter class for keyboard.
   * tbd -> green -> black -> tbd
   */
  toggleClass(key) {
    const color = this.letterObject[key];
    if (color === 'tbd') {
      this.letterObject[key] = 'green';
    } else if (color === 'green') {
      this.letterObject[key] = 'black';
    } else if (color === 'black') {
      this.letterObject[key] = 'tbd';
    }
  }
}
