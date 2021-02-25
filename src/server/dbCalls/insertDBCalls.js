exports.insertOne = async (client, query, params = []) => {
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

// exports.insertAll = async (client, type, content) => {
//     // const nextId = () => new Promise((resolve, reject) =>{
//     //     query = `Select nextval(pg_get_serial_sequence($1, 'id')) as new_id;`
//     //     client.query(query, [type], (err, results)=>{
//     //         if (err){
//     //             reject(err)
//     //         }
//     //         else {
//     //             resolve(results.rows[0].new_id)
//     //         }
//     //     })
//     // })
// // cant grantee order
//     // return Promise.all(content.map(async(text, index) => {
//     //     return await new Promise (async(resolve, reject) => {

//     //         query = `insert into paragraph (paragraph) values($1)`
//     //         await client.query(query, [text], (err, results) => {
//     //             if(err){
//     //                 reject(err)
//     //             }
//     //             else{
//     //                 resolve(results.rows)
//     //             }
//     //         })
//     //     })
//     // }))

// }  
 
   