exports.getAll = async (client, query, params = []) => {
    return new Promise((resolve, reject) => {
        video = {}
        client.query(query,params, (err, results)=>{
            if(err){
                reject(err)
            }
            else {
                resolve(results.rows)
            }
        })
    })
}  
   
exports.getOne = async (client, query, params = []) => {
    return new Promise((resolve, reject) => {
        video = {}
        client.query(query,params, (err, results)=>{
            if(err){
                reject(err)
            }
            else {
                resolve(results.rows[0])
            }
        })
    })
}  

exports.getVideos = async (client, query, params = []) => {
    return new Promise((resolve, reject) => {
        video = {}
        client.query(query,params, (err, results)=>{
            if(err){
                reject(err)
            }
            else {
                const videoFilesQuery = `SELECT * from File
                INNER JOIN VideoFile ON VideoFile.FileID = File.FileID
                WHERE VideoID = $1;`
                
                const videos = results.rows
                resolve( 
                    videos.map((vid) =>{
                    client.query(client, videoFilesQuery, [vid.videoid])})
                )
            }
        })
    })
} 