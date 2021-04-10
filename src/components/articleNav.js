import React from 'react'

export default function articleNav(props, setFirstArticle, setLastArticle) {
    function getPrevArticle(e){

        if(!e.target.classList.contains("arrowDisabled")){
            const numArticles = props.data.articleNav.length
            const lastIndex = props.data.lastArticle
            const startIndex = props.data.firstArticle
            const ArticlesInView = props.data.articlesToDisplay

            let random = document.getElementsByClassName("linksLength")[0].childElementCount 
             

            // more articles to view
            if (startIndex >= ArticlesInView ){
                // props.data.setFirstArticle(lastIndex - ArticlesInView)

                // props.data.setLastArticle(lastIndex - random  <= numArticles ? lastIndex - random: ArticlesInView )

                props.data.setFirstArticle(startIndex - ArticlesInView)

                props.data.setLastArticle(lastIndex - random <= startIndex ? lastIndex - random : ArticlesInView  )
            }
            
        }
    }

    function getNextArticle(e){
        if(!e.target.classList.contains("arrowDisabled")){
            const numArticles = props.data.articleNav.length
            const lastIndex = props.data.lastArticle
            const startIndex = props.data.firstArticle
            const ArticlesInView = props.data.articlesToDisplay


            // more articles to view
            if (numArticles > lastIndex ){

                props.data.setFirstArticle(startIndex + ArticlesInView)

                props.data.setLastArticle(lastIndex + ArticlesInView <= numArticles ? lastIndex + ArticlesInView : numArticles )
            }
            
        }

    }
    
    let leftArrowClasses = "leftArrow"
    let RightArrowClasses = "rightArrow"

    if(props.data.firstArticle <= 0){
        leftArrowClasses = "leftArrow arrowDisabled"
    }

    if(props.data.articleNav.length <= props.data.lastArticle){
        RightArrowClasses = "rightArrow arrowDisabled"
    }

    return (
        <nav className="articleNav">
            <ul>
                <span className={leftArrowClasses} onClick={getPrevArticle}>&#10148;</span>
                <li className="linksLength">
                    {props.children}
                </li>
                <span className={RightArrowClasses} onClick={getNextArticle}>&#10148;</span>
            </ul>
        </nav>
    )
}