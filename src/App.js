import { Route, Switch } from 'react-router-dom'
import './App.css';
import './desktopApp.css';

import feedback from './pages/feedback'
import ArticlePage from './pages/articlePage';
import RoadMap from './pages/roadmap'


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
      <Route path="/feedback" component={feedback} />
    </Switch>

  );
}

export default App;
