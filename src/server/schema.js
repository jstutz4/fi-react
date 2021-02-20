const graphql = require('graphql')
const { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql

const { Pool } = require('pg');
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: ' ',
  port: 5432,
})

async function getVideo(){
    const video1query = `SELECT * from video`
    let results
    await pool.query(video1query, [], (err, res) => {
      if(err){
        console.log(err)
        results = "some string"
      }
      else {
        res.rows
       results = res.rows
      }
      // pool.end() 
    })

    return results
  }



const videosDB = [
    {
        videoid: "12",
        title: "intro video",
        source: "urlgoeshere",
    }
]

const videoType = new GraphQLObjectType({
    name: 'Video',
    fields: {
      videoid: {
        type: GraphQLID,
      },
      title: {
        type: GraphQLString,
      },
      source: {
          type: GraphQLString
      }
    },
  })

const queryType = new GraphQLObjectType({
    name: 'Query',
    fields: {
        videos:{
            type: new GraphQLList(videoType),
            resolve: require('./getVideoPGquery').func
        }
    }
})

const schema = new GraphQLSchema({
    query: queryType,
  })

module.exports = schema