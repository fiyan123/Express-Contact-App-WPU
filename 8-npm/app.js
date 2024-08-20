const validator = require('validator');
const chalk = require('chalk');

// const hello = console.log(chalk.blue('hello'));

const pesan = chalk`lorem {bgGreen.italic ipsum dolor} {bgBlue.white.underline sit amet}`;
console.log(pesan);