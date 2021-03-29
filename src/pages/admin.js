import React, { useState } from 'react'
import Paragraph from '../components/admin_paragraph'
import Selector from '../components/admin_selector'
import addArticle from './admin_addArticle'
import addVideo from './admin_addVideo'

import gql from "graphql-tag";
import { useQuery, useMutation } from '@apollo/react-hooks';

export default function Admin(props) {

    function editTitle(e)
    {
        e.target.nextElementSibling.classList.toggle("hidden")
        let title = e.target.parentElement.previousElementSibling.previousElementSibling.textContent
        e.target.parentElement.previousElementSibling.value = title
        
        // gets the hidden input
        e.target.parentElement.previousElementSibling.classList.toggle("hidden")

        //gets the h2 title
        e.target.parentElement.previousElementSibling.previousElementSibling.classList.toggle("hidden")

    }

    function updateTitle(e)
    {
        // hid update button
        e.target.classList.toggle("hidden")

        // get article id

        let articleId = document.getElementsByName("articles")[0].value


        let title = e.target.parentElement.previousElementSibling.value
        e.target.parentElement.previousElementSibling.previousElementSibling.textContent = title
        // setArticle({...article, name:title})

         // gets the hidden input
         e.target.parentElement.previousElementSibling.classList.toggle("hidden")

         //gets the h2 title
         e.target.parentElement.previousElementSibling.previousElementSibling.classList.toggle("hidden")

         callUpdateTitle({variables: {content:{title, articleId}}})

         refetch()

         // set change to "" so it will update?
         let updateArticleTitle = {...article, change:""}

         setArticle(updateArticleTitle)
         // article is still not being updated but also is not the one trigging a re-render
    }

    function deleteArticle(e) {
        let articleId = document.getElementsByName("articles")[0].value
        let articletitle = e.target.nextElementSibling.textContent


        callRemoveArticle({variables: {article: {id:articleId, articletitle}}})

        refetch()

        let updateArticleTitle = {...article, change:""}

        if(articlesData.articles.length > 1)
        {
            setArticle(updateArticleTitle)
        }
    }

    // if(props.location.pathname.includes("add")){
    //     return addArticle()
    // }
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

    const updateArticle = gql`
    mutation updateTitle($content: inputTitle) {
        updateTitle(content: $content)
      }`

    const removeArticle = gql`
    mutation removeArticle($article: MyArticle) {
        removeArticle(article: $article)
    }`

     const [callUpdateTitle] = useMutation(updateArticle)
     const [callRemoveArticle] = useMutation(removeArticle)

    let { data : pageData, loading:pageLoading, error:pageError}  = useQuery(getPages)
    let { data: articlesData, loading:articlesLoading, error:articlesError, refetch  }  = useQuery(articlesQuery);
    let { data: articleData, articleLoading, error:articleError }  = useQuery(articleQuery);
  



    if(!articlesLoading && articlesData){
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
        else if (articlesData.articles.length == 0)
        {
            // setArticle({name:"add Article", id: -1, change: ""})
        }


        if(articlesQuery != getArticles && articlesData?.articles){
            setArticlesQuery(getArticles)
            const newArticle = article
            newArticle.change = ""
        }
        


    }

    if(!articleLoading && articleData){

        if(!articlesData?.articles?.[0])
        {
            const newArticle = article
            newArticle.id = -1
            newArticle.name = "add new article"
        }

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
    let articleSelector;

    if(props.location.pathname.includes("video")){
        if(formQuestion === "")
        {
            setFormQuestion("Select article to add video ")
        }
        body = addVideo()
        articleSelector = (<React.Fragment>{Selector({type: "articles", setFunc: setArticle, data: [articlesData]})}</React.Fragment>)


    }
    else if(props.location.pathname.includes("add")){
        body = addArticle()
        articleSelector = ""
    }
    else {

        let inputClasses = "deleteInput"
        if(!articlesData?.articles?.[0])
        {
            inputClasses = "deleteInput hidden"
        }
        body = (<React.Fragment>
            <button className={inputClasses} onClick={deleteArticle}>Delete Entire Article</button>
            <h2>{article.name ? article.name : "unknown title"}</h2>
            <input type="text" defaultValue={article.name} className="hidden"></input>
            <section className="groupSelect">
                <button onClick={editTitle}>Edit Title</button>
                <button onClick={updateTitle} className="hidden">Update Title</button>
            </section>
                {Paragraph({data: articleData})}
           </React.Fragment>)

    articleSelector = (<React.Fragment>{Selector({type: "articles", setFunc: setArticle, data: [articlesData]})}</React.Fragment>)
    }
    
    return(
        <section className="adminPageSize">
            {formQuestion}
            <section className="groupSelect">
                {Selector({type: "pages", setFunc: setPage, setArticle: setArticle, article:article, data: pageData})}

                {articleSelector}

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
