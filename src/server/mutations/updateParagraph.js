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

        if(paragraph.id){
            await calls.insertOne(pool, updateParagraph, [content.text, paragraph.id])
        }
      }

      return "success"
}
