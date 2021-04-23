import React from "react"
import ForumIcon from '../pages/users.svg'
import AddImg from '../pages/add_posts.png'
import { Link } from 'react-router-dom'


export default function ForumTopic(props) {

    function toggleTopic(e){
        let topic =  e.target.getAttribute('data-info')
        document.querySelector(`ul[data-info=${topic}`).classList.toggle('hidden')
    }

    function getForm(e){

    }

    // this removes all the space and symbols in topic title
    // so we can use a css selector for the data-info
    let noSpaceTopic = props.topic.replace(/[\s \' \- \? \! \.]/g, "" )
    return(
        // this represents a row on the forum page
        <React.Fragment key={props.key}>
            <section className="forum_icon forum_col">
                <img src={ForumIcon} width="35" alt="forum icon" />
            </section>
            
            <section className="forum_topic forum_col"  >

                <div>
                    <section className="topicHeader">
                        <div className="sameLine">

                        <h3 onClick={toggleTopic} data-info={noSpaceTopic}>{props.topic}</h3>
                        <Link to={{pathname: `/create/topic/${props.topic}`,
                                    state: {topic: props.id}}}>
                            <img onClick={getForm} src={AddImg} width="30" className="addPost" alt="add a topic"/>
                        
                        </Link>
                        </div>
                        <div className="width_full"></div>
                        <p className="smaller_text">{props.description}</p>

                    </section>
                        {/* <p className="smaller_text width_full">{props.description}</p> */}
                </div>

                <ul className={`forum_sub_topic hidden`} data-info={noSpaceTopic}>
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