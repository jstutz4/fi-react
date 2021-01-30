import React, { useState, useEffect } from 'react';
import Article from '../components/article'
import ArticleNav from '../components/articleNav'
import articleLinkHelper from '../components/articleLinkHelper'

// each article will have its own id
const content1 = `What is money? What do you exchange your money for? What do you exchange for your money? Think about these questions before reading on..
The above questions may shed light on your why, that is why do you want money. Another way to ask this question is what would you do if didn't have to work? What do you do now when you don't have to work? You may not know what your life would look like if you didn't have to work and that is okay. One of the goals is to be able to answer this question.
`
const quote1 = `What would you do if you didn't have to work for money?`

const content2 = `To be able to compare or weigh activities, jobs, or destressors with each other we need a common measurement. What do you exchange for your money? TIME. Time is the one thing we cannot control and we never know when we will run out. If you view your choices as a value of time then you can begin to make informed judgments on your choices.`

const quote2 = `We exchange our TIME for money`

const content3 = `Another element that will help you understand what you want to do if you didn't work and money was not a problem is values. How can you know if the choices you are making are good and leading you to the future you will enjoy? Values, knowing what your values are and what they mean to you gives you a standard to move towards and a way to make informed judgments on your choices. It is okay if your values change over time, in fact I think we should strive to refine our values throughout our lives.`

const content4 = `This is your foundation your values and your why. When you have a strong sense of your foundation and the joy you get out of from the events of your life you can begin to take control of who you want to be, and not just letting the world taking control and not caring who you end up. In the next section we will go over how you can become aware of how your choices are measuring up to your values, why and joy you want in this life. `

// for the getting started page
const articleNav = [{"id":1, "to":"/start/1", "name": "article1"}, {"id":2, "to":"/start/2", "name": "article2"}]

const startArticles = {1: {"video": "https://www.youtube-nocookie.com/embed/qLk7yr3YP1Q?start=1", 
                            "videoTitle": "Intro video", 
                            "files": [{"source": "/fi-react/files/trackMoney.xlsx", "text":"Track your expenses -Sample"}],
                            "articleTitle": "Understanding Money",
                            "content":[content1, content2, content3, content4], 
                            "quote": [quote1, quote2]
                          },
                       2: {"video": "", 
                          "articleTitle": "You and money",
                          "content":[content2, content3, content4], 
                          "quote": []
                        },
                          
                       }
 

export default function Start(props) {
  const defaultID = Object.keys(startArticles)[0]
  const [activeArticle, setActiveArticle] = useState(defaultID);


  // useEffect(() => {
  //   // go fetch next article? 
    
  // });

  return (
    <section>
      <ArticleNav>
        {articleLinkHelper({"links": articleNav}, activeArticle, setActiveArticle)}
      </ArticleNav>
      {Article(startArticles[activeArticle])}
    </section>
  );
}