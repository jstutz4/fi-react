import React, { useState, useEffect } from 'react';
import MainContent from '../components/main'
import Header from '../components/navMain'
import startData from '../database/gettingStarted.json'


export default function Start(props) {

  const initialState = 10000
  const [activeArticle, setActiveArticle] = useState(initialState);
  
  
  let data = startData

  
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
  const page = '/start/'
  const article = data.page.articles.filter(art => art.id == activeArticle)[0]
  
  return (
    <React.Fragment>
      {MainContent(props, page, articleNav,article, activeArticle, setActiveArticle)}
    </React.Fragment>
  );
}