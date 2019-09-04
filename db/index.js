// setting up the node-postgres driver
const pg = require('pg');
const postgresUrl = 'postgres://localhost/sql_practice_july_2019';
const client = new pg.Client(postgresUrl);

// connecting to the `postgres` server
client.connect();

// make the client available as a Node module
module.exports = client;
