const { Pool } = require('pg');
const common = require('../dbCalls/GetAll')
const videoQuery = require('./getVideoQuery')


exports.func = async ({id}) => {
    
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

      const validateArticle = `select id from article`

     var validArticles =  await common.getAll(pool,validateArticle)

     const valid = validArticles.filter(x => x.id == id)

     if(valid.length < 1){
       return {id:-1, articletitle:"add article", contents:[]}
     }
     
     
     
      var article = await common.getOne(pool, `select * from article where id = $1`, [id])
      console.log(article)

      if(article.videoid){
        var video = await new Promise((resolve, reject) => {
          resolve(videoQuery.func({"id":article.videoid}))

        })
      }

      var paragraphs = await common.getAll(pool, paragraphsQuery, [id])
      paragraphs = paragraphs.map((par)=> {return par.paragraph})
      var quotes = await common.getAll(pool, quotesQuery, [id])
      quotes = quotes.map((quote) => {return quote.quote})


      pool.end()

      

      return {...article, "contents":paragraphs, "quotes": quotes, "video":video}
}
