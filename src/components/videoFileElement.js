import React from "react"

var funPt = function VideoFileElement(props) {

    const key = props && props.id? "this is crazy" + props.id : "zerozerozero"

    if(props && props.data && props.data.files){
        const options = props.data.files.map((file) => {
            return(
                <option key={file.displayname} value={file.displayname} data-id={file.source}/>
            )
        })
        return(
            <React.Fragment key={key}>
                <label htmlFor="fileName">File display name
                        <input type="text" minLength="3" maxLength="30" name="fileName" placeholder="my file template"></input>
                    </label>

                <label htmlFor="fileURL">File URL
                    <input placeholder="https://www.dropbox.com/exampleTemplate.xlsx?dl=1" list="fileURLs"  name="fileURL" />

                    <datalist id="fileURLs">
                        {options}
                    </datalist>
                </label>
            </React.Fragment>
        )
    }
    else{
        return (
            <React.Fragment key={key}>
                <label>File display name
                    <input type="text" minLength="3" maxLength="30" name="fileName" placeholder="my file template"></input>
                 </label>

                <label htmlFor="fileURL">File URL
                            <input type="url" name="fileURL" placeholder="https://www.dropbox.com/exampleTemplate.xlsx?dl=1"></input>
                </label>
            </React.Fragment>
        )
    }
}
export {funPt as default}