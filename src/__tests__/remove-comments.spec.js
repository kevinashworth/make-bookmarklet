import removeComments from '../removeComments.js';

describe('removeComments', () => {
  it('removes comment lines', () => {
    expect(removeComments('// This is a comment')).toBe(
      ''
    );
    expect(removeComments('/* This is a comment */')).toBe(
      ''
    );
  });

  it('removes multi-line comments, preserves line breaks (which can be removed later)', () => {
    expect(removeComments('/* This is a comment */\n/* **** */')).toBe(
      '\n'
    );
    expect(removeComments('/* This is a comment \n **** */')).toBe(
      '\n'
    );
  });

  it('removes trailing comments', () => {
    expect(removeComments('const value = 1; // This is a comment')).toBe(
      'const value = 1; '
    );
    expect(removeComments('const value = 1; /* This is a comment */')).toBe(
      'const value = 1; '
    );
  });

  it('removes trailing comments and preserves the line break', () => {
    expect(removeComments('const value = 1; // comment\nconst next = 2;')).toBe(
      'const value = 1; \nconst next = 2;'
    );
  });

  it('removes in-line block comments', () => {
    expect(removeComments('const value = /* comment */ 1;')).toBe(
      'const value =  1;'
    );
  });

  it('preserves comment markers in quoted strings', () => {
    const source = "const url = 'https://example.com/path'; // trailing comment";

    expect(removeComments(source)).toBe(
      "const url = 'https://example.com/path'; "
    );
  });

  it('preserves comment markers in regular expressions', () => {
    const source = 'const regex = /https:\\/\\/example\\.com\\/path/; // trailing comment';

    expect(removeComments(source)).toBe(
      'const regex = /https:\\/\\/example\\.com\\/path/; '
    );
  });
});
