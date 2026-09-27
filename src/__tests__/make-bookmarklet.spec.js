import getIO from './utils/getIO.js';
import encodeBookmarklet from '../encodeBookmarklet.js';
import prepareBookmarklet from '../prepareBookmarklet.js';

describe('prepareBookmarklet / encodeBookmarklet', () => {
  describe('Handles comments', () => {
    it('Removes in-line comments', () => {
      const { input, output } = getIO('comments-inline.js');
      expect(prepareBookmarklet(input)).toEqual(output);
    });
    it('Preserves slashes inside strings and regular expressions', () => {
      const input = [
        "p = h.indexOf('https://pro.imdb.com');",
        "window.location = h.replace(/https:\\/\\/[a-z]+/, 'https://pro');",
      ].join('\n');
      const prepared = prepareBookmarklet(input);

      expect(prepared).toBe(
        "p=h.indexOf('https://pro.imdb.com');window.location=h.replace(/https:\\/\\/[a-z]+/,'https://pro');"
      );
      expect(() => new Function(prepared)).not.toThrow();
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
    it('Does not remove a non-comment double slash', () => {
      const { input, output } = getIO('comment-gotchas.js');
      expect(prepareBookmarklet(input)).not.toEqual(output);
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
