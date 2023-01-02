const getIO = require('./utils/getIO');
const encodeBookmarklet = require('../encodeBookmarklet');
const prepareBookmarklet = require('../prepareBookmarklet');

describe('prepareBookmarklet / encodeBookmarklet', () => {
  describe('Handles comments', () => {
    xit('Removes in-line comments', () => {
      const { input, output } = getIO('comments-inline.js');
      expect(prepareBookmarklet(input)).toEqual(output);
    });
    it('Removes commented-out lines', () => {
      const { input, output } = getIO('comment-lines.js');
      expect(prepareBookmarklet(input)).toEqual(output);
    });
    it('Removes block comments', () => {
      const { input, output } = getIO('comments-block.js');
      expect(prepareBookmarklet(input)).toEqual(output);
    });
    it('Removes block comments (-a)', () => {
      const { input, output } = getIO('comments-block.js', 'a');
      expect(prepareBookmarklet(input, { aggressive: true })).toEqual(output);
    });
    it('Removes block comments (-c)', () => {
      const { input, output } = getIO('comments-block.js', 'c');
      expect(
        encodeBookmarklet(prepareBookmarklet(input), { component: true })
      ).toEqual(output);
    });
  });
  describe('Handles whitespace', () => {
    it('Consolidates and removes whitespace', () => {
      const { input, output } = getIO('whitespace.js');
      expect(prepareBookmarklet(input)).toEqual(output);
    });
    it('Consolidates and removes whitespace (-a)', () => {
      const { input, output } = getIO('whitespace.js', 'a');
      expect(prepareBookmarklet(input, { aggressive: true })).toEqual(output);
    });
    it('Consolidates and removes whitespace (-c)', () => {
      const { input, output } = getIO('whitespace.js', 'c');
      expect(
        encodeBookmarklet(prepareBookmarklet(input), { component: true })
      ).toEqual(output);
    });
  });
});
