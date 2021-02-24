const { Pool } = require('pg');
const common = require('../dbCalls/GetAll')
const articleQuery = require('./getAllArticles')


exports.func = async ({screenname, admin}) => {
    var pool = new Pool({
        user: 'postgres',
        host: 'localhost',
        database: 'postgres',
        password: ' ',
        port: 5432,
      })
      const articlesFromScreenName = `select articleid, a.articletitle from pagearticles 
      inner join article a ON a.id = pagearticles.articleid
      where pageid = (select id from page where screenname = $1 );`

        var articleids = await common.getAll(pool, articlesFromScreenName, [screenname])

        
        var articles = await new Promise ((resolve, reject) => {
            resolve(articleQuery.func(articleids))
        })

        if (admin){
          return articles
        }

        var articleNav = await articleids.map((art) => {
            return {"name":art.articletitle, "to": art.articleid}
        })


      pool.end()



      return {"screenname": screenname, "articles":articles, "articleNav": articleNav}
}
