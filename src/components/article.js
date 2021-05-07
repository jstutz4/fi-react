import React from 'react'
import Video from './video'
import InvestingVehiclesTable from './investingTypesTables'

export default function article(props) {

    

    if(!props?.paragraph){
        return <section>No Data</section>
    }

    let startMultiList = false
    let continueMultiList = true
    let readyToBuild = false
    let multiList = []
    let level2List = []
    // a way to have unique keys when having a spacer paragraph
    let counter = 0

    let content = props.paragraph.map((section) => {
        if(section.style === "normal")
        {
            let body = []

            if(!startMultiList && section.listItem)
                startMultiList=true

            else if(startMultiList && continueMultiList && !section.listItem)
            {
                startMultiList = false
                continueMultiList = true
                readyToBuild = true
                if(level2List.length > 0)
                    multiList.push({level:2, body: level2List})
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
                <ul key={"ul1" + section.children[0].text} className="display_block">

                    {multiList.map((listItem) => {
                        if(listItem.level === 2){
                            return(
                            <ul key={"ul2" + listItem.body[0].body[0]} className="display_block">
                            
                            {listItem.body.map((subListItem) =>{
                                return(<li key={"point" + subListItem.body[0]}>{subListItem.body[0]}</li>)   
                            })}
                            </ul>)
                        }
                        else{
                           return( <li key={"point" +listItem.body[0]}>{listItem.body[0]}</li>)
                        }
                    })}
                </ul>
               )
               body.push(resolveChildren(section.children, section.markDefs))
               readyToBuild = false
               continueMultiList = true
               multiList = []
               level2List = []
            }
            // if it is a list item then dont add anything
            // the add of an list item will be done in the if statement above
            else if(!section.listItem) {
                // handles links
                body.push(resolveChildren(section.children, section.markDefs))
            }
            // consider adding a spacer
            // if(section.children[0].text == '') {
            //     console.log(section.children[0].text)
            //     console.log(body)
            // }
            counter++
            return (

                <article key={section.children[0].text + section.children[0]?.marks?.[0]+counter}>{body}</article>
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

    let table = null
    if(props.slug === "types-of-investing-accounts")
    {
        table = <InvestingVehiclesTable />
    }

    return(
        <section className="articleContent">
            <h1>{props.title}</h1>
            {Video({video: props.article_video, files: props.template_file})}
            {content}
            {table}
        </section>
    );
}

function resolveChildren(childrenArray, markDefs) {
    let body = []
    childrenArray.forEach((child) => {
        if(child?.marks?.length > 0)
        {
            if(child.marks[0] === 'strong'){
                body.push(<h3 key={"heading"+child.text}>{child.text} </h3>)
            }
            else
            {
                let link = markDefs.filter(mark => mark._key === child.marks[0])[0]
                
                let location = link?.href || link?.asset?.url
                body.push(<a key={location} href={location} className="inlineLink" target="_blank" rel="noopener noreferrer" >{child.text} </a>)
            }
        }
        else {
            body.push(child.text)
        }

         
     })

     return body
}