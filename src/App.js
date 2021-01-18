import './App.css';
import NavHeader from './components/nav-header'
import aboutArticle from './components/article'

function App() {
  return (
    <div className="center">
      {NavHeader()}
      {aboutArticle()}
    </div>
  );
}

export default App;
