import React from 'react'
import Article from '../components/article'
import ArticleNav from '../components/articleNav'
import { Link } from 'react-router-dom'



const content1 = `What is savings and why do you save? Savings provide protection and security for ourselves today and the short term future. When I say savings I am talking about the money in your bank accounts but also your emergency fund which may not be in your bank. When we have taken control of our lifestyle and have money in our hands instead of the hands of consumer debt we have choices. We should have a small buffer maybe one or two months of expenses in our accounts and maybe in a high yield savings account that will keep up with inflation 2-3% APR. Continue to grow your savings or emergency fund till you feel safe and protected (you wouldn't be feeling fear controlling you) if you were to loose your job today. For most people that looks like have 6-12 months of expenses, others it may be only 1-3 months of expenses.`

const quote1 = `Savings provide protection and security even if you loose your job.`

const content2 = `If you are like me and that feel like its not the best to be holding onto 20-50K in emergency fund in bank accounts, well you do have other options. I would encourage you to diversify your savings especially as you feel more confident in you and your families ability to receive an income even after a job loss, to begin to put money towards investing like bonds, treasuries, gold, and stock market index funds. This extension of an emergency fund can be held in a taxable brokage account or ROTH IRA account. `


const articleGroup1 = {title: "What is Savings For", content: [content1, content2], quote: [quote1]}

const articleGroup2 = {title: "From Saving to Investing", content: [content2, content1], quote: []}
const articleGroup3 = {title: "Where to stash your savings", content: [content2, content1], quote: []}

const activeLink = {
  border: 'none',
  backgroundColor: 'darkgreen',
  borderRadius: '0',
}

export default function save(props) {
  console.log(props.match)
  console.log(props.location)
  let message = articleGroup1
  console.log("keep old one")
  let links = [{"id":1, "to":"/save/1", "name": "article1"}, {"id":2, "to":"/save/2", "name": "article2"}, {"id":3, "to":"/save/3", "name": "article3"}]

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
        case "3":
          message = articleGroup3
          break
        case "2":
          message = articleGroup2
          break
        default:
          message = articleGroup1
      }
    }

  return (
    <section>
        {ArticleNav({"articleLinks":articleLinks})}
        {Article(message)}
    </section>
  )
}