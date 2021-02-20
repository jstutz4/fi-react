const { Pool } = require('pg');
const common = require('../dbCalls/GetAll')


exports.func = async ({id}) => {
    var pool = new Pool({
        user: 'postgres',
        host: 'localhost',
        database: 'postgres',
        password: ' ',
        port: 5432,
      })

      const videoFilesQuery = `SELECT * from File
      INNER JOIN VideoFile ON VideoFile.FileID = File.FileID
      WHERE VideoID = $1;`
      var Video = await common.getOne(pool, `select * from video where videoid = $1`, [id])
      var videoFiles = await common.getAll(pool, videoFilesQuery, [id])
      pool.end()
      return {...Video, files:videoFiles} 
}
