exports.upLoad = async ({file}) => {
    // const ACCESS_TOKEN = `sl.AsbZtwWUMObnnxU53gmQ51G0zOWi6m2cvGNAKvv7X2f3phR1G1VPdg6tMNpPKMpJF2A8eXr2o2OM98M-pS_mJSraCzanLbmB0PWqQrY_Wx17Aznl-9gSIZ769fhghOlYlrRW5Pa-`    
    // const UPLOAD_FILE_SIZE_LIMIT = 150 * 1024 * 1024;
    // var dbx = new Dropbox.Dropbox({ accessToken: ACCESS_TOKEN });
    
    console.log(file)
    console.log("read me now")
    
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

    return "success";
  }