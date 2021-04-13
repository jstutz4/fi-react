import {useState, useEffect} from 'react'

import Article from '../components/article'
import ArticleNav from '../components/articleNav'
import articleLinkHelper from '../components/articleLinkHelper'

export default function Main(props){

    let calNum = ((document.querySelector(".articleNav ul")?.clientWidth)-60)/100
    let articlesToDisplay = Math.floor( calNum && calNum <= props?.articleNav?.length ? calNum : props?.articleNav?.length )

    

    if(!articlesToDisplay){
        return (
            <section>
                <ArticleNav></ArticleNav>
            </section>
        )
    }

    return(
        <section className="article">
        <ArticleNav data={{...props, articlesToDisplay}}>
            {articleLinkHelper({...props})}
        </ArticleNav>
        {Article(props.article)}
        </section>
    )
}