var funPt = function VideoFileElement(props) {
    const key = props && props.id? "this is crazy" + props.id : "zerozerozero"
    
    if(props && props.data && props.data.files){
        const options = props.data.files.map((file) => {
            return(
                <option key={file.displayname} value={file.displayname} data-id={file.source}/>
            )
        })
        return(
            <label key={key} htmlFor="fileURL">File URL
                <input placeholder="https://www.dropbox.com/exampleTemplate.xlsx?dl=1" list="fileURLs"  name="files" />

                <datalist id="fileURLs">
                    {options}
                </datalist>
            </label>
        )
    }
    else{
        return (
            <label key={key} htmlFor="fileURL">File URL
                        <input type="url" name="files" placeholder="https://www.dropbox.com/exampleTemplate.xlsx?dl=1"></input>
            </label>
        )
    }
}
export {funPt as default}