require = require('esm')(module);
module.exports = require('./src/server.js');

console.log({ app: module.exports })
