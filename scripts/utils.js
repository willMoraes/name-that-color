const fs = require('fs');

const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
}

function error(message) {
  console.log(colors.red, message, colors.reset)
}

function success(message) {
  console.log(colors.green, message, colors.reset)
}

function info(message) {
  console.log(colors.reset, message)
}

const message = { error, success, info }

function getJSONData(filePath) {
  const JSON_DATA = fs.readFileSync(filePath, 'utf8', (err, data) => {
    if (err) {
      message.error('Erro ao ler arquivo JSON', err);
      return;
    }
  });

  const PARSED_JSON = JSON.parse(JSON_DATA)
  message.success(`Arquivo ${filePath} lido com sucesso!`)
  
  return PARSED_JSON
}

module.exports = {
  message,
  getJSONData
}