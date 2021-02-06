import React, { useState, useEffect } from 'react';
import MainContent from '../components/main'

import { useQuery } from '@apollo/react-hooks';
import gql from "graphql-tag";

export default function Start(props) {
  
  const startQuery = gql`
  query justAName {
    page(screenName:"start") {
      id,
      screenName,
      articles {
        id,
        articleTitle,
        video,
        videoTitle,
        files {
          id,
          source,
          text
        },
        contents,
        quotes,
      },
    }
    
    nav(id:1){
      id,
      to,
      name,
    }

  }`
  const initialState = 10000
  const [activeArticle, setActiveArticle] = useState(initialState);
  
  let { data, loading, error }  = useQuery(startQuery);
  
  if(loading) return <section>No Data</section>
  if(error) return <section>we have an error</section>
  
  const urlID = props.match.params.id

  //if the url param id was changed then update active article
  if( urlID && activeArticle != urlID){
    setActiveArticle(props.match.params.id)
  } //if url param id is null and first render
  else if(!urlID && activeArticle == initialState){
    setActiveArticle(data.page.articles[0].id)
  }
  
  const articleNav = data.nav
  const article = data.page.articles.filter(art => art.id == activeArticle)[0]
  
  return (
    <React.Fragment>
      {MainContent(props,articleNav,article, activeArticle, setActiveArticle)}
    </React.Fragment>
  );
}