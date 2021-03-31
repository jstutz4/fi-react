const { Pool } = require('pg');
const calls = require('../dbCalls/insertDBCalls')
const read = require('../dbCalls/GetAll')
// const videoQuery = require('./getVideoQuery')


exports.func = async ({content}) => {
    
    var pool = new Pool({
        user: 'postgres',
        host: 'localhost',
        database: 'postgres',
        password: ' ',
        port: 5432,
      })

      const updateTitle = `update article set articletitle = $1 where id = $2;`


      await calls.insertOne(pool, updateTitle, [content.title, content.articleId])
      return "success"
}
