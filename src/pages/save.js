import React from 'react'
import Article from '../components/article'


const content1 = `What is savings and why do you save? Savings provide protection and security for ourselves today and the short term future. When I say savings I am talking about the money in your bank accounts but also your emergency fund which may not be in your bank. When we have taken control of our lifestyle and have money in our hands instead of the hands of consumer debt we have choices. We should have a small buffer maybe one or two months of expenses in our accounts and maybe in a high yield savings account that will keep up with inflation 2-3% APR. Continue to grow your savings or emergency fund till you feel safe and protected (you wouldn't be feeling fear controlling you) if you were to loose your job today. For most people that looks like have 6-12 months of expenses, others it may be only 1-3 months of expenses.`

const quote1 = `Savings provide protection and security even if you loose your job.`

const content2 = `If you are like me and that feel like its not the best to be holding onto 20-50K in emergency fund in bank accounts, well you do have other options. I would encourage you to diversify your savings especially as you feel more confident in you and your families ability to receive an income even after a job loss, to begin to put money towards investing like bonds, treasuries, gold, and stock market index funds. This extension of an emergency fund can be held in a taxable brokage account or ROTH IRA account. `

export default function save() {
  return (
    <React.Fragment>
        {Article({title: "What is Savings For", content: [content1, content2], quote: [quote1]})}
    </React.Fragment>
  )
}