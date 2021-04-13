import React from 'react'
import { Link } from 'react-router-dom'

export default function articleLinkHelper(props){
    // const [navLinks, setNavLinks] = useState([<li></li>])
    let articleLinks = []
    let navLength = 0
    // start = false;
    if(props?.articleNav){

      for(let i = props.firstArticle; i < props.lastArticle; i++){
        
        let article = props.articleNav[i]
        let activeStyle = ""
          if(props.activeArticle === article.to){
            activeStyle = "activeArticle"
          }
          articleLinks.push(getLink(props.page, article, activeStyle, props.setActiveArticle))
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
                  onClick={() => setActiveArticle(article.to)}>
                {article.name}
            </Link>
    )
}