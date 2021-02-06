const express = require('express');
const cors = require('cors');
const {graphqlHTTP} = require('express-graphql');
const gql = require('graphql-tag');
const { buildASTSchema } = require('graphql');
const startPage = require('./startContent')
const savePage = require('./saveContent')
const investPage = require('./investContent')
const aboutPage = require('./aboutContent')

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


  const schema = buildASTSchema(gql`
  type Query {
    posts: [Post]
    post(id: ID!): Post
    page(screenName: String!): Page
    nav(id:ID): [Nav]

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
  }

  type Article {
    id: ID
    articleTitle: String!
    video: String
    videoTitle: String
    files: [File]
    contents: [String]
    quotes: [String]
  }

  type File {
    id: ID
    source: String
    text: String
  }

  type Nav {
    id: ID
    to: String
    name: String
  }

`);

// assigns and id to the posts
const mapPost = (post, id) => post && ({ id, ...post });

const root = {
  posts: () => POSTS,
  // posts: () => POSTS.map(mapPost),
  post: ({ id }) => POSTS.filter(post => post.id == id)[0],
  // post: ({ id }) => mapPost(POSTS[id], id),
  page:({screenName}) => PAGES.filter(page => page.screenName == screenName)[0],
  nav: ({id}) => NAVS[id],
};

const app = express();
app.use(cors());
app.use('/graphql', graphqlHTTP({
  schema,
  rootValue: root,
  graphiql: true,
}));

const port = process.env.PORT || 4000
app.listen(port);
console.log(`Running a GraphQL API server at localhost:${port}/graphql`);