import React from 'react'
import Video from './video'

export default function article(props) {

    function resolveChildren(childrenArray, markDefs) {
        let body = []
        childrenArray.forEach((child) => {
            if(child?.marks?.length > 0)
            {
                 let link = markDefs.filter(mark => mark._key === child.marks[0])[0]

                 let location = link?.href || link?.asset?.url
                 body.push(<a key={location} href={location} className="inlineLink" target="_blank" rel="noopener noreferrer" >{child.text} </a>)
            }
            else {
                body.push(child.text)
            }

             
         })

         return body
    }

    if(!props?.paragraph){
        return <section>No Data</section>
    }

    let startMultiList = false
    let continueMultiList = true
    let readyToBuild = false
    let multiList = []
    let level2List = []

    let content = props.paragraph.map((section) => {
        if(section.style === "normal")
        {
            let body = []

            if(!startMultiList && section.listItem)
                startMultiList=true

            if(startMultiList && continueMultiList && !section.listItem)
            {
                startMultiList = false
                continueMultiList = true
                readyToBuild = true
            }
            if(startMultiList && continueMultiList){
                if(section.level === 2){
                    level2List.push({level:section.level, body: resolveChildren(section.children, section.markDefs)})
                }
                else {
                    if(level2List.length > 0)
                        multiList.push({level:2, body: level2List})

                    multiList.push({level:section.level, body: resolveChildren(section.children, section.markDefs)})
                    level2List = []
                }
            }

            if(readyToBuild){
               body.push(
                <ul key={section.children[0].text}>

                    {multiList.map((listItem) => {
                        if(listItem.level === 2){
                            return(
                            <ul key={"ul" + listItem.body[0].body[0]}>
                            
                            {listItem.body.map((subListItem) =>{
                                return(<li key={subListItem.body[0]}>{subListItem.body[0]}</li>)   
                            })}
                            </ul>)
                        }
                        else{
                           return( <li key={listItem.body[0]}>{listItem.body[0]}</li>)
                        }
                    })}
                </ul>
               )
               body.push(resolveChildren(section.children, section.markDefs))
               readyToBuild = false
               multiList = []
            }
            // if it is a list item then dont add anything
            // the add of an list item will be done in the if statement above
            else if(!section.listItem) {
                // handles links
                body.push(resolveChildren(section.children, section.markDefs))
            }


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
        else if (section.image){
            return(
                <div key={section.alt} className="flex_center">
                    <img src={section.image} alt={section.alt} className="inline_image" />
                </div>
            )
        }
        return <React.Fragment key="need a lame key"></React.Fragment>
    })

    return(
        <section className="articleContent">
            <h1>{props.title}</h1>
            {Video({video: props.article_video, files: props.template_file})}
            {content}
        </section>
    );
}