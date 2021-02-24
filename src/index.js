import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter} from 'react-router-dom'
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// graph QL
import {ApolloClient} from 'apollo-client';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {HttpLink} from 'apollo-link-http';
import {ApolloProvider} from '@apollo/react-hooks'


// components
import NavHeader from './components/navMain'



const cache = new InMemoryCache();
const link = new HttpLink({
  uri: 'http://localhost:4000/graphql',
  // uri: '/graphql',
  
})

const client = new ApolloClient({
  cache,
  link
})

const routing = (
<React.StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
      <div className="center">
            {/* {NavHeader()} */}
            <App></App>
            
            {/* {Footer()} */}
        </div>
      </BrowserRouter>
      </ApolloProvider>
  </React.StrictMode>
)
ReactDOM.render(
  routing,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
