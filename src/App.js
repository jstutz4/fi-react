import { Route, Switch } from 'react-router-dom'
import './App.css';
import './desktopApp.css';
import about from './pages/about'
import save from './pages/save'
import invest from './pages/invest'
import gettingStarted from './pages/gettingStarted'
import feedback from './pages/feedback'
import admin from './pages/admin'
import header from './components/navMain'
import adminAddArticle from './pages/admin_addArticle'
import adminAddVideo from './pages/admin_addVideo'
import ArticlePage from './pages/articlePage';


function App(props) {
  return (
    <Switch>
      <Route path="/start/:id?" component={ArticlePage} />
      <Route exact path="/" component={ArticlePage} />
      <Route path="/save/:id?" component={ArticlePage} />
      <Route path="/invest/:id?" component={invest} />
      {/* <Route exact path="/about/:id?" component={about} /> */}
      <Route path="/about" component={ArticlePage} />
      <Route path="/feedback" component={feedback} />
    </Switch>

  );
}

export default App;
