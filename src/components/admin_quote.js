export default function Quote (props) {
    const size = `${props.size}`
    const capitalWord = `${props.type[0].toUpperCase()}${props.type.substring(1)}`
    return(
        <section key={props.id} className={props.type}>
            <label htmlFor={props.id}>{capitalWord}:</label>
            <textarea maxLength={size} name={props.type} id={props.id} value={props.content} readOnly>
            </textarea>
            <section className="groupSelect">
                <button>Edit</button>
            </section>
        </section>
    )
}