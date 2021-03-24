const express = require('express');
const cors = require('cors');
const {graphqlHTTP} = require('express-graphql');
const gql = require('graphql-tag');
const { buildASTSchema } = require('graphql');
const path = require('path')
const fileUpload = require('express-fileupload');
const { GraphQLUpload, graphqlUploadExpress  } = require('graphql-upload')
const { makeExecutableSchema } = require("graphql-tools");
const fs = require('fs')

require('isomorphic-fetch'); // or another library of choice.
var Dropbox = require('dropbox').Dropbox;
var dbx = new Dropbox({ accessToken: 'sl.AsbZtwWUMObnnxU53gmQ51G0zOWi6m2cvGNAKvv7X2f3phR1G1VPdg6tMNpPKMpJF2A8eXr2o2OM98M-pS_mJSraCzanLbmB0PWqQrY_Wx17Aznl-9gSIZ769fhghOlYlrRW5Pa-' });

// dbx.usersGetCurrentAccount()
//   .then(function(response) {
//     console.log("first")

//     console.log(response);
//   })
//   .catch(function(error) {

//     console.error(error);
//   });


// dbx.filesListFolder({path: ''})
//   .then(function(response) {
//     console.log("second")
//     console.log(response.result.entries);
//   })
//   .catch(function(error) {
//     console.log(error);
//   });

const sqlite3  = require('sqlite3').verbose();


const startPage = require('./startContent')
const savePage = require('./saveContent')
const investPage = require('./investContent')
const aboutPage = require('./aboutContent');
const { resolve } = require('path');



/*START HERE*/

  const schema = buildASTSchema(gql`
  scalar Upload
  
  type Query {
    posts: [Post]
    post(id: ID!): Post
    article(id:ID): Article
    articles(screenname: String!, admin: Boolean!): [Article]
    page(screenname: String!): Page
    pages: [Page]
    files: [File]
  }

 

  type Post {
    id: ID
    author: String
    body: String
    contents: [String]
  }

  type Page {
    id: ID
    screenname: String!
    articles: [Article]
    articleNav: [Link]
  }

  type Article {
    id: ID
    articletitle: String!
    video: Video
    contents: [String]
    quotes: [String]
  }

  type File {
    id: ID
    source: String
    displayname: String
  }

  type Video {
    videoid: ID
    title: String!
    source: String!
    files: [File]
  }

  type Link {
    id: ID
    to: String
    name: String
  }

  
  
  input VideoInput {
    title: String!
    source: String!
    articleId: ID!
    videoInDB: Boolean!
    files: [FileInput]
  }

  input FileInput {
    source: String
    displayname: String
    db: Boolean
  }


  input ArticleInput {
    page: MyPage
    article: MyArticle
  }

  input MyPage {
    screenname: String!
  }
  
  input MyArticle {
    id: ID
    articletitle: String!
    video: MyVideo
    contents: [String]
    quotes: [String]
  }
 
  input MyVideo  {
    videoid: ID
    title: String!
    source: String!
    files: [FileInput]
  }

  type Mutation {
    setArticle(article: ArticleInput): String
    videoUpload(video: VideoInput): String
  }

`);

//resolvers
const root = {
  // videos: require('./queries/getVideosQuery').func,
  // video:  require('./queries/getVideoQuery').func,
  Upload: GraphQLUpload,
  article: require('./queries/getArticle').func, 
  articles: require('./queries/getPage').func,
  page: require('./queries/getPage').func,
  pages: require('./queries/getPages').func,
  files: require('./queries/getFiles').func,

  setArticle: require('./mutations/addArticle').func,
  videoUpload: require('./mutations/dropboxAPI/upload').func,

  // page: require('') 
  // posts: () => POSTS,
  // // posts: () => POSTS.map(mapPost),
  // post: ({ id }) => POSTS.filter(post => post.id == id)[0],
  // // post: ({ id }) => mapPost(POSTS[id], id),
  // page:({screenName}) => PAGES.filter(page => page.screenName == screenName)[0],
  // nav: ({id}) => NAVS[id],
  // videos:() => returnTest(),
  // video:({id}) => {const promise = getVideo(id); return promise.then(result => {
  //   console.log("return this " + result )
  // })}

  // Video: {
  //   video(root, args) { 
  //     console.log("idk stop")
  //     return getVideo(args.id) },
  //   // posts(root, args) { return posts.filter(post => post.id === args.id)[0] }
  // },
};

//let typeDefs = fs.readFileSync("src/server/schema.graphql", {
//   encoding: "utf8",
//   flag: "r",
// });
// const ExeSchema = makeExecutableSchema({ typeDefs, root });

// console.log("LOOK")
// console.log(schema.getTypeMap())
// let videoType = new schema

// const db = new sqlite3.Database('../../public/test.db')

    const app = express();
    app.use(cors());
    // middle ware
    app.use(express.static('../public')); //to access the files in public folder
    app.use(fileUpload());
    app.use('/graphql',
     graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }),
     graphqlHTTP({
      schema,
      rootValue: root,
      graphiql: true,
    }))

    // file upload api
  app.post('/upload', (req, res) => {
    console.log(req.files)
    return res.status(500).send({ msg: "file is not found" })
    if (!req.files) {
        return res.status(500).send({ msg: "file is not found" })
    }
        // accessing the file
    const myFile = req.files.file;
    //  mv() method places the file inside public directory
    myFile.mv(`${__dirname}/public/files/${myFile.name}`, function (err) {
        if (err) {
            console.log(err)
            return res.status(500).send({ msg: "Error occured" });
        }
        // returning the response with file path and name
        return res.send({name: myFile.name, path: `/${myFile.name}`});
    });
  })

// app.use(express.static('public'))

// app.get('*', (request, response) => {
//   response.sendFile(path.resolve(__dirname, 'public', 'index.html'))
// })

const port = process.env.PORT || 4000
app.listen(port);
console.log(`Running a GraphQL API server at localhost:${port}/graphql`);