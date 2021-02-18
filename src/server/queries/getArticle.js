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

      var article = await common.getOne(pool, `select * from article where id = $1`, [id])
      var video = await new Promise((resolve, reject) => {
        resolve(videoQuery.func({"id":article.videoid}))

      })

      var paragraphs = await common.getAll(pool, paragraphsQuery, [id])
      paragraphs = paragraphs.map((par)=> {return par.paragraph})
      var quotes = await common.getAll(pool, quotesQuery, [id])
      quotes = quotes.map((quote) => {return quote.quote})


    //   pool.end()
    //   console.log("we have a problem")
    //   console.log(id)
    //   console.log(article)
    //   console.log(paragraphs)
    //   console.log(quotes)
    //   console.log(video)

      return {...article, "contents":paragraphs, "quotes": quotes, "video":video}
}