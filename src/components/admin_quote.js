
export default function Quote (props) {
    function editMode(e){
        console.log(e)
        // display the update button
        
        e.target.nextElementSibling.classList.toggle("hidden")

        // enable edit of textarea
        e.target.parentElement.parentElement.querySelector('textarea').readOnly = false
    }

    function updateContent(e) {
        console.log(e)
        let content = e.target.parentElement.parentElement.querySelector('textarea')
        let contentIdentifier = content.getAttribute("data-content-id")
        let articleId = document.getElementsByName("articles")[0].value
        let newContent = {dataId:contentIdentifier, type: content.name, text: content.value, articleId}
        console.log(newContent)
        console.log(props.callUpdateArticle)
        props.callUpdateArticle({variables: {content:newContent}})

        e.target.classList.toggle('hidden')
        content.readOnly = true

    }

    const id = `${props.type}${props.id}`
    const size = `${props.size}`
    const capitalWord = `${props.type[0].toUpperCase()}${props.type.substring(1)}`

    if (props.editable){
        return(
            <section key={id} className={props.type}>
                <label htmlFor={id}>{capitalWord}:</label>
                <textarea className={props.type} id={id} name="article" maxLength={size} defaultValue={""} >
                </textarea>
                <section className="groupSelect">
                </section>
            </section>
        )
    }
    return(
        <section key={props.content} className={props.type}>
            <label htmlFor={id}>{capitalWord}:</label>
            {/* must use value instead of default value for the state to update correctly */}
            <textarea maxLength={size} name={props.type} id={id} defaultValue={props.content} readOnly data-content-id={props.dataAttribute}>
            </textarea>
            <section className="groupSelect">
                <button onClick={editMode}>Edit</button>
                <button className="hidden" onClick={updateContent}>update</button>
            </section>
        </section>
    )
}