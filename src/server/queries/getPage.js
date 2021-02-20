const { Pool } = require('pg');
const common = require('../dbCalls/GetAll')
const articleQuery = require('./getAllArticles')


exports.func = async ({screenName}) => {
    var pool = new Pool({
        user: 'postgres',
        host: 'localhost',
        database: 'postgres',
        password: ' ',
        port: 5432,
      })
      const articlesFromScreenName = `select articleid, a.articletitle from pagearticles 
      inner join article a ON a.id = pagearticles.articleid
      where pageid = (select id from page where screenName = $1 );`

        var articleids = await common.getAll(pool, articlesFromScreenName, [screenName])

        var articleNav = await articleids.map((art) => {
            return {"name":art.articletitle, "to": art.articleid}
        })

      var article = await new Promise ((resolve, reject) => {
          resolve(articleQuery.func(articleids))
      })

      pool.end()

      return {"screenName": 'start', "articles":article, "articleNav": articleNav}
}
