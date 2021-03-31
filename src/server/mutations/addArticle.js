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
      console.log(article.page.screenname)
      console.log(article.article.articletitle)
      console.log(article.article.contents)
      console.log(article.article.quotes)

      if(!(article.page.screenname && article.article.articletitle && article.article.contents.length > 0)){
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


    await calls.insertOne(pool, addArticle, [article.article.articletitle])


    const articleID = await read.getOne(pool, `select * from article_id_seq;`)
        
    let length = article.article.contents.length
    // this way grantees order
    let index = 0;
    while(index < length){
      await calls.insertOne(pool, addParagraph, [article.article.contents[index]])
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

    // const numOfNullQuotes = article.article.quotes.filter(x => x != "")

    length = article.article.quotes.length
     
    if(article.article.quotes && length > 0)
    {
      index = 0;
      while(index < length){
        // if(article.article.quotes[index] != "")
        // {
          console.log("we added " + article.article.quotes[index] + " still good?")
          await calls.insertOne(pool, addQuote, [article.article.quotes[index]])
        // }
        index++
      }


      const quoteID = await read.getOne(pool,`select * from quote_id_seq;`)

      index = quoteID.last_value - length + 1

      while(index <= quoteID.last_value){
        await calls.insertOne(pool, addArticleQuotes, [articleID.last_value, index] )
        index++
      }
    }
    
    // pageId = await read.getOne(pool, getPage, [page])
    // pageId = pageId.id 

    const pageId = await read.getOne(pool, getPage, [article.page.screenname])
    await calls.insertOne(pool, addPageArticle, [pageId.id, articleID.last_value])

      pool.end()

      return "success"
}
