import React, { useState } from 'react'
import MainContent from '../components/main'
import Header from '../components/navMain'

import { useQuery } from '@apollo/react-hooks';
import gql from "graphql-tag";

export default function About(props) {
  const aboutQuery = gql`
  query aboutQuery {
    page(screenname:"about") {
      screenname,
      articleNav {
        to,
        name
      }
      articles {
        id,
        articletitle,
        video {
          videoid,
          title,
          source,
          files {
            id,
            source,
            displayname
          }
        }
        contents,
        quotes,
      }
    }
  }`
  
  const initialState = 10000
  const [activeArticle, setActiveArticle] = useState(initialState);
  
  let { data, loading, error }  = useQuery(aboutQuery);
  
  if(loading) return <section>No Data</section>
  if(error) return <section>we have an error</section>
  
  const urlID = props.match.params.id

  //if the url param id was changed then update active article
  if( urlID && activeArticle != urlID){
    setActiveArticle(props.match.params.id)
  } //if url param id is null and first render
  else if(!urlID && activeArticle == initialState){
    if(data && data.page && data.page.articles && data.page.articles.length > 0)
      setActiveArticle(data.page.articles[0].id)
  }

  const articleNav = data.page.articleNav
  const page = '/about/'
  const article = data.page.articles.filter(art => art.id == activeArticle)[0]
  
  return (
    <React.Fragment>
      {Header(props)}
      {MainContent(props, page, articleNav,article, activeArticle, setActiveArticle)}
    </React.Fragment>
  );
}