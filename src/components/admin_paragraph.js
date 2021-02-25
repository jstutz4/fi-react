import React from 'react';
import Paragraph from './admin_quote'

export default function Article(props){

    // let { data, loading, error }  = useQuery(props.query);
    // const [parNum, setParNum] = useState(0);
    

    function addParagraph(item) {
        const id = `paragraph${props.parNum}`;
        // consider putting this in a state use a list of paragraphs and update the state

        const newParagraph = `<section class="paragraph">
            <label htmlFor="${id}">Paragraph:</label>
            <textarea maxLength="3000" name="paragraph" id="${id}">
            </textarea>
            <section className="groupSelect">
            </section>
        </section>`
        item.nativeEvent.path[0].parentElement.insertAdjacentHTML('beforebegin', newParagraph)

        const nextId = props.parNum + 1
        props.setPar(nextId)
    }

    function addQuote(item) {
        const id = `quote${props.quoteNum}`;
        // consider putting this in a state use a list of paragraphs and update the state

        const newQuote = `<section class="paragraph">
            <label htmlFor="${id}">Quote:</label>
            <textarea maxLength="200" name="quote" id="${id}">
            </textarea>
            <section className="groupSelect">
            </section>
        </section>`
        item.nativeEvent.path[0].parentElement.insertAdjacentHTML('beforebegin', newQuote)

        const nextId = props.quoteNum + 1
        props.setQuote(nextId)
    }
    
    let paragraphs = []
    console.log(props)
    if(props.data){

        paragraphs = props.data.article.contents.map((par, index) => {
            const id = `paragraph${index+1}`
            let quote = props.data.article.quotes[index] ? Paragraph({content:props.data.article.quotes[index], type:"quote", id: "quote" + index, size: 200}) : null
            
            return (
                <React.Fragment key={id+"quote"+index}>
                {Paragraph({content: par, id, type:"paragraph", size: 1000})}
                {quote}
            </React.Fragment>
            )
         })
    }
    else {
        paragraphs = Paragraph({editable: true, id: 'paragraph1', type:"paragraph", size: 1000})
    }

    return (
    <section className="parDisplay">
        {paragraphs}
        <section className="groupSelect">
        <button onClick={addParagraph}>+ Paragraph</button>
        <button onClick={addQuote}>+ Quote</button>
        </section>
    </section>
    )
}