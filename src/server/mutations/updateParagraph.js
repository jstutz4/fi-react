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

      const updateParagraph = `update paragraph set paragraph = $1 where id = $2;`
      const updateQuote = `UPDATE quote SET quote = $1 WHERE id = $2;`
      const getParagraphId = `select id from paragraph where paragraph like $1;`
      const getQuoteId = `select id from quote where quote like $1;`

      const addParagraph =  `insert into paragraph (paragraph) values($1);`
      const addArticleParagraphs =  `insert into articleParagraphs(articleid, paragraphid) values($1, $2)`

      const addQuote =  `insert into quote (quote) values($1);`
      const addArticleQuotes =  `insert into articleQuotes(articleid, quoteid)
      values($1, $2);`

console.log(content)
      if(content.dataId){

      if(content.type === "quote")
      {
          const quote = await read.getOne(pool, getQuoteId, ['%' + content.dataId + '%'])

          if(quote.id){
              await calls.insertOne(pool, updateQuote, [content.text, quote.id])
          }
      }
      else if (content.type === "paragraph") 
      {
        const paragraph = await read.getOne(pool, getParagraphId, ['%' + content.dataId + '%'])

        console.log(paragraph)
        
        if(paragraph.id){
            await calls.insertOne(pool, updateParagraph, [content.text, paragraph.id])
        }
      }
    }
    // we need to add the new content
    else
    {
        console.log("adding new content")
        if(content.type === "paragraph")
        {
            // add paragraph to db
            await calls.insertOne(pool, addParagraph, [content.text])
            console.log("step 1")
            // get the newly added paragraph
            const paragraphId =  await read.getOne(pool, getParagraphId, [content.text])
            console.log(paragraphId)
            // add the paragraph to the article
            await calls.insertOne(pool, addArticleParagraphs, [content.articleId, paragraphId.id])
        }
        else if(content.type === "quote")
        {
            // add quote to db
            await calls.insertOne(pool, addQuote, [content.text])

            // get the newly added quote
            const quoteId =  await read.getOne(pool, getQuoteId, [content.text])

            // add the new quote to the article
            await calls.insertOne(pool, addArticleQuotes, [content.articleId, quoteId.id])
        }
    }


      return "success"
}
