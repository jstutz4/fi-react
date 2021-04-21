import React, {useState} from 'react'
import client from '../client'
import {Redirect} from 'react-router-dom'

import {nanoid} from 'nanoid'

export default function Comment(props) {


function onsubmit(e) {

    e.preventDefault()
    let commentId = props.id
    let inputs = e.target.parentElement.querySelectorAll('input')
    let username = inputs[0].value
    // let title = inputs[1].value
    let body = e.target.parentElement.querySelectorAll('textarea')[0].value

    client.config({
        token: process.env.REACT_APP_TOKEN
    }).create({
        returnIds: true,
        _type: 'comment',
        username,
        body
    }).then((data) => {
        client.patch(commentId)
        .setIfMissing({subcomments: []})
        .append('subcomments', [{_key: nanoid(),_ref:data._id , _type: 'reference'}])
        .commit()
    })
    client.patch(props.state.topic).setIfMissing({numComments: 0}).inc({numComments: 1}).commit()
    
        props.setHasSubmit(true)
    }
    

    return(
        <section className="createComment hidden">
      <p className="attention">You will be creating a new Comment under the {props.topic} topic</p>
      <form onSubmit={onsubmit}>
      <fieldset>
          <legend>New Comment:</legend>
              <label>
                  User Name
                  <input type="text" required></input>
              </label>

              <label>
                  Comment Body
                  <textarea type="text" required></textarea>
              </label>
          </fieldset>
          
          <button>Add Comment</button>
      </form>

    </section>
    )
}