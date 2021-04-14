import React, {useEffect, useState} from 'react'
import sanityClient from '../client.js'
import pageQuery from '../sanity/page.js'

import MainContent from '../components/main'

export default function ArticlePage(props) {

    const [pageData, setPageData] = useState(null)

    const [firstArticle, setFirstArticle] = useState(0)
    const [lastArticle, setLastArticle] = useState(null)
    
    useEffect(()=>{
            let calNum = ((document.querySelector(".articleNav ul")?.clientWidth)-60)/100
            let articlesToDisplay = Math.floor( calNum && calNum <= pageData?.[0]?.nav?.length ? calNum : pageData?.[0]?.nav?.length )
            setLastArticle(articlesToDisplay)          
        }, [pageData])

    useEffect(() =>{
        sanityClient.fetch(pageQuery, {page: props.match.url.split('/')[1]})
          .then((data) => setPageData(data))
          .catch(console.error)
      }, [props.match.url])

    if(!pageData || pageData.length <= 0 || !pageData[0].articles)
    {
        return (
            <React.Fragment>
                <h1> { !pageData ? "loading..." : "bad request contact web admin"} </h1>
            </React.Fragment>
        )
    }

    const urlID = props.match.params.id || pageData[0]?.articles?.[0].slug

    const articleNav = pageData[0]?.nav
    const page = `/${pageData[0]?.name}/`
    const article = pageData[0]?.articles?.filter(art => art.slug === urlID)[0]
    
    return (
      <React.Fragment>
        {MainContent({page, articleNav,article, activeArticle: urlID, firstArticle, lastArticle, setFirstArticle, setLastArticle})}
      </React.Fragment>
    )

} 