const { Pool } = require('pg');
const calls = require('../../dbCalls/insertDBCalls')
const read = require('../../dbCalls/GetAll')

exports.func = async ({video}) => {

  var pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: ' ',
    port: 5432,
  })
  const insertVideoQuery = `INSERT INTO Video (title, source)
  VALUES($1, $2);`

  const insertFileQuery = `INSERT INTO File (displayname, source)
  VALUES($1, $2);`

  const getFileId = `select fileid as id from file where source = $1;`

  const getVideoId = `select videoid as id from video where source = $1;
  `
  const insertVideoFiles = `INSERT INTO VideoFile(VideoID, FileID)
  VALUES($1, $2);`
 
  const addArticleVideo = `update article set videoid = $1 where id = $2;`

  console.log(video)


  if(!video.videoInDB)
  {
    // this will hang if video is already in db (user forgets to check the box)
   err =  await calls.insertOne(pool, insertVideoQuery, [video.title, video.source])
   console.log(err)
  }

  const videoId = await read.getOne(pool,getVideoId, [video.source])
    
  console.log("video")
  console.log(videoId)
  // ensure user adds a  new video or uses one already in the db
  if(videoId != null)
  {
  
  // add the files to files duplicates will not be added
  const newFileIds = await Promise.all(video.files.map((file) => {
    
    if(!file.db)
    {
      return new Promise((resolve, reject) => {
        resolve(calls.insertOne(pool, insertFileQuery, [file.displayname, file.source ]))
      }).then((value) =>{
        //then get id for new file
        return read.getOne(pool, getFileId, [file.source])
      })
    }
      //then get the ids for already in db files
    else
    {
      return new Promise((resolve, reject) => {
        resolve(read.getOne(pool, getFileId, [file.source]))
      })
    }
  }))

  console.log("file")
  console.log(newFileIds)
  
  // convert them to array with id -- we could also this in the promises
  const newFileIdArray = await newFileIds.map((idObj)=>{
    return idObj.id
  })
  
  console.log(newFileIdArray)
  // add each of the files to the video
if(newFileIdArray.length > 0)
{
  await Promise.all(newFileIdArray.map((fileId) =>{
    console.log(1)
    console.log(videoId.id, fileId)
    new Promise((resolve, reject)=> {
      resolve(calls.insertOne(pool, insertVideoFiles, [videoId.id, fileId]))
    })
  }))
}
  
console.log(2)
console.log(videoId.id, video.articleId)
  // add videoId to the article
  await calls.insertOne(pool, addArticleVideo, [videoId.id, video.articleId])
}
  //below code is for the dropbox api

  // const ACCESS_TOKEN = `sl.AsbZtwWUMObnnxU53gmQ51G0zOWi6m2cvGNAKvv7X2f3phR1G1VPdg6tMNpPKMpJF2A8eXr2o2OM98M-pS_mJSraCzanLbmB0PWqQrY_Wx17Aznl-9gSIZ769fhghOlYlrRW5Pa-`    
  // const UPLOAD_FILE_SIZE_LIMIT = 150 * 1024 * 1024;
  // var dbx = new Dropbox.Dropbox({ accessToken: ACCESS_TOKEN });
  
    // if (file.size < UPLOAD_FILE_SIZE_LIMIT) { // File is smaller than 150 Mb - use filesUpload API
    //   dbx.filesUpload({path: '/' + file.name, contents: file})
    //     .then(function(response) {
    //       var results = document.getElementById('results');
    //       var br = document.createElement("br");
    //       results.appendChild(document.createTextNode('File uploaded!'));
    //       results.appendChild(br);
    //       console.log(response);
    //     })
    //     .catch(function(error) {
    //       console.error(error);
    //     });
    // }
    // else { // File is bigger than 150 Mb - use filesUploadSession* API
    //   const maxBlob = 8 * 1000 * 1000; // 8Mb - Dropbox JavaScript API suggested max file / chunk size

    //   var workItems = [];     
    
    //   var offset = 0;

    //   while (offset < file.size) {
    //     var chunkSize = Math.min(maxBlob, file.size - offset);
    //     workItems.push(file.slice(offset, offset + chunkSize));
    //     offset += chunkSize;
    //   } 
        
    //   const task = workItems.reduce((acc, blob, idx, items) => {
    //     if (idx == 0) {
    //       // Starting multipart upload of file
    //       return acc.then(function() {
    //         return dbx.filesUploadSessionStart({ close: false, contents: blob})
    //                   .then(response => response.session_id)
    //       });          
    //     } else if (idx < items.length-1) {  
    //       // Append part to the upload session
    //       return acc.then(function(sessionId) {
    //        var cursor = { session_id: sessionId, offset: idx * maxBlob };
    //        return dbx.filesUploadSessionAppendV2({ cursor: cursor, close: false, contents: blob }).then(() => sessionId); 
    //       });
    //     } else {
    //       // Last chunk of data, close session
    //       return acc.then(function(sessionId) {
    //         var cursor = { session_id: sessionId, offset: file.size - blob.size };
    //         var commit = { path: '/' + file.name, mode: 'add', autorename: true, mute: false };              
    //         return dbx.filesUploadSessionFinish({ cursor: cursor, commit: commit, contents: blob });           
    //       });
    //     }          
    //   }, Promise.resolve());
      
    //   task.then(function(result) {
    //     var results = document.getElementById('results');
    //     results.appendChild(document.createTextNode('File uploaded!'));
    //   }).catch(function(error) {
    //     console.error(error);
    //   });
      
    // }
    console.log("success")
    return "success";
  }