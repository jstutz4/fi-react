const { Pool } = require('pg');
const calls = require('../dbCalls/insertDBCalls')
const read = require('../dbCalls/GetAll')
// const videoQuery = require('./getVideoQuery')


exports.func = async ({page, articletitle, contents, quotes}) => {
    
    var pool = new Pool({
        user: 'postgres',
        host: 'localhost',
        database: 'postgres',
        password: ' ',
        port: 5432,
      })

      if(!(page && articletitle && contents.length > 0)){
        return "failure achieved"
      }
      const addArticle = `insert into article (articletitle)
      values($1);`
      const addParagraph = `insert into paragraph (paragraph) values($1)`

      const addQuote = `insert into quote (quote) values($1)`

      const addArticleParagraphs = `insert into articleParagraphs (articleId, paragraphId)
      values($1,$2);`

      const addArticleQuotes = `insert into articleQuotes (articleId, quoteId)
      values($1,$2);`

      const getPage = `select id from page where screenName = $1`

      const addPageArticle = `insert into pageArticles (pageId, articleId)
      values($1,$2);`


    await calls.insertOne(pool, addArticle, [articletitle])

    const articleID = await read.getOne(pool, `select * from article_id_seq;`)
        
    let length = contents.length
    // this way grantees order
    let index = 0;
    while(index < length){
      await calls.insertOne(pool, addParagraph, [contents[index]])
      index++
    }
     
     // now add paragraphs to article
     const paragraphID = await read.getOne(pool,`select * from paragraph_id_seq;`)

    index = paragraphID.last_value - length + 1

    //order does not matter on insert
    while(index <= paragraphID.last_value){
      await calls.insertOne(pool, addArticleParagraphs, [articleID.last_value, index] )
      index++
    }

     
    if(quotes && quotes.length > 0)
    {
      length = quotes.length
      index = 0;
      while(index < length){
        await calls.insertOne(pool, addQuote, [quotes[index]])
        index++
      }


      const quoteID = await read.getOne(pool,`select * from quote_id_seq;`)

      index = quoteID.last_value - length + 1

      //order does not matter on insert
      while(index <= quoteID.last_value){
        await calls.insertOne(pool, addArticleQuotes, [articleID.last_value, index] )
        index++
      }
    }
    
    pageId = await read.getOne(pool, getPage, [page])
    pageId = pageId.id 

    
    await calls.insertOne(pool, addPageArticle, [pageId, articleID.last_value])

      pool.end()

      return "success"
}
