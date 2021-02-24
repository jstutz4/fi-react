import React from 'react';
import Paragraph from './admin_quote'

export default function Article(props){

    // let { data, loading, error }  = useQuery(props.query);
    // const [parNum, setParNum] = useState(0);
    

    function addParagraph(item) {
        const id = `paragraph${props.parNum}`;
    
        const newParagraph = `<section className="paragraph">
            <label htmlFor={${id}}>Paragraph:</label>
            <textarea maxLength="1000" name="paragraph" id={${id}}>
            </textarea>
            <section className="groupSelect">
                <button>Edit</button>
            </section>
        </section>`
        item.nativeEvent.path[0].insertAdjacentHTML('beforebegin', newParagraph)

        const nextId = parNum + 1
        props.setFunc(nextId)
    }
    

    const paragraphs = props.data.article.contents.map((par, index) => {
        const id = `paragraph${index+1}`
        let quote = props.data.article.quotes[index] ? Paragraph({content:props.data.article.quotes[index], type:"quote", id: "quote" + index, size: 200}) : null
        
        return (
            <React.Fragment key={id+"quote"+index}>
                {Paragraph({content: par, id, type:"paragraph", size: 1000})}
                {quote}
            </React.Fragment>
        )
    })

    return (
    <section className="parDisplay">
        {paragraphs}
        <button onClick={addParagraph}>+ Paragraph</button>
    </section>
    )
}