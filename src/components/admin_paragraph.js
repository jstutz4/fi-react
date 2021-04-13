import React, { useEffect, useState } from 'react';
import Paragraph from './admin_quote'
import gql from "graphql-tag";
import {useMutation} from '@apollo/react-hooks'
import { isNonEmptyArray } from '@apollo/client/utilities';

export default function Article(props){

    // let { data, loading, error }  = useQuery(props.query);
    const [parNum, setParNum] = useState(1);
    //const [quoteNum, setQuoteNum] = useState(0); // since we dont start with a quote
    const emptyParContainer = Paragraph({type:"paragraph", id: parNum, size:5000, editable: true})
    const [parGroup, setParGroup] = useState([emptyParContainer])
    const [articleData, setArticleData] = useState(props.data)
    const[problem, setProblem] = useState("")

    const updateArticle = gql`
    mutation updateArticle($content: UpdateContent) {
        updateArticle(content: $content)
      }`

     const [callUpdateArticle] = useMutation(updateArticle)

let isEditable = true
if(props?.editable != undefined)
    isEditable = props.editable
    
    function addParagraph(item) {
        const newParNum = parNum + 1
        setParNum(newParNum)
        setParGroup(oldArray => [...oldArray, Paragraph({type:"paragraph", id: newParNum, size:5000, editable: isEditable, callUpdateArticle})])
    }

    function addQuote(item) {
        // const newQuoteNum = quoteNum + 1
        // setQuoteNum(newQuoteNum)
        setParGroup(oldArray => [...oldArray, Paragraph({type:"quote", id: parNum, size:200, editable: isEditable, callUpdateArticle})])
    }


    if(props.data != articleData)
    {
        setArticleData(props.data)
    }

    useEffect(() => {
        if(props?.data?.article?.contents){
            let paragraphs = []

            paragraphs = props.data.article.contents.map((par, index) => {
                let dataParIdentifier = par.substring(Math.floor(par.length/7), Math.floor(par.length/2)).trim().substring(0,99)

                const id = `${index+1}`
                let quote = props.data.article.quotes[index] ? Paragraph({content:props.data.article.quotes[index], type:"quote", id: index, size: 200, dataAttribute: props.data.article.quotes[index], callUpdateArticle}) : null
                
                return (
                    <React.Fragment key={id+"quote"+index}>
                    {Paragraph({content: par, id, type:"paragraph", size: 5000, dataAttribute:dataParIdentifier, callUpdateArticle})}
                    {quote}
                </React.Fragment>
                )
            })

            setParGroup(() =>[...paragraphs])
        }
    }, [articleData]);


    return (
    <section className="parDisplay">
        {parGroup}
        <section className="groupSelect">
        <button onClick={addParagraph}>+ Paragraph</button>
        <button onClick={addQuote}>+ Quote</button>
        </section>
    </section>
    )
}