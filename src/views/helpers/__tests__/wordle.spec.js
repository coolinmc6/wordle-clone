import Wordle from '../wordle';

describe('wordle.js', () => {
  let wordle;
  beforeEach(() => {
    wordle = new Wordle({
      answer: 'apple',
    });
  });
  describe('Wordle constructor', () => {
    it('should instantiate a new wordle object', () => {
      expect(wordle).toBeDefined();
    });
  });

  describe('newGame', () => {
    it('should clear everything in the grid', () => {
      wordle.addGuess('slice');
      wordle.letterHints();
      expect(wordle.hints[0].filter((hint) => hint === 'tbd')).toHaveLength(0);
      wordle.newGame();
      expect(wordle.hints[0].filter((hint) => hint === 'tbd')).toHaveLength(5);
    });
  });

  describe('addGuess', () => {
    it('should add a word to the wordle', () => {
      wordle.addGuess('apple');
      expect(wordle.grid[0][0]).toEqual('a');
    });
  });

  describe('addLetter', () => {
    it('should add a letter to the wordle', () => {
      wordle.addLetter('a');
      expect(wordle.grid[0][0]).toEqual('a');
    });

    it('should save letters as lowercase', () => {
      wordle.addLetter('A');
      expect(wordle.grid[0][0]).toEqual('a');
    });

    it('should not add non-alpha characters', () => {
      wordle.addLetter('1');
      expect(wordle.grid[0][0]).toEqual('');
    });

    it('should not add any characters after 5 letters', () => {
      wordle.addLetter('a');
      wordle.addLetter('p');
      wordle.addLetter('p');
      wordle.addLetter('l');
      wordle.addLetter('e');
      wordle.addLetter('a');
      expect(wordle.grid[0][4]).toEqual('e');
      expect(wordle.grid[0].length).toEqual(5);
    });

    it('should increment the activeLetter property by 1', () => {
      wordle.addLetter('a');
      expect(wordle.activeLetter).toEqual(1);
    });
  });

  describe('removeLetter', () => {
    it('should do nothing if there are no characters in the array', () => {
      wordle.removeLetter();
      expect(wordle.grid[0][0]).toEqual('');
    });

    it('should remove the last character and update the activeLetter correctly', () => {
      wordle.addLetter('a');
      wordle.addLetter('p');
      wordle.addLetter('p');
      wordle.addLetter('l');
      wordle.addLetter('e');
      wordle.removeLetter();
      expect(wordle.grid[0][4]).toEqual('');
      expect(wordle.activeLetter).toEqual(4);
    });

    it('should remove the third character and update activeLetter correctly', () => {
      wordle.addLetter('a');
      wordle.addLetter('p');
      wordle.addLetter('p');
      wordle.addLetter('l');
      wordle.addLetter('e');
      wordle.removeLetter();
      wordle.removeLetter();
      expect(wordle.grid[0][3]).toEqual('');
      expect(wordle.activeLetter).toEqual(3);
    });
  });

  describe('getLetterMap', () => {
    it('should return an object with the letter as the key and an array of indices as the value', () => {
      const letterMap = Wordle.getLetterMap('apple');
      expect(letterMap.a).toEqual([0]);
      expect(letterMap.p).toEqual([1, 2]);
      expect(letterMap.l).toEqual([3]);
      expect(letterMap.e).toEqual([4]);
    });
  });

  describe('getLetterClass', () => {
    it('should return the correct class for each letter', () => {
      wordle.addLetter('a');
      wordle.addLetter('p');
      wordle.addLetter('l');
      wordle.addLetter('z');
      wordle.addLetter('e');
      wordle.letterHints();
      expect(wordle.getLetterClass('a')).toEqual('green');
      expect(wordle.getLetterClass('p')).toEqual('green');
      expect(wordle.getLetterClass('l')).toEqual('yellow');
      expect(wordle.getLetterClass('z')).toEqual('black');
      expect(wordle.getLetterClass('e')).toEqual('green');
      expect(wordle.getLetterClass('j')).toEqual('tbd');
    });
  });

  describe('letterHints', () => {
    it('should return G-G-G-G-G if guess is correct', () => {
      wordle.addGuess('apple');
      expect(wordle.letterHints()).toEqual(new Array(5).fill('green'));
    });
    it('should return B-B-B-B-B if none of the letters are correct', () => {
      wordle.addGuess('bbbbb');
      expect(wordle.letterHints()).toEqual(new Array(5).fill('black'));
    });
    it('should return Y-G-B-B-B if guess is "ppzzz"', () => {
      wordle.addGuess('ppzzz');
      expect(wordle.letterHints()).toEqual(['yellow', 'green', 'black', 'black', 'black']);
    });
  });
});
