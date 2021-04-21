import React from "react"
import ForumIcon from '../pages/users.svg'
import AddImg from '../pages/add_posts.png'
import { Link } from 'react-router-dom'


export default function ForumTopic(props) {

    function toggleTopic(e){
        e.target.parentElement.parentElement.parentElement.querySelector('.forum_sub_topic').classList.toggle('hidden')
    }

    function getForm(e){

    }
    return(
        // this represents a row on the forum page
        <React.Fragment key={props.key}>
            <section className="forum_icon forum_col">
                <img src={ForumIcon} width="50" alt="forum icon" />
            </section>
            
            <section className="forum_topic forum_col"  >

                <div>
                    <section className="topicHeader">
                        <h3 onClick={toggleTopic}>{props.topic}</h3>
                        <Link to={{pathname: `/create/topic/${props.topic}`,
                                    state: {topic: props.id}}}>
                            <img onClick={getForm} src={AddImg} width="30" className="addPost" data-topic={props._id} alt="add a topic"/>
                        
                        </Link>
                    </section>
                    <p className="smaller_text">{props.description}</p>
                </div>

                <ul className="forum_sub_topic hidden">
                    {props?.sub_topic?.map((subTopic) => {
                        return (
                            <Link key={props.topic + subTopic.title}
                             to={{
                                pathname: `community/${props.topic}/${subTopic.title}`,
                                state: {topic: props.id, post: subTopic._id}
                            }}>
                                <li>{subTopic.title}</li>
                            
                            </Link>
                        )
                    })}
                </ul>
            </section>
            
            <section className="forum_stats forum_col">

                <p>{props.num_topics} topics</p>
                <p>{props.num_posts} posts</p>

            </section>

              {/* <section className="forum_recent forum_col">
                    <p>Most recent post <a href="#">tax and tax again</a> <a href="#">by tax101</a> on Saturday, April 26, 2021</p>
                </section> */}
        </React.Fragment>
        )
    }