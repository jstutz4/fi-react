import React from 'react'
import Article from '../components/article'


const content1 = `Why do we invest? Is it to made a quick buck, to support businesses that support our values, to make sure our retirement accounts are "full", or is investing something by the rich for the rich? Do you consider education has an investment? How much did money, or time did it require and how much time or money did your education give you in return. When considering the future a couple hundred or thousand dollar investment to learn new skills, or a degree or certificate if the return is high even for it to make sense to you. So when you think of investment don't just consider the stock market, real estate, and other commodities, but also education and marketable skills.`

const content2 = `The money we "invest" should be consider money we will not need till a future several years down the road. With a mindset of investing for the future short-term gains don't matter. This is why when the market drops we don't care because we know it is going to go back up, and we can wait. The most important key to investing is to understand why you invest in what you investing in, make a plan, execute the plan, and stick to your plan. Most loss of investing comes from emotional and psychological (fear) choices that are not inline with an a future minded investing plan. `

const quote1 = `Investing is not just the stock market or real estate but you! Future minded investing is investing in you.`


export default function invest() {
  return (
    <React.Fragment>
        {Article({title: "Future Minded Investing", content: [content1, content2], quote: [quote1]})}
    </React.Fragment>
  )
}