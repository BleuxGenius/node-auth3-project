const knex = require('knex');

const knexConfig = require('./knexfile.js')

// exports for use in database while also selecting the development section from the knexfile
module.exports = knex(knexConfig.development); 