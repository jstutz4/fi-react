const { Pool } = require('pg');
const common = require('../dbCalls/GetAll')
const videoQuery = require('./getVideoQuery')
const articleQuery = require('./getArticle')


exports.func = async (ids) => {
    
    var pool = new Pool({
        user: 'postgres',
        host: 'localhost',
        database: 'postgres',
        password: ' ',
        port: 5432,
      })

      const paragraphsQuery = `SELECT paragraph from paragraph
      INNER JOIN articleparagraphs ap ON ap.paragraphID = paragraph.ID
      where articleID = $1;`

      const quotesQuery = `SELECT quote from quote
      INNER JOIN articleQuotes aq ON aq.quoteID = quote.ID
      where articleID = $1;`
      
      // ids = await ids.map(id => id.articleid)
      var articles = await Promise.all(ids.map((art)=> {
        return new Promise((resolve, reject)=> {
          resolve(articleQuery.func({id:art.articleid}))
        }) 
      }))
            
      pool.end()
      return articles
     

}
