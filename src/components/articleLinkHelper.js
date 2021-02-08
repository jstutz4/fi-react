import React from 'react'
import { Link } from 'react-router-dom'

export default function articleLinkHelper(props, activeArticle, setActiveArticle){
    let articleLinks = []
    let navLength = 0
    // start = false;
    if(props && props.links){
      props.links.forEach((article, index) => {
        let activeStyle = ""
          if(activeArticle === article.id){
            activeStyle = "activeArticle"
          }
          console.log(navLength)
          if(navLength + article.name.length < 34){
            console.log("adding article")
            navLength += article.name.length
            articleLinks.push(getLink(article, activeStyle, setActiveArticle))
          }
        })

      return(
          <React.Fragment>
              {articleLinks}
          </React.Fragment>
      )
    }
}

function getLink(article, activeStyle, setActiveArticle){
    return(
            <Link key={article.name} 
                  className={activeStyle}
                  to={article.to} 
                  onClick={() => setActiveArticle(article.id)}>
                {article.name}
            </Link>
    )
}