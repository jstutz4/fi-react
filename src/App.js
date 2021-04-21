import { Route, Switch } from 'react-router-dom'
import './App.css';
import './desktopApp.css';

import feedback from './pages/feedback'
import ArticlePage from './pages/articlePage';
import RoadMap from './pages/roadmap'
import Forum from './pages/forum';
import CreateTopic from './pages/createTopic';
import Post from './pages/post';
import CreateComment from './pages/createComment'


function App() {
  return (
    <Switch>
      <Route path="/roadmap" exact component={RoadMap}/>
      <Route path="/start/:id?" component={ArticlePage} />
      <Route path="/save/:id?" component={ArticlePage} />
      <Route path="/invest/:id?" component={ArticlePage} />
      <Route exact path="/" component={ArticlePage} />
      {/* <Route exact path="/about/:id?" component={about} /> */}
      <Route path="/about" component={ArticlePage} />
      <Route path="/community/:topic" component={Post} />

      <Route path="/community" component={Forum} />
      <Route path="/feedback" component={feedback} />
      <Route exact path="/create/topic" component={Forum} />
      <Route exact path="/create/comment" component={Forum} />

      <Route exact path="/create/topic/:topic?" component={CreateTopic} />
      <Route exact path="/create/comment/:topic?" component={CreateComment} />
    </Switch>

  );
}

export default App;
