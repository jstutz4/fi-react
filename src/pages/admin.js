import React, { useState } from 'react'
import Paragraph from '../components/admin_paragraph'
import Selector from '../components/admin_selector'
import addArticle from './admin_addArticle'
import addVideo from './admin_addVideo'

import gql from "graphql-tag";
import { useQuery } from '@apollo/react-hooks';

export default function Admin(props) {

    if(props.location.pathname.includes("add")){
        return addArticle()
    }
    const getPages = gql`
    query pages {
        pages{
        id,
        screenname
        }
    }
    `
    let getArticlesInit = gql`
    query articles {
        articles(screenname: "start", admin: true){
        id,
        articletitle,
        }
    }
    `
    let getArticleInit = gql`
        query getArticle {
            article(id:1) {
            id
            articletitle
            contents
            quotes
            }
        }
    `
    let getArticles = ``
    let getArticle = ``

    const [page, setPage] = useState({name:"start", id:-1, change: "pages"})
    const [article, setArticle] = useState({name:"Random", id:1, change:""})
    const [articlesQuery, setArticlesQuery] = useState(getArticlesInit)
    const [articleQuery, setArticleQuery] = useState(getArticleInit)
    const [formQuestion, setFormQuestion] = useState("")

    let { data : pageData, loading:pageLoading, error:pageError}  = useQuery(getPages)
    let { data: articlesData, loading:articlesLoading, error:articlesError }  = useQuery(articlesQuery);
    let { data: articleData, articleLoading, error:articleError }  = useQuery(articleQuery);
  



    if(!articlesLoading && articlesData && articlesData.articles.length > 0){
        getArticles = gql`
        query articles {
            articles(screenname: "${page.name}", admin: true){
            id,
            articletitle,
            }
        }
        `
        if(articlesData.articles.length > 0 && article.name != articlesData.articles[0].articletitle 
            && (page.change == "pages" && article.change == "")){
            setArticle({name:articlesData.articles[0].articletitle, id: articlesData.articles[0].id, change: ""})
        }

        if(articlesQuery != getArticles){
            setArticlesQuery(getArticles)
            const newArticle = article
            newArticle.change = ""
        }
        


    }

    if(!articleLoading && articleData){
        getArticle = gql`
            query getArticle {
                article(id:${article.id}) {
                id
                articletitle
                contents
                quotes
                }
            }
            `
       
        if(articleQuery != getArticle ){
            setArticleQuery(getArticle)
        }
    }
    let body;
    if(props.location.pathname.includes("video")){
        if(formQuestion === "")
        {
            setFormQuestion("Select article to add video ")
        }
        body = addVideo()

    }
    else {
        body = (<React.Fragment>
            <h2>{article.name ? article.name : "unknown title"}</h2>
                {Paragraph({data: articleData})}
           </React.Fragment>)
    }
    
    return(
        <section className="adminPageSize">
            {formQuestion}
            <section className="groupSelect">
                {Selector({type: "pages", setFunc: setPage, setArticle: setArticle, article:article, data: pageData})}

                {Selector({type: "articles", setFunc: setArticle, data: articlesData})}

            </section>
            {body}
        </section>
    )
    
    if(pageData && articlesData){
        return (
            <section className="adminPageSize">
                <section className="groupSelect">
                    {Selector({type: "pages", query: getPages, setFunc: setPage, setArticle: setArticle, article:article, data: pageData})}
    
                    {Selector({type: "articles", query: getArticles, setFunc: setArticle, data: articlesData})}
    
                </section>
                <h2>{article.name}</h2>
            </section>
        )
    }

    if (pageData){
        return(
        <section className="adminPageSize">
            <section className="groupSelect">
                {Selector({type: "pages", query: getPages, setFunc: setPage, setArticle: setArticle, article:article, data: pageData})}    
            </section>
        </section>
        )
    }

    return(
        <section>we have a problem</section>
    )
}
