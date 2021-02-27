export default function Quote (props) {
    const id = `${props.type}${props.id}`
    const size = `${props.size}`
    const capitalWord = `${props.type[0].toUpperCase()}${props.type.substring(1)}`

    if (props.editable){
        return(
            <section key={id} className={props.type}>
                <label htmlFor={props.id}>{capitalWord}:</label>
                <textarea maxLength={size} name={props.type} id={id} defaultValue={""} >
                </textarea>
                <section className="groupSelect">
                </section>
            </section>
        )
    }
    return(
        <section key={id} className={props.type}>
            <label htmlFor={id}>{capitalWord}:</label>
            <textarea maxLength={size} name={props.type} id={id} value={props.content} readOnly>
            </textarea>
            <section className="groupSelect">
                <button>Edit</button>
            </section>
        </section>
    )
}