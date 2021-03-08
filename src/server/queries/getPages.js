const { Pool } = require('pg');
const common = require('../dbCalls/GetAll')
const articleQuery = require('./getAllArticles')


exports.func = async () => {
    var pool = new Pool({
        user: 'postgres',
        host: 'localhost',
        database: 'postgres',
        password: ' ',
        port: 5432,
      })
      const articlesFromScreenName = `select * from page;`
      console.log("we mad it")

      var pages = await common.getAll(pool, articlesFromScreenName)

    //     var articleNav = await articleids.map((art) => {
    //         return {"name":art.articletitle, "to": art.articleid}
    //     })

    //   var article = await new Promise ((resolve, reject) => {
    //       resolve(articleQuery.func(articleids))
    //   })

      pool.end()
       
      return pages
}
