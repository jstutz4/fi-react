import React from 'react'
import Article from '../components/article'

const content1 = `One of my first memories with many was about saving. When I was growing up I have a paper route. Each month when the pay check came my mother explained that I didn't have many expenses so she encouraged me to save 80% of what I earned each month.`

const quote1 = `From a young age I was taught to Save.`

const content2 = `In college I have a had a significate about of money just sitting in a bank and thought how can I start investing? I discovered podcasts and started listening to 'millennial investing' and 'choose FI'. Through these podcast I was introduced to a variety of ideas and eventually read 'The Simple Path to Wealth' and 'Your money or Your Life'. The one question I kept asking is how can we start combining ideas together and what effect will that have when comparing different financial independence ideas?`

const quote2 = `I kept asking, How can we compare different ideas as a groups instead of individual tactics?`

const content3 = `I hope me sharing my thoughts and ideas will give you the jump start in to financial independence (FI) you need.`

const title = "My Why"
export default function about() {
  return (
    <section>
        {Article({title: title, content: [content1, content2, content3], quote: [quote1, quote2] })}
    </section>
  );
}