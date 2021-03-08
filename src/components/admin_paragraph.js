import React, { useEffect, useState } from 'react';
import Paragraph from './admin_quote'

export default function Article(props){

    // let { data, loading, error }  = useQuery(props.query);
    const [parNum, setParNum] = useState(1);
    //const [quoteNum, setQuoteNum] = useState(0); // since we dont start with a quote
    const emptyParContainer = Paragraph({type:"paragraph", id: parNum, size:1000, editable: true})
    const [parGroup, setParGroup] = useState([emptyParContainer])
    const [articleData, setArticleData] = useState([props.data])

    function addParagraph(item) {
        const newParNum = parNum + 1
        setParNum(newParNum)
        setParGroup(oldArray => [...oldArray, Paragraph({type:"paragraph", id: newParNum, size:1000, editable: true})])
    }

    function addQuote(item) {
        // const newQuoteNum = quoteNum + 1
        // setQuoteNum(newQuoteNum)
        setParGroup(oldArray => [...oldArray, Paragraph({type:"quote", id: parNum, size:200, editable: true})])
    }
    
    useEffect(() => {
        if(props.data){
            let paragraphs = []

            paragraphs = props.data.article.contents.map((par, index) => {
                const id = `${index+1}`
                let quote = props.data.article.quotes[index] ? Paragraph({content:props.data.article.quotes[index], type:"quote", id: index, size: 200}) : null
                
                return (
                    <React.Fragment key={id+"quote"+index}>
                    {Paragraph({content: par, id, type:"paragraph", size: 1000})}
                    {quote}
                </React.Fragment>
                )
            })

            setParGroup(() =>[...paragraphs])
        }
    }, [props.data]);


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