import { Route, Switch } from 'react-router-dom'
import './App.css';
import './desktopApp.css';
import about from './pages/about'
import save from './pages/save'
import invest from './pages/invest'
import gettingStarted from './pages/gettingStarted'
import admin from './pages/admin'
import header from './components/navMain'
import adminAddArticle from './pages/admin_addArticle'
import adminAddVideo from './pages/admin_addVideo'


function App(props) {
  return (
    <Switch>
      <Route path="/admin" component={admin} />
      {/* <Route path="/admin/video" component={adminAddVideo} /> */}
      <Route exact path="/" component={adminAddVideo} />
      <Route path="/admin/add" component={adminAddArticle} />
      <Route path="/start/:id?" component={gettingStarted} />
      <Route path="/save/:id?" component={save} />
      <Route exact path="/invest/:id?" component={invest} />
      <Route exact path="/about" component={about} />
    </Switch>

  );
}

export default App;
