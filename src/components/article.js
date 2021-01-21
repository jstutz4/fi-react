import React from 'react'

const sectionCSS = {
    marginTop: '10vh',
      backgroundColor: 'lightgray',
      padding: '1vw',
      paddingTop: '0',
      borderRadius: '15px',
  }

const quoteCSS = {
    backgroundColor: 'lightgreen',
    padding: '10px 30px',
    textAlign: 'center',
}

const headerCSS =
{
    borderTop: 'solid 5px lightgreen',
    borderBottom: 'solid 3px lightgreen',
}



export default function article(props) {
    let content=props.content.map((section,index)=>{
    let quote = props.quote[index] ? <blockquote  style={quoteCSS}>{props.quote[index]}</blockquote> : null
    let key = props.title + index
        return (
            <React.Fragment key={key}>
                <article >{section}</article>
                {quote}
            </React.Fragment>
        )
      })


    return(
        <section style={sectionCSS}>
            <h1 style={headerCSS}>{props.title}</h1>
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