export default function Create(props) {
    return (
        <React.Fragment>
        <p className="attention">You will be creating a new post under the {props.match.params.topic} topic</p>
        <form onSubmit={onsubmit}>
        <fieldset>
            <legend>New Post:</legend>
                <label>
                    User Name
                    <input type="text" required></input>
                </label>
  
                <label>
                    Post Title
                    <input type="text" maxLength="50" required></input>
                </label>
  
                <label>
                    Post Body
                    <textarea type="text" required></textarea>
                </label>
            </fieldset>
            
            <button>Add Post</button>
        </form>
  
      </React.Fragment>
    )
}