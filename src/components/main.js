import {useState, useEffect} from 'react'

import Article from '../components/article'
import ArticleNav from '../components/articleNav'
import articleLinkHelper from '../components/articleLinkHelper'

export default function Main(props, page, articleNav, article, activeArticle, setActiveArticle){
    let calNum = ((document.querySelector(".articleNav ul")?.clientWidth)-60)/100
    let articlesToDisplay = Math.floor( calNum && calNum <= articleNav.length ? calNum : articleNav.length )

    const [firstArticle, setFirstArticle] = useState(0)
    const [lastArticle, setLastArticle] = useState(articlesToDisplay)

    useEffect(()=>{
        let calNum = ((document.querySelector(".articleNav ul")?.clientWidth)-60)/100
        let articlesToDisplay = Math.floor( calNum && calNum <= articleNav.length ? calNum : articleNav.length )
        setLastArticle(articlesToDisplay)
          
        }, [])

    return(
        <section className="article">
        <ArticleNav data={{articleNav, firstArticle, lastArticle, articlesToDisplay, setFirstArticle, setLastArticle}}>
            {articleLinkHelper({"links": articleNav, page, firstArticle, lastArticle, articlesToDisplay}, activeArticle, setActiveArticle, setLastArticle)}
        </ArticleNav>
        {Article(article)}
        </section>
    )
}