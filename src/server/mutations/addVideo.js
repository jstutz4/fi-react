const { Pool } = require('pg');
const calls = require('../dbCalls/insertDBCalls')
const read = require('../dbCalls/GetAll')
// const videoQuery = require('./getVideoQuery')


exports.func = async ({video, files}) => {
    
    var pool = new Pool({
        user: 'postgres',
        host: 'localhost',
        database: 'postgres',
        password: ' ',
        port: 5432,
      })

      const addVideo = `insert into video(title, source) values ($1, $2)`
      const addFile = `insert into file(source, displayname) values ($1, $2)`


        await calls.insertOne(pool, addVideo, [video.title, video.source])

        await Promise.all(files.array.forEach((file) => {
          new Promise((resolve, reject) => {
           resolve(calls.insertOne(pool, addFile, [file.source, file.displayname]))
          })
        }))


      return "success"
}
