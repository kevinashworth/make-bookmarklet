function removeComments(source) {
  let result = '';
  let quote;
  let escaped = false;

  for (let index = 0; index < source.length; index += 1) {
    const character = source[index];
    const nextCharacter = source[index + 1];

    if (quote) {
      result += character;
      if (escaped) {
        escaped = false;
      } else if (character === '\\') {
        escaped = true;
      } else if (character === quote) {
        quote = undefined;
      }
      continue;
    }

    if (character === '"' || character === "'" || character === '`') {
      quote = character;
      result += character;
    } else if (character === '/' && nextCharacter === '/') {
      while (
        index + 1 < source.length &&
        source[index + 1] !== '\n' &&
        source[index + 1] !== '\r'
      ) {
        index += 1;
      }
    } else if (character === '/' && nextCharacter === '*') {
      index += 2;
      while (index < source.length && !(source[index] === '*' && source[index + 1] === '/')) {
        if (source[index] === '\n' || source[index] === '\r') {
          result += source[index];
        }
        index += 1;
      }
      index += 1;
    } else {
      result += character;
    }
  }

  return result;
}

export default removeComments;
