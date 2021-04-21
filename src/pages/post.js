import React, {useState, useEffect} from 'react'
import client from '../client.js'
import { Link } from 'react-router-dom'

import CreateComment from './createComment'

export default function Post(props) {


    function displayComment (e) {
        let button = e.target
        button.classList.toggle("cancel")
        button.classList.contains("cancel") ? e.target.textContent = "Remove Comment" : e.target.textContent = "Create Comment"

        button.parentElement.querySelector('.createComment').classList.toggle('hidden')
    }

    const [post, setPost] = useState(null)
    const [hasSubmit, setHasSubmit] = useState(false)
    const [newComment, setNewComment] =useState([])


    const query = `*[_type == 'comment' && _id == $post]{
        _id,
        username,
        title,
        body,
        subcomments[]->{title, body, username}
      }`
        useEffect(() =>{
            client.fetch(query, {post: props.location.state.post})
              .then((data) => {
                  // we just want the object discard array
                  setPost(data[0])
                })
              .catch(console.error)
          }, [])

          useEffect(()=>{
              if(hasSubmit){
                  let username = document.querySelector('input')
                  let body = document.querySelector('textarea')
                  let comment

                    comment =  <div key={body} className="background_color padding_box margin_top border_header margin_comment comment">
                                
                    <p>{body.value}</p>
                    <p className="smaller_text">{username.value}</p>
                </div>
                username.value = ""
                body.value = ""
                document.querySelector('.buttonComment').click()

                setNewComment(newComment => [...newComment, comment])
                setHasSubmit(false)
              }
          },[hasSubmit])


      if(!post) {
          return(
            <div className="background_color padding_box margin_top">
                <p>Loading</p>
            </div>
          )
      }    

      

    return (
        <React.Fragment>

        <div className="background_color padding_box margin_top margin_post">
            <header className="border_header">
                <h1 className="margin_zero">{post.title}</h1>
                <p className="smaller_text">{post.username}</p>
            </header>

            <section className="margin_top">
                <p>{post.body}</p>
            </section>
        </div>
        {post?.subcomments?.map((comment) => {
            return (
                <div key={comment.body} className="background_color padding_box margin_top border_header margin_comment comment">
                            
                            <p>{comment.body}</p>
                            <p className="smaller_text">{comment.username}</p>
                    </div>
            )
        })}

        {newComment}
        
        <div className="background_color padding_box margin_top border_header">
            
                <button className="margin_top buttonComment" onClick={displayComment}>Create Comment</button>

                <CreateComment topic={post.title} id={props.location.state.post} url={props.location.pathname} state={props.location.state} {...{hasSubmit, setHasSubmit}}/>
        </div>
           
        </React.Fragment>
    )
}