// each article will have its own id
const content1 = `What is money? What do you exchange your money for? What do you exchange for your money? Think about these questions before reading on..
The above questions may shed light on your why, that is why do you want money. Another way to ask this question is what would you do if didn't have to work? What do you do now when you don't have to work? You may not know what your life would look like if you didn't have to work and that is okay. One of the goals is to be able to answer this question.
`
const quote1 = `What would you do if you didn't have to work for money?`

const content2 = `To be able to compare or weigh activities, jobs, or destressors with each other we need a common measurement. What do you exchange for your money? TIME. Time is the one thing we cannot control and we never know when we will run out. If you view your choices as a value of time then you can begin to make informed judgments on your choices.`

const quote2 = `We exchange our TIME for money`

const content3 = `Another element that will help you understand what you want to do if you didn't work and money was not a problem is values. How can you know if the choices you are making are good and leading you to the future you will enjoy? Values, knowing what your values are and what they mean to you gives you a standard to move towards and a way to make informed judgments on your choices. It is okay if your values change over time, in fact I think we should strive to refine our values throughout our lives.`

const content4 = `This is your foundation your values and your why. When you have a strong sense of your foundation and the joy you get out of from the events of your life you can begin to take control of who you want to be, and not just letting the world taking control and not caring who you end up. In the next section we will go over how you can become aware of how your choices are measuring up to your values, why and joy you want in this life. `
const article1 =  {"text":[content1, content2, content3, content4], quote: [quote1, quote2]}
const article2 = {"text": [content1, content4], quote: [quote1]}
// for the getting started page
const articleNav = [{"to":"/start/1", "name": "article1"}, {"id":2, "to":"/start/2", "name": "article2"}]
const articleGroup1 = {title: "Understanding Money", content: article1}
const articleGroup2 = {title: "Track Your movement of money", content: article2}
const video = {"video": "https://www.youtube-nocookie.com/embed/qLk7yr3YP1Q?start=1", "name": "Intro video", 
               "files": [{"source": "../../public/files/trackMoney.xlsx", "text":"Track your expenses -Sample"}]}

const startArticle1 = {"id":1, "articleNav": articleNav, "video": video, articleGroup1 }
const startArticle2 = {"id":2, "articleNav": articleNav, "video": video, articleGroup2 }


//for the save page
let links = [{"id":11, "to":"/save/11", "name": "article1"}, {"id":12, "to":"/save/12", "name": "article2"}, {"id":13, "to":"/save/13", "name": "article3"}]
const articleGroup11 = {title: "What is Savings For", content: [content1, content2], quote: [quote1]}
const articleGroup12 = {title: "From Saving to Investing", content: [content2, content1], quote: []}
const articleGroup13 = {title: "Where to stash your savings", content: [content2, content1], quote: []}
const videoSave = null

const startArticle1 = {"id":11, "articleNav": links, "video": videoSave, articleGroup11 }
const startArticle2 = {"id":12, "articleNav": links, "video": videoSave, articleGroup12 }
const startArticle2 = {"id":13, "articleNav": links, "video": videoSave, articleGroup13 }


import React, { useState, useEffect } from 'react';

function Example() {
  const [article, setArticle] = useState(1);

  useEffect(() => {
    // go fetch next article? 
    
  });

  return (
    <React.Fragment></React.Fragment>
  );
}