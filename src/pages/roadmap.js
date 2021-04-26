import {useState, useEffect} from 'react'
import sanityClient from '../client.js'
import roadMapQuery from '../sanity/roadmap_query.js'

export default function RoadMap(props) {
    const [pageData, setPageData] = useState(null)

    useEffect(() =>{
        sanityClient.fetch(roadMapQuery)
          .then((data) => setPageData(data))
          .catch(console.error)
      }, [props.match.url])

    if(!pageData)
    {
        return (
            <section className="article">
                <h1>FI Road Map</h1>
                <div className="articleContent">
                </div>
            </section>
        )
    }


    let body = pageData.map((page) => {
        return(
        <section key={page.heading}>
            <h2>{page.heading}</h2>
            <ul className="display_block">
            {page?.articlelist?.map((article) => {
                if(!article.id)
                {
                    return (
                        <li key={article.title}>
                            {article.title}
                        </li>
                    )
                }
                return (
                    <li key={article.id}>
                        <a href={`/${page.page}/${article.id}`} className="inlineLink" target="_blank" rel="noopener noreferrer" >{article.title} </a>
                   </li>
               )
            })}
            </ul>
        </section>
        )
    })
    
    const minWidth = document.querySelector('#mainNav').clientWidth
    return (
        <section className="article" style={{minWidth: `${minWidth}px`}}>
            <h1>FI Road Map</h1>
            <div className="articleContent">
                {body}
                <h2>Join the Community</h2>
                <ul>
                    <li>
                        <a href={`/community`} className="inlineLink" target="_blank" rel="noopener noreferrer" >See what the community is saying</a>
                   </li>
                   </ul>
            </div>
        </section>
    )
}