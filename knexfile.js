// Update with your config settings.

module.exports = {

  development: {
    // our database management system (DBMS)
    client: 'sqlite3',
    // prevents crashes within sqlite 
    useNullAsDefault: true,
    // location of where data will be stored 
    connection: {
      filename: './migrations/auth.db3'
    },
    pool: {
     afterCreate: (conn, done) => {
       conn.run('PRAGMA foreign_keys = ON', done);
     },
    },
    migrations: {
      directtory: './migrations',
    },
    seeds: {
      directory: './migrations/seeds'
    }
  }
}


// head to the config file for the database will usually be a dbConfig file 