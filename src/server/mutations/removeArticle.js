const { Pool } = require('pg');
const calls = require('../dbCalls/insertDBCalls')
const read = require('../dbCalls/GetAll')
// const videoQuery = require('./getVideoQuery')


exports.func = async ({article}) => {
    
    var pool = new Pool({
        user: 'postgres',
        host: 'localhost',
        database: 'postgres',
        password: ' ',
        port: 5432,
      })

      const deleteArticlePage = `delete from pagearticles where articleid = $1;`

      const deleteArticle = `delete from article where id = $1;`

      let error = await calls.insertOne(pool, deleteArticlePage, [article.id])

      console.log(error)

      await calls.insertOne(pool, deleteArticle, [article.id])

      return "success"
}
