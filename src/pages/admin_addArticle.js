import { useState, useEffect } from 'react'
import Article from '../components/admin_paragraph'
import Selector from '../components/admin_selector'

import gql from "graphql-tag";
// needs to be from react-hooks any other location causes errors
import { useQuery, useMutation } from '@apollo/react-hooks';

export default function Admin() {
    async function sendArticle (event){
        const paragraphs = document.getElementsByName("paragraph")
        //get by name returns a node list so we use Array.from to make an array
        const paragraphArray = Array.from(paragraphs).map(paragraph => paragraph.value)
        const quotes = document.getElementsByName("quote")
        const quoteArray = Array.from(quotes).map(quote => quote.value)
        const title = document.getElementById("title").value
        const pageId = document.getElementsByName("pages")[0].value

        callAddArticle({variables: {pageId, title, paragraphArray, quoteArray}})
        // setReset(true)
    }

    const addArticle = gql`
    mutation addArticle($pageId: ID!, $title: String!, $paragraphArray: [String]!, $quoteArray: [String]) {
        setArticle(
            pageId: $pageId,
            articletitle: $title,
            contents: $paragraphArray,
            quotes: $quoteArray
        )
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

    let { data, loading, error}  = useQuery(getPages)
    

  

    // console.log(pageLoading)
    // console.log(articlesLoading)
    // console.log(articleLoading)
    // console.log(pageData)
    
    return(
        <section className="adminPageSize">
            <section className="groupSelect">
                {Selector({type: "pages", data: data, reset, setReset})}

            </section>
            <input type="text" placeholder="Article title" maxLength="30" id="title"></input>

            {Article({reset, setReset})}
            <button onClick={sendArticle}>Add Article</button>
        </section>
    )
    
    
}
