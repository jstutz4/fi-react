import React from 'react'
import Video from './video'

export default function article(props) {

    if(!props?.paragraph){
        return <section>No Data</section>
    }

    let content = props.paragraph.map((section) => {
        if(section.style === "normal")
        {
            let body = []

            section.children.forEach((child) => {
               if(child?.marks?.length > 0)
               {
                    let link = section.markDefs.filter(mark => mark._key === child.marks[0])[0]

                    let location = link?.href || link?.asset?.url
                    body.push(<a key={location} href={location} className="inlineLink" target="_blank" rel="noopener noreferrer" >{child.text} </a>)
               }
               else {
                   body.push(child.text)
               }

                
            })

            return (
                <article key={section.children[0].text}>{body}</article>
            )
        }
        else if (section.style === "blockquote")
        {
            let body = ''
            section.children.forEach(text => body+= text.text)
            return(
                <blockquote key={section.children[0].text}>{body}</blockquote>
            )
        }
        return <React.Fragment></React.Fragment>
    })

    return(
        <section className="articleContent">
            <h1>{props.title}</h1>
            {Video({video: props.article_video, files: props.template_file})}
            {content}
        </section>
    );
}