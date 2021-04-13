import React, {useEffect, useState} from 'react'
import sanityClient from '../client.js'
import pageQuery from '../sanity/page.js'

import MainContent from '../components/main'

export default function ArticlePage(props) {
console.log(props)

    const [pageData, setPageData] = useState(null)
    const [activeArticle, setActiveArticle] = useState(null)

    const [firstArticle, setFirstArticle] = useState(0)
    const [lastArticle, setLastArticle] = useState(null)
    const pageName = props.match.url.split('/')
    const params = {page: pageName[1]}

    useEffect(()=>{
            let calNum = ((document.querySelector(".articleNav ul")?.clientWidth)-60)/100
            let articlesToDisplay = Math.floor( calNum && calNum <= pageData?.[0]?.nav?.length ? calNum : pageData?.[0]?.nav?.length )
            setLastArticle(articlesToDisplay)          
        }, [pageData])

    useEffect(() =>{
        sanityClient.fetch(pageQuery, params)
          .then((data) => setPageData(data))
          .catch(console.error)
      }, [props.location.pathname])

      console.log(pageData)
    if(!pageData || pageData.length <= 0 || !pageData[0].articles)
    {
        return (
            <React.Fragment>
                <h1> { !pageData ? "loading..." : "bad request contact web admin"} </h1>
            </React.Fragment>
        )
    }

    const urlID = props.match.params.id

    console.log(urlID)
    if(!urlID && !activeArticle){
        setActiveArticle(pageData[0]?.articles?.[0].slug)
    }
  
    const articleNav = pageData[0]?.nav
    const page = `/${pageData[0]?.name}/`
    const article = pageData[0]?.articles?.filter(art => art.slug == activeArticle)[0]
    
    console.log(article)
    return (
      <React.Fragment>
        {MainContent({page, articleNav,article, activeArticle, setActiveArticle, firstArticle, lastArticle, setFirstArticle, setLastArticle})}
      </React.Fragment>
    )

} 