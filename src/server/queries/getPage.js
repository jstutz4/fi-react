const { Pool } = require('pg');
const common = require('../dbCalls/GetAll')
// const articleQuery = require('./getAllArticles')
const articleQuery = require('./getArticle')


exports.func = async ({id}) => {
    var pool = new Pool({
        user: 'postgres',
        host: 'localhost',
        database: 'postgres',
        password: ' ',
        port: 5432,
      })

        var articleids = await common.getAll(pool, `select * from article where id = any (select articleid from pagearticles where pageid = $1);`, [id])

        var articleNav = await articleids.map((art) => {
            return {"name":art.articletitle, "to": art.id}
        })

      var article = await new Promise ((resolve, reject) => {
          resolve(articleQuery.func({"id": articleids[0].id}))
      })

    //   articleids = articleids.map(item => item.id)

    //   var articles = await new Promise((resolve, reject) => {
    //       resolve(articleQuery.func(articleids))
    //   })

    //   var paragraphs = await common.getAll(pool, paragraphsQuery, [id])
    //   paragraphs = paragraphs.map((par)=> {return par.paragraph})
    //   var quotes = await common.getAll(pool, quotesQuery, [id])
    //   quotes = quotes.map((quote) => {return quote.quote})


      pool.end()


    //   console.log(articleNav)
      return {"screenName": 'start', "articles":[article], "articleNav": articleNav}
}
