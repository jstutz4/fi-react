import React, { useState, useEffect } from 'react';
import Article from '../components/article'
import ArticleNav from '../components/articleNav'
import articleLinkHelper from '../components/articleLinkHelper'



const content1 = `What is savings and why do you save? Savings provide protection and security for ourselves today and the short term future. When I say savings I am talking about the money in your bank accounts but also your emergency fund which may not be in your bank. When we have taken control of our lifestyle and have money in our hands instead of the hands of consumer debt we have choices. We should have a small buffer maybe one or two months of expenses in our accounts and maybe in a high yield savings account that will keep up with inflation 2-3% APR. Continue to grow your savings or emergency fund till you feel safe and protected (you wouldn't be feeling fear controlling you) if you were to loose your job today. For most people that looks like have 6-12 months of expenses, others it may be only 1-3 months of expenses.`

const quote1 = `Savings provide protection and security even if you loose your job.`

const content2 = `If you are like me and that feel like its not the best to be holding onto 20-50K in emergency fund in bank accounts, well you do have other options. I would encourage you to diversify your savings especially as you feel more confident in you and your families ability to receive an income even after a job loss, to begin to put money towards investing like bonds, treasuries, gold, and stock market index funds. This extension of an emergency fund can be held in a taxable brokage account or ROTH IRA account. `


const articleNav = [{"id":13, "to": "/save/13", "name": "article1"}, {"id":14, "to": "/save/14", "name": "article2"}, {"id":15, "to": "/save/15", "name": "article3"}]

const saveArticles = {13: {"video": null,
                            "articleTitle": "What is Savings For",
                            "content":[content1, content2], 
                            "quote": [quote1]
                          },
                      14: {"video": "", 
                          "articleTitle": "Where to stash your savings",
                          "content":[content2, content1], 
                          "quote": []
                        },
                      15: {"video": "", 
                          "articleTitle": "From Saving to Investing",
                          "content":[content1, content1], 
                          "quote": [quote1]
                        },
                          
                       }

export default function Start(props) {
  const defaultID = Object.keys(saveArticles)[0]
  const [activeArticle, setActiveArticle] = useState(defaultID);


  // useEffect(() => {
  //   // go fetch next article? 
    
  // });

  return (
    <section>
      <ArticleNav>
        {articleLinkHelper({"links": articleNav}, activeArticle, setActiveArticle)}
      </ArticleNav>
      {Article(saveArticles[activeArticle])}
    </section>
  );
}