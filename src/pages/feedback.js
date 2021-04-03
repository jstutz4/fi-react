import React from 'react'
import Header from '../components/navMain'

import {Dropbox} from "dropbox";


export default function Feedback(props) {
    function sendFeedback(e) {
        const ACCESS_TOKEN = `sl.AuSX1sl-O4pLVqnYjA2b6xZwPTXIUJDTNWu3bjCbXj523B4QrIq4fQ1I3xvbM2UA_CmjWs6s1X6W-uAMWykJdwM39HyC4-g0_Op76dZ7wW525G98MOCB2h0DJlPsStVPJtard_mK`    
        const UPLOAD_FILE_SIZE_LIMIT = 150 * 1024 * 1024;

        var dbx = new Dropbox({ accessToken: ACCESS_TOKEN });
        let file = new File(["hello world"], "filename")
        const form = document.getElementsByTagName('form')[0]
        const textareas = form.querySelectorAll('textarea')
        let fileContent = `
        
        Person: ${textareas.item(0)?.value}

        Color ideas
        
        ${textareas.item(1)?.value}

        Layout ideas
            Hard to Navigate
        
        ${textareas.item(2)?.value}

            Easy to Navigate
                
        ${textareas.item(3)?.value}

        Content Ideas
            Enjoyed Content
                
        ${textareas.item(4).value}

            Would like to add
                
        ${textareas.item(5).value}

        Their suggestions
            
        ${textareas.item(6).value}
        `

        console.log(fileContent)
        if (15000 < UPLOAD_FILE_SIZE_LIMIT) { // File is smaller than 150 Mb - use filesUpload API
            // dbx.filesListFolder({path: '/feedback'})
            //   .then(function(response) {
            //     console.log("second")
            //     console.log(response.result.entries);
            //   })
            //   .catch(function(error) {
            //     console.log(error);
            //   });




        dbx.filesUpload({path: '/feedback/' + `${textareas.item(0)?.value}-feedback.txt`, contents: fileContent})
            .then(function(response) {
                // then do another api call to get the shareable link
                // then do a graphql mutation and add the link to the db
            console.log(response);
            })
            .catch(function(error) {
                // consider redirect to update key or tell them they already submitted a feedback
            console.error(error);
            });
        }
        
    }

  
  return (
    <React.Fragment>
      {Header(props)}
      <p className="attention">Please leave any feedback, opinions, or suggestions in the relevant sections</p>
      <form>
      <fieldset>
          <legend>Identity:</legend>
              <label>
                  What is your name or username?
                  <textarea required></textarea>
              </label>
          </fieldset>
          <fieldset>
          <legend>Color:</legend>
              <label>
                  Which color or area would you want to change and to what color would you change it to?
                  <textarea></textarea>
              </label>
          </fieldset>

          <fieldset>
          <legend>Layout:</legend>
              <label>
                  What areas of the website were hard to navigate? Did you get lost at any time?
                  <textarea></textarea>
              </label>

              <label>
                  What made it easy to navigate the website
                  <textarea></textarea>
              </label>
          </fieldset>

          <fieldset>
          <legend>Content:</legend>
              <label>
                  What did you enjoy most about the content?
                  <textarea></textarea>
              </label>
              <label>
                  What kind of content would you like to see added?
                  <textarea></textarea>
              </label>
          </fieldset>


          <fieldset>
          <legend>Misc:</legend>
              <label>
                  Please add any and all additional comments you would like to share &#9786;
                  <textarea></textarea>
              </label>
          </fieldset>
      </form>
          <button onClick={sendFeedback}>submit feedback</button>

    </React.Fragment>
  );
}