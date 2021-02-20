const { Pool } = require('pg');
const common = require('../dbCalls/GetAll')


exports.func = async (_,) => {
    var pool = new Pool({
        user: 'postgres',
        host: 'localhost',
        database: 'postgres',
        password: ' ',
        port: 5432,
      })

      const videoFilesQuery = `SELECT * from File
      INNER JOIN VideoFile ON VideoFile.FileID = File.FileID;`
      var videos = await common.getAll(pool, `select * from video`)
      var files = await common.getAll(pool, videoFilesQuery)
      pool.end()

      var allvideos = await videos.map(async(vid) =>{
        vid.files = await files.filter(file => file.videoid == vid.videoid )
      })

      return videos 
}
