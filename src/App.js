import { Route, Switch } from 'react-router-dom'
import './App.css';
import about from './pages/about'
// import gettingStarted from './pages/gettingStarted'
import save from './pages/save'
import invest from './pages/invest'
import newGettingStarted from './pages/newGettingStarted'


function App() {
  return (
    <Switch>
      <Route exact path="/start/:id" component={newGettingStarted} />
      <Route exact path="/start" component={newGettingStarted} />
      <Route path="/save/:id" component={save} />
      <Route exact path="/save/" component={save} />
      <Route exact path="/invest" component={invest} />
      <Route exact path="/about" component={about} />
    </Switch>
  );
}

export default App;
