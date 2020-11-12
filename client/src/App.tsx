import React from 'react';
import logo from './logo.svg';
import './App.css';
import { UserList } from './components/UserList/UserList';

import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

import { BrowserRouter as Router } from 'react-router-dom';

const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache()
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="App">
          <header className="App-header">
            <UserList />
          </header>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
