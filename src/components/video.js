
import React from 'react'

export default function video(props) {
    const files = []

    if(!props?.video?.source){
        return <React.Fragment></React.Fragment>
    }
    if(props.files) {
        props.files.forEach(file => {
        files.push(<a key={file.url} href={file.url}>{file.name}</a>)
        });
    }
    
    console.log(props)
    return (
        <section className="video">
            {/* <section className="videoWrapper"> */}
                <iframe title={props.video.name} width="224" height="126" src={props.video.source} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
            {/* </section> */}
            <section>
                {files}
            </section>
        </section>
    )
}