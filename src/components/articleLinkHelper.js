import React from 'react'
import { Link } from 'react-router-dom'
import {useState, useEffect} from 'react'

export default function articleLinkHelper(props, activeArticle, setActiveArticle, setLastArticle){
    // const [navLinks, setNavLinks] = useState([<li></li>])
    let articleLinks = []
    let navLength = 0
    // start = false;
    if(props && props.links){

      for(let i = props.firstArticle; i < props.lastArticle; i++){
        
        let article = props.links[i]
        let activeStyle = ""
          if(activeArticle === article.to){
            activeStyle = "activeArticle"
          }
          articleLinks.push(getLink(props.page, article, activeStyle, setActiveArticle))
      }

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