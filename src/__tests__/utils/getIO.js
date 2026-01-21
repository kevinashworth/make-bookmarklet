import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// option is "a", "c", "d" or blank
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function getIO (fileName, option = '') {
  const outputFileName = option
    ? fileName.replace('.js', '-' + option + '.js')
    : fileName;
  let input;
  let output;
  try {
    input = fs.readFileSync(
      path.join(__dirname, '../__fixtures__/input/') + fileName,
      'utf8'
    );
    output = fs.readFileSync(
      path.join(__dirname, '../__fixtures__/output/') + outputFileName,
      'utf8'
    );
    return { input, output };
  } catch (e) {
    console.error('fs error:', e.stack);
  }
}

export default getIO;
