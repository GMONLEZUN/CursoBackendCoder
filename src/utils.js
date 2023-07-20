import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';


// Funciones de READ | WRITE  -----------------------------

const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);

async function readFile(file) {
    try {
      let result = await fs.promises.readFile(__dirname + "/" + file, "utf-8");
      let data = await JSON.parse(result);
      return data;
    } catch (err) {
      console.log(err);
    };
  }
  
async function writeFile(file, data) {
    try {
    await fs.promises.writeFile(__dirname + "/" + file, JSON.stringify(data));
    return true;
    } catch (err) {
    console.log(err);
    };
}

export default { readFile, writeFile }