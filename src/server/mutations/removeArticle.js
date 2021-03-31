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

      const getParagraphIds =  `select paragraphid from articleparagraphs where articleid = $1;`
      const deleteArticleParagraphs = `delete from articleparagraphs where articleid = $1;`
      const deleteParagraph =  `delete from paragraph where id = $1;`

      //deleting article from page
      let error = await calls.insertOne(pool, deleteArticlePage, [article.id])

      console.log(error)

      // delete paragraphs from article

      const parIds = await read.getAll(pool, getParagraphIds, [article.id])
      await calls.insertOne(pool, deleteArticleParagraphs, [article.id])
      
      // delete paragraphs (deleting order does not matter so no need for promises)
      await new Promise ((resolve, reject) => {
        resolve(parIds.forEach(id => {
          calls.insertOne(pool, deleteParagraph, [id.id])
        }))
      })

      // deleting article
      await calls.insertOne(pool, deleteArticle, [article.id])

      return "success"
}
