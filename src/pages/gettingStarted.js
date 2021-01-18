import React from 'react'
import NavHeader from '../components/nav-header'
import aboutArticle from '../components/article'

export default function about() {
  return (
    <div className="center">
        {NavHeader()}
        {aboutArticle({title: "Understanding Money"})}
    </div>
  )
}