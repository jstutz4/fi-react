import React from 'react'
import {useState, useEffect} from 'react'
import TopicRow from '../components/forum_topic'
import client from '../client.js'

export default function Forum(props) {

    const [topic, setTopic] = useState(null)

const query = `*[_type == 'forum']{
    ListOfTopics[]->{topic,
                    _id,
                    description,
                    numTopics,
                    numComments,
                    subtopics[]->{username, title, body, _id }
                    }
    }`
    useEffect(() =>{
        client.fetch(query)
          .then((data) => {
              setTopic(data)
            })
          .catch(console.error)
        // eslint-disable-next-line
      }, [])

    if(!topic)
    {
        return (
            <React.Fragment>
            <header className="background_color margin_top padding_box">
                <h1>Welcome to the community</h1>
                <p>You are free to ask questions under the best fit category and answer questions from the community by sharing your stories and experiences.</p>
            </header>

            <div className="forum background_color">
                <p className="forum_header">Icon</p>
                <p className="forum_header">Posts</p>
                <p className="forum_header">Stats</p>
                {/* <p className="forum_header">Most Recent</p> */}
                    {TopicRow({topic:"General Discussion", description: "A place to share you journey and stories", sub_topic: [{title: "post 1"}, {title: "post two"}, {title:"my story to share"}], num_posts: 0, num_topics: 0})}
            </div>
            <p>Thanks to <a href='https://dryicons.com/free-icons/forum-icon'> Dryicons </a> for providing the awesome forum icons</p>
        </React.Fragment>
        )
    }

    let topicBody = topic[0]?.ListOfTopics.map((topic) =>{
        return(
            TopicRow({
                key: topic._id,
                id: topic._id,
                topic: topic.topic,
                description: topic.description || "None available",
                sub_topic: topic.subtopics,
                num_topics: topic.numTopics || 0,
                num_posts: topic.numComments || 0,
            })
        )
    })

    return (
        <React.Fragment>
        <header className="background_color margin_top padding_box">
            <h1>Welcome to the community</h1>
            <p>You are free to ask questions under the best fit category and answer questions from the community by sharing your stories and experiences.</p>
        </header>
        <div className="forum background_color">
        <p className="forum_header">Icon</p>
        <p className="forum_header">Posts</p>
        <p className="forum_header">Stats</p>
        {/* <p className="forum_header">Most Recent</p> */}
        {topicBody}
            {/* {TopicRow({topic:"General Discussion", description: "A place to share you journey and stories", sub_topic: ["post 1", "post two", "my story to share"], num_posts: 0, num_topics: 0})}

            {TopicRow({topic:"Asset You", description: "All about getting more from you, your greatest asset", sub_topic: [], num_posts: 0, num_topics: 0})}

            {TopicRow({topic:"Saving", description: "Creative ways you can start and continue to save", sub_topic: [], num_posts: 0, num_topics: 0})}

            {TopicRow({topic:"Set and Forget Investing", description: "For those that want to invest but only want to spend a few hours every year", sub_topic: [], num_posts: 0, num_topics: 0})}

            {TopicRow({topic:"Investing", description: "For those that want to put much more time into investing", sub_topic: [], num_posts: 0, num_topics: 0})}
            
            {TopicRow({topic:"Real Estate", description: "house hacking, renting, flips, or anything else real estate", sub_topic: [], num_posts: 0, num_topics: 0})} */}
        </div>
            <p>Thanks to <a className="credit" href='https://dryicons.com/free-icons/forum-icon'> Dryicons </a> for providing the awesome forum icons</p>
        </React.Fragment>
    )
}