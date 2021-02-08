import { Route, Switch } from 'react-router-dom'
import './App.css';
import './desktopApp.css';
import about from './pages/about'
import save from './pages/save'
import invest from './pages/invest'
import gettingStarted from './pages/gettingStarted'


function App(props) {
  return (
    <Switch>
      <Route path="/start/:id?" component={gettingStarted} />
      <Route path="/save/:id?" component={save} />
      <Route exact path="/invest/:id?" component={invest} />
      <Route exact path="/about" component={about} />
    </Switch>
  );
}

export default App;
