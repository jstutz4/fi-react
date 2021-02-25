import { useState } from 'react'
import Paragraph from '../components/admin_paragraph'
import Selector from '../components/admin_selector'

import gql from "graphql-tag";
import { useQuery } from '@apollo/react-hooks';

export default function Admin() {
    function sendArticle(event){
        console.log(event)
        const paragraphArray = document.getElementsByName("paragraph")
        console.log(paragraphArray)
        const quoteArray = document.getElementsByName("quote")
        console.log(quoteArray)
        const title = document.getElementById("title").value
        console.log(title)

    }
    
    const getPages = gql`
    query pages {
        pages{
        id,
        screenname
        }
    }
    `

    let getArticles = ``
    let getArticle = ``

    const [parNum, setParNum] = useState(2);
    const [quoteNum, setQuoteNum] = useState(1);

    let { data, loading, error}  = useQuery(getPages)

  

    // console.log(pageLoading)
    // console.log(articlesLoading)
    // console.log(articleLoading)
    // console.log(pageData)

    if(loading) {
        return (
            <section className="adminPageSize">
                <section className="groupSelect">
                    Data is Loading
                </section>
            </section>
        )
    }
    
    return(
        <section className="adminPageSize">
            <section className="groupSelect">
                {Selector({type: "pages", data: data})}

            </section>
            <input type="text" placeholder="Article title" maxLength="30" id="title"></input>

            {Paragraph({numParagraphs: 0, setPar: setParNum, setQuote: setQuoteNum, parNum, quoteNum, editable: true})}
            <button onClick={sendArticle}>Add Article</button>
        </section>
    )
    
    
}
