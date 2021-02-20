
import React from 'react'

export default function video(props) {
    const files = []
    if(props){
        if(!props.source){
            return <React.Fragment></React.Fragment>
        }
        if(props.files) {
            props.files.forEach(file => {
            files.push(<a key={file.source} href={file.source} download>{file.displayname}</a>)
            });
        }
    }
    else {
        return <React.Fragment></React.Fragment>
    }
    return (
        <section className="video">
            {/* <section className="videoWrapper"> */}
                <iframe title={props.title} width="224" height="126" src={props.source} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
            {/* </section> */}
            <section>
                {files}
            </section>
        </section>
    )
}