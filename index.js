require = require('esm')(module);
module.exports = require('./src/server.js');

console.log("App", process.env.NODE_ENV)

