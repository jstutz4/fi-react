const express = require('express');
const cors = require('cors');
const {graphqlHTTP} = require('express-graphql');
const gql = require('graphql-tag');
const { buildASTSchema } = require('graphql');
const path = require('path')

const sqlite3  = require('sqlite3').verbose();


const startPage = require('./startContent')
const savePage = require('./saveContent')
const investPage = require('./investContent')
const aboutPage = require('./aboutContent');
const { resolve } = require('path');

const POSTS = [
  { id: 2, author: "John Doe" },
  { author: "Jane Doe", body: "Hi, planet!" },
  { id: 42, author: "Jane Doe", body: "Hi, planet!", contents: ['hello', 'this', 'is really cool'] },
];

const STARTPAGE = {
  id:1,
  screenName: "start",
  articles:[
    startPage.UnderstandingMoney,
    startPage.HowTo,
  ],
}

const SAVEPAGE = {
  id:2,
  screenName: "save",
  articles:[
    savePage.Savings1,
    savePage.Savings2,
    savePage.Savings3,
  ],
}

const INVESTPAGE = {
  id:3,
  screenName: "invest",
  articles:[
    investPage.invest2,
  ],
}

const ABOUTPAGE = {
  id:4,
  screenName: "about",
  articles: [
    aboutPage.about1
  ]
}
const PAGES = [
  STARTPAGE,
  SAVEPAGE,
  INVESTPAGE,
  ABOUTPAGE,
]

const NAVS = {
 0: [
    {id: 1, name:"Getting Started", to:"/start/1"}, 
    {id: 2, name:"Saving", to:`/save/13`},
    {id: 3, name:"Investing", to:"/invest"},
    {id: 4, name:"About", to:"/about"},
  ],
  1: startPage.StartNav,
  2: savePage.SaveNav,
  3: investPage.InvestNav,

}


/*START HERE*/

  const schema = buildASTSchema(gql`
  type Query {
    posts: [Post]
    post(id: ID!): Post
    page(id: ID!): Page
    video(id:ID!): Video
    videos: [Video]
    article(id:ID): Article
  }

  type Post {
    id: ID
    author: String
    body: String
    contents: [String]
  }

  type Page {
    id: ID
    screenName: String!
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
    title: String
    source: String
    files: [File]
  }

  type Link {
    id: ID
    to: String
    name: String
  }

`);

//resolvers
const root = {
  // videos: require('./queries/getVideosQuery').func,
  // video:  require('./queries/getVideoQuery').func,
  // article: require('./queries/getArticle').func, 
  page: require('./queries/getPage').func
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


// console.log("LOOK")
// console.log(schema.getTypeMap())
// let videoType = new schema

// const db = new sqlite3.Database('../../public/test.db')

    const app = express();
    app.use(cors());
    app.use('/graphql', graphqlHTTP({
      schema,
      rootValue: root,
      graphiql: true,
    }))

// app.use(express.static('public'))

// app.get('*', (request, response) => {
//   response.sendFile(path.resolve(__dirname, 'public', 'index.html'))
// })

const port = process.env.PORT || 4000
app.listen(port);
console.log(`Running a GraphQL API server at localhost:${port}/graphql`);