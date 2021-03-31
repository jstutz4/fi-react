const { Pool } = require('pg');
const calls = require('../dbCalls/GetAll')


exports.func = async () => {
    
    var pool = new Pool({
        user: 'postgres',
        host: 'localhost',
        database: 'postgres',
        password: ' ',
        port: 5432,
      })

      const filesQuery = `SELECT * from file;`

      const files = await calls.getAll(pool, filesQuery)
      const fileArray = files.map((file) => {
          return(
              {...file, id:file.fileid}
          )
      })

      pool.end()


      return fileArray
}
