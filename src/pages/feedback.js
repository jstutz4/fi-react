import React from 'react'
import Header from '../components/navMain'

export default function Feedback(props) {
  
  return (
    <React.Fragment>
      {Header(props)}
      <p className="attention">Please leave any feedback, opinions, or suggestions in the relevant sections</p>
      <form>
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
          <button type="submit">submit feedback</button>
      </form>

    </React.Fragment>
  );
}