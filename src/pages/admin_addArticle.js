import { useState, useEffect } from 'react'
import Article from '../components/admin_paragraph'
import Selector from '../components/admin_selector'

import gql from "graphql-tag";
// needs to be from react-hooks any other location causes errors
import { useQuery, useMutation } from '@apollo/react-hooks';

export default function AdminArticle() {
    async function sendArticle (event){
        // const paragraphs = document.getElementsByName("article")
        // //get by name returns a node list so we use Array.from to make an array
        // const paragraphArray = Array.from(paragraphs).reduce(function(result, element){
        //     if(element.value != ""){
        //         result.push(element.value)
        //     }
        //     return result
        // }, [])
        // const quotes = document.getElementsByName("quote")
        // const quoteArray = Array.from(quotes)
        // let quotesArray = []
        // let quoteIndex = 0
        // for(let i = 1; i <= paragraphArray.length; i++){
        //     if(i == Number(quoteArray[quoteIndex].id.substring(5))){
        //         quotesArray.push(quoteArray[quoteIndex].value)
        //         quoteIndex++
        //     }
        //     else {
        //         quotesArray.push("")
        //     }
        // }
      
        let article = document.getElementsByName('article')
        let {
            paragraph,
            quote
        } = Array.from(article).reduce(function (article, item) {
            if (item.value != "") {
                if (item.classList[0] == "paragraph") {
                    article.paragraph.push(item.value)
                    article.parCount++
                    console.log("add par")
                }
                console.log((Number(item.id.substring(5))) + " : " + article.quoteIndex)
                if(Number(item.id.substring(5)) != NaN){
                    while(article.parCount > article.quoteIndex){
                        console.log("add empty quote")
                        article.quote.push("")
                        article.quoteIndex++
                    }
                }
                if (Number(item.id.substring(5)) === article.quoteIndex) {
                    console.log("add true quote")
                    article.quote.push(item.value)
                    article.quoteIndex++
                }

            } else {
                console.log("what are you doing?")
                article.quoteIndex ++
            }
            return article

        }, {
            paragraph: [],
            quote: [],
            quoteIndex: 1,
            parCount: 0
        })

        const articletitle = document.getElementById("title").value
        const screenName = document.getElementsByName("pages")[0].value

        console.log(screenName)
        console.log(articletitle)
        console.log(paragraph)
        console.log(quote)

        const wholeArticle = {page:{screenname:screenName}, article: {articletitle, contents:paragraph, quotes: quote}}
        // const wholeArticle = {page: {screenname:screenName}, article: "see this works"}


        console.log(wholeArticle)
        callAddArticle({variables: {wholeArticle}})
    }

    const addArticle = gql`
    mutation addArticle($wholeArticle: ArticleInput) {
        setArticle(article: $wholeArticle)
      }`

     const [callAddArticle] = useMutation(addArticle)
    
    const getPages = gql`
    query pages {
        pages{
        id,
        screenname
        }
    }
    `

    const [reset, setReset] = useState(false);

    // useEffect(() => {
    //     setReset(false)
    //   }, []);

    // let { data, loading, error}  = useQuery(getPages)
    

  

    // console.log(pageLoading)
    // console.log(articlesLoading)
    // console.log(articleLoading)
    // console.log(pageData)
    
    return(
        <section className="adminPageSize">
            {/* <section className="groupSelect">
                {/* {Selector({type: "pages", data: data, reset, setReset})} }

            </section> */}
            <input type="text" placeholder="Article title" maxLength="30" id="title"></input>

            {Article({reset, setReset})}
            <button onClick={sendArticle}>Add Article</button>
        </section>
    )
    
    
}
