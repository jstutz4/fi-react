import React, { useState } from 'react';
import Paragraph from './admin_quote'

export default function Article(props){

    // let { data, loading, error }  = useQuery(props.query);
    const [parNum, setParNum] = useState(1);
    const [quoteNum, setQuoteNum] = useState(0); // since we dont start with a quote
    const emptyParContainer = Paragraph({type:"paragraph", id: parNum, size:1000, editable: true})
    const [parGroup, setParGroup] = useState([emptyParContainer])
    
    if(props.reset){
        setParNum(1)
        setQuoteNum(0)
        setParGroup(() => [Paragraph({type:"paragraph", id: 1, size:1000, editable: true})])
    }

    function addParagraph(item) {
        const newParNum = parNum + 1
        setParNum(newParNum)
        setParGroup(oldArray => [...oldArray, Paragraph({type:"paragraph", id: newParNum, size:1000, editable: true})])
    }

    function addQuote(item) {
        const newQuoteNum = quoteNum + 1
        setQuoteNum(newQuoteNum)
        setParGroup(oldArray => [...oldArray, Paragraph({type:"quote", id: newQuoteNum, size:200, editable: true})])
    }
    
    // let paragraphs = []
    // console.log(props)
    // if(props.data){

    //     paragraphs = props.data.article.contents.map((par, index) => {
    //         const id = `paragraph${index+1}`
    //         let quote = props.data.article.quotes[index] ? Paragraph({content:props.data.article.quotes[index], type:"quote", id: "quote" + index, size: 200}) : null
            
    //         return (
    //             <React.Fragment key={id+"quote"+index}>
    //             {Paragraph({content: par, id, type:"paragraph", size: 1000})}
    //             {quote}
    //         </React.Fragment>
    //         )
    //      })
    // }
    // else {
    //     paragraphs = Paragraph({editable: true, id: 'paragraph1', type:"paragraph", size: 1000})
    // }

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