import { Route, Switch } from 'react-router-dom'
import './App.css';
import about from './pages/about'
import gettingStarted from './pages/gettingStarted'
import save from './pages/save'
import invest from './pages/invest'


function App() {
  return (
    <Switch>
      <Route exact path="/" component={gettingStarted} />
      <Route exact path="/about" component={about} />
      <Route exact path="/save" component={save} />
      <Route exact path="/invest" component={invest} />
    </Switch>
  );
}

export default App;
