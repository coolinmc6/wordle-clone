import Quordle from '../quordle';

describe('quordle.js', () => {
  let quordle;
  beforeEach(() => {
    quordle = new Quordle();
  });

  describe('Quordle constructor', () => {
    it('should instantiate a new quordle object', () => {
      expect(quordle).toBeDefined();
    });
  });

  describe('newGame', () => {
    it('should clear out the old history', () => {
      quordle.words = ['apple', 'banana', 'carrot'];
      quordle.newGame();
      expect(quordle.gameHistory).toHaveLength(1);
    });

    it('words array should contain 4 Worldle objects', () => {
      quordle.newGame();
      expect(quordle.words).toHaveLength(4);
    });
  });

  describe('addLetter', () => {
    it('should have the same letter in each Wordle object', () => {
      quordle.addLetter('a');
      quordle.addLetter('p');
      expect(quordle.words[0].grid[0][0]).toEqual('a');
      expect(quordle.words[0].grid[0][1]).toEqual('p');
      expect(quordle.words[1].grid[0][0]).toEqual('a');
      expect(quordle.words[1].grid[0][1]).toEqual('p');
      expect(quordle.words[2].grid[0][0]).toEqual('a');
      expect(quordle.words[2].grid[0][1]).toEqual('p');
      expect(quordle.words[3].grid[0][0]).toEqual('a');
      expect(quordle.words[3].grid[0][1]).toEqual('p');
    });
  });

  describe('addGuess', () => {
    it('should add a word to the quordle', () => {
      quordle.addGuess('apple');
      expect(quordle.words[0].grid[0][0]).toEqual('a');
      expect(quordle.words[0].grid[0][1]).toEqual('p');
      expect(quordle.words[0].grid[0][2]).toEqual('p');
      expect(quordle.words[0].grid[0][3]).toEqual('l');
      expect(quordle.words[0].grid[0][4]).toEqual('e');
    });
  });

  describe('getActiveWord', () => {
    it('should return the active word', () => {
      quordle.addGuess('apple');
      expect(quordle.getActiveWord()).toEqual('apple');
    });

    it('each Wordle should return the same active word', () => {
      quordle.addGuess('apple');
      expect(quordle.words[0].getActiveWord()).toEqual('apple');
      expect(quordle.words[1].getActiveWord()).toEqual('apple');
      expect(quordle.words[2].getActiveWord()).toEqual('apple');
      expect(quordle.words[3].getActiveWord()).toEqual('apple');
    });
  });

  describe('letterHints', () => {
    beforeEach(() => {
      /**
       * This allows us to avoid editing the Quordle class.
       * This changes the first Wordle object to have the word
       * we want: "apple". Right now, every new quordle object has four random words.
       */
      quordle.words[0].newGame(6, 5, 'apple');
    });
    it('should return G-G-G-G-G if guess is correct', () => {
      quordle.addGuess('apple');
      expect(quordle.letterHints()).toEqual(new Array(5).fill('green'));
    });
    it('should return B-B-B-B-B if none of the letters are correct', () => {
      quordle.addGuess('bbbbb');
      expect(quordle.letterHints()).toEqual(new Array(5).fill('black'));
    });
    it('should return Y-G-B-B-B if guess is "ppzzz"', () => {
      quordle.addGuess('ppzzz');
      expect(quordle.letterHints()).toEqual(['yellow', 'green', 'black', 'black', 'black']);
    });
  });
});
