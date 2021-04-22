import React from 'react'
import { Link } from 'react-router-dom'

export default function articleLinkHelper(props){
    // const [navLinks, setNavLinks] = useState([<li></li>])
    let articleLinks = []

    if(props?.articleNav){
      let stopPoint = props.lastArticle
      let startPoint = props.firstArticle

      if(props.firstArticle === props.lastArticle || stopPoint > props.articleNav.length)
      {
        stopPoint = props.articleNav.length
      }
      // let startAtActive = false

      // if(props.lastArticle -  props.firstArticle < props.articlesToDisplay){
      //   startPoint = 0
      //   stopPoint = props.articleNav.length
      //   startAtActive = true
      // }

      for(let i = startPoint; i < stopPoint; i++){
        // if(props.activeArticle == props.articleNav[i].slug)
        // {
        //   startAtActive = false
        // }
        // if(!startAtActive)
        // {
          let article = props.articleNav[i]
          let activeStyle = ""
          if(props.activeArticle === article.to){
            activeStyle = "activeArticle"
          }
          articleLinks.push(getLink(props.page, article, activeStyle, props.setActiveArticle))
        // }
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
                  to={page + article.to} >
                {article.name}
            </Link>
    )
}