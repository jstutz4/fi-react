import React from 'react'
import { Link } from 'react-router-dom'

export default function articleLinkHelper(props, activeArticle, setActiveArticle){
    let articleLinks = []
    let navLength = 0
    // start = false;
    console.log(props)
    if(props && props.links){
      props.links.forEach((article, index) => {
        let activeStyle = ""
          if(activeArticle === article.id){
            activeStyle = "activeArticle"
          }
          console.log(navLength)
          // if(navLength + article.name.length < 34){
            console.log("adding article")
            navLength += article.name.length
            articleLinks.push(getLink(props.page, article, activeStyle, setActiveArticle))
          // }
        })

      return(
          <React.Fragment>
              {articleLinks}
          </React.Fragment>
      )
    }
}

function getLink(page, article, activeStyle, setActiveArticle){
    return(
            <Link key={article.name} 
                  className={activeStyle}
                  to={page + article.to} 
                  onClick={() => setActiveArticle(article.id)}>
                {article.name}
            </Link>
    )
}