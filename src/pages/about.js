import React from 'react'
import NavHeader from '../components/nav-header'
import Article from '../components/article'

export default function about() {
  return (
    <div className="center">
        {NavHeader()}
        {Article({title: "My Why"})}
    </div>
  )
}