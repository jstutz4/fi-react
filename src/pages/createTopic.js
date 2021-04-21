import React, {useState} from 'react'
import client from '../client'
import {Redirect} from 'react-router-dom'
import {nanoid} from 'nanoid'

export default function Create(props) {
    const [hasSubmit, setHasSubmit] = useState(false)
    const [newPost, setNewPost] = useState(null)

function onsubmit(e) {
    // fetch('url', {method: "POST", body: JSON.stringify(data, topicID)})

    e.preventDefault()
    let topicId = props.location.state.topic
    let inputs = e.target.parentElement.querySelectorAll('input')
    let username = inputs[0].value
    let title = inputs[1].value
    let body = e.target.parentElement.querySelectorAll('textarea')[0].value
    client.config({
        // token: process.env.REACT_APP_TOKEN
        token: `skRi3CzVL8TBolcm4dtLTrxVyBbRMSyFRMwrLXOTvjzyVHcIrHV435FOryp75H6CmuR1n2UhReuGJa1BF8jKsuQhmngV0BTZSal0FSY8LKeuTDDWXa4e5ppi0AaqWizUe40SE6UQVCWWPI46Wmj0oW1yMZ9XJFk3S8RkYpuHbTf87j6zK3kw`
    }).create({
        _type: 'comment',
        username,
        title,
        body,
        // topic: {
        //     _type: 'reference',
        //     _ref: topicId,
        // }
    }).then((data) => {
        client.patch(topicId)
        .setIfMissing({numTopics: 0, subtopics: []})
        .inc({numTopics: 1})
        .append('subtopics', [{_key: nanoid(), _ref: data._id, _type: 'reference'}])
        .commit()
        setNewPost({title, id:data._id })
        setHasSubmit(true)
    })
    // client.patch(topicId).inc({numTopics:1}).commit()
    
        
    }

    
    if(hasSubmit) {
        return(
            <Redirect to={{pathname:`/community/${props.match.params.topic}/${newPost.title}`,
                        state: {topic:props.location.state.topic , post: newPost.id}}}
             />
        )
    }

    return(
        <React.Fragment>
      <p className="attention">You will be creating a new post under the {props.match.params.topic} topic</p>
      <form onSubmit={onsubmit}>
      <fieldset>
          <legend>New Post:</legend>
              <label>
                  User Name
                  <input type="text" required></input>
              </label>

              <label>
                  Post Title
                  <input type="text" maxLength="50" required></input>
              </label>

              <label>
                  Post Body
                  <textarea type="text" required></textarea>
              </label>
          </fieldset>
          
          <button>Add Post</button>
      </form>

    </React.Fragment>
    )
}