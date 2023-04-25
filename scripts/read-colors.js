const fs = require('fs');
const path = require('path');
const message = require('./utils').message;
const getJSONData = require('./utils').getJSONData;
require('dotenv').config();

const projectDir = process.env.PROJECT_PATH;
const colorsPath = path.join(__dirname, 'colors.json');

const COLOR_WITH_INCIDENCES = {}
const COLORS_DATA = getJSONData(colorsPath)

function walkDir(folderPath) {
  message.info('Reading files...')

  const files = fs.readdirSync(folderPath);

  for (const file of files) {
    const filePath = path.join(folderPath, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      walkDir(filePath);
    } else {
      message.info('Reading file: ', filePath)

      const content = fs.readFileSync(filePath, 'utf8');

      for (const colorItem in COLORS_DATA) {
        const currentColorItem = COLORS_DATA[colorItem]
        const oldHex = currentColorItem.oldHex

        checkColorMatchesInFile(content, oldHex)
      }
    }
  }
}

function checkColorMatchesInFile(content, color) {
  const regex = new RegExp(color, 'g')
  const matches = content.match(regex) || [];

  if (matches.length > 0) {
    if (!COLOR_WITH_INCIDENCES[color]) {
      COLOR_WITH_INCIDENCES[color] = matches.length
    } else {
      COLOR_WITH_INCIDENCES[color] = COLOR_WITH_INCIDENCES[color] += matches.length
    }
  }
}

function creteResultFile() {
  fs.writeFileSync("result.json", JSON.stringify(COLOR_WITH_INCIDENCES));
  
  message.success('File created with success!')
}

walkDir(projectDir)
creteResultFile()

