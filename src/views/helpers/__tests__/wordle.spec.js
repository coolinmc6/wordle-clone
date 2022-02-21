import Wordle from '../wordle';

describe('wordle.js', () => {
  let wordle;
  beforeEach(() => {
    wordle = new Wordle({
      answer: 'apple',
    });
  });
  it('should instantiate a new wordle object', () => {
    expect(wordle).toBeDefined();
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
