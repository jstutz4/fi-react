import React from 'react'
import Article from '../components/article'
import ArticleNav from '../components/articleNav'
import { Link } from 'react-router-dom'



const content1 = `What is money? What do you exchange your money for? What do you exchange for your money? Think about these questions before reading on..
The above questions may shed light on your why, that is why do you want money. Another way to ask this question is what would you do if didn't have to work? What do you do now when you don't have to work? You may not know what your life would look like if you didn't have to work and that is okay. One of the goals is to be able to answer this question.
`
const quote1 = `What would you do if you didn't have to work?`

const content2 = `To be able to compare or weigh activities, jobs, or destressors with each other we need a common measurement. What do you exchange for your money? TIME. Time is the one thing we cannot control and we never know when we will run out. If you view your choices as a value of time then you can begin to make informed judgments on your choices.`

const quote2 = `We exchange our TIME for money`

const content3 = `Another element that will help you understand what you want to do if you didn't work and money was not a problem is values. How can you know if the choices you are making are good and leading you to the future you will enjoy? Values, knowing what your values are and what they mean to you gives you a standard to move towards and a way to make informed judgments on your choices. It is okay if your values change over time, in fact I think we should strive to refine our values throughout our lives.`

const content4 = `This is your foundation your values and your why. When you have a strong sense of your foundation and the joy you get out of from the events of your life you can begin to take control of who you want to be, and not just letting the world taking control and not caring who you end up. In the next section we will go over how you can become aware of how your choices are measuring up to your values, why and joy you want in this life. `


const activeLink = {
  border: 'none',
  backgroundColor: 'darkgreen',
  borderRadius: '0',
}

const articleGroup1 = {title: "Understanding Money", content: [content1, content2, content3, content4], quote: [quote1, quote2]}
const articleGroup2 = {title: "Track Your movement of money", content: [content1, content4], quote: [quote1]}
// const articleGroup3 = {title: "Start Small", content: [content1, content3, content4], quote: [quote1, quote2]}

export default function gettingStarted(props) {
  let message = articleGroup1

  let links = [{"id":1, "to":"/start/1", "name": "article1"}, {"id":2, "to":"/start/2", "name": "article2"}]

  let articleLinks = []
  let activeArticle = {}

  links.forEach((article) => {
    activeArticle = {}
    if(props.match.params.id === article.id.toString()){
      activeArticle = activeLink
    }
    articleLinks.push(<Link style={activeArticle} to={article.to}>{article.name}</Link>)
  })
  

  if(props.match.params.id){
    console.log("switching to new one")
      switch(props.match.params.id){
        case "2":
          message = articleGroup2
          break
        default:
          message = articleGroup1
      }
    }

  return (
    <section>
      {ArticleNav({"articleLinks": articleLinks})}
      {Article(message)}
    </section>
  )
}