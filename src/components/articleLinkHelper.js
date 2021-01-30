import React from 'react'
import { Link } from 'react-router-dom'

export default function articleLinkHelper(props, activeArticle, setActiveArticle){
    let articleLinks = []

    props.links.forEach((article) => {
       let activeStyle = ""
        if(activeArticle === article.id){
          activeStyle = "activeArticle"
        }
        articleLinks.push(getLink(article, activeStyle, setActiveArticle))
      })

    return(
        <React.Fragment>
            {articleLinks}
        </React.Fragment>
    )
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