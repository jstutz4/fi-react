import React from 'react'
import Video from './video'
import ReactHtmlParser from 'react-html-parser'; 








export default function article(props) {
    if(!props || !props.contents){
        return <section>No Data</section>
    }
    let content = props.contents.map((section,index)=>{
    let quote = props.quotes[index] ? <blockquote>{props.quotes[index]}</blockquote> : null
    let key = props.articletitle + index

        return (
            <React.Fragment key={key}>
                <article>{getLinksFromArticle(section)}</article>
                {quote}
            </React.Fragment>
        )
      })

    return(
        <section className="articleContent">
            <h1>{props.articletitle}</h1>
            {Video(props.video)}
            {content}
        </section>
    );
}

/*          <article>
                Lorem ipsum dolor sit amet, usu iusto ridens volumus et, enim verear vim ea, aliquid vivendum no vel. Alia sonet utamur usu id. Vis at fuisset posidonium, liber audire est eu, civibus legendos no per. Vix timeam scripta sensibus ad. Natum probo discere his at.

                Ea vocent denique explicari pro, sit mundi graecis tractatos at. No paulo posidonium his, id vim quod constituto, sonet lobortis nec ad. Bonorum scaevola argumentum vim cu, sea ex probo fuisset petentium. Everti adipiscing signiferumque sed et. Ea vis omittam omittantur, his no possit periculis, ad mel partiendo inciderint.
            </article>
                <blockquote  style={quoteCSS}>
                    For 50 years, WWF has been protecting the future of nature. The world's leading conservation organization, WWF works in 100 countries and is supported by 1.2 million members in the United States and close to 5 million globally.
                </blockquote>
                <article>
                    An eos esse nonumy efficiantur, omnis elitr dolor nam ad, putant verear inimicus ut quo. Dolor eleifend cu quo. Aliquam blandit comprehensam no nam, his an fabellas adolescens philosophia. Has te mollis tamquam labores. Vim soluta alterum voluptatibus eu.
    
                    Quem sonet dissentiunt ex ius. Ei cum nusquam deleniti indoctum, et duo ipsum deserunt, discere efficiendi philosophia duo in. At quo meliore nonumes, ne laudem doming scaevola pri. Mea no suavitate intellegam signiferumque, ne his nisl rebum deleniti. Ad eam posse diceret, cu his lorem appareat.
    
                    Sed ad harum mediocrem consulatu. Facer dolores complectitur sit te, regione mnesarchum cum no. Periculis vituperatoribus cum et, te atqui senserit vim, te pro case aliquip conceptam. Sed cu soluta tibique, dictas necessitatibus cu ius, ius eros omnesque intellegam et. Veritus appetere mel cu, vis rebum alterum postulant ea, ut rebum liberavisse mediocritatem per. Dictas latine no qui, id eam quot illum impetus, est id tota fastidii repudiare.
                </article> */


function getLinksFromArticle(content) {
    return (
        ReactHtmlParser (content)
    )
} 