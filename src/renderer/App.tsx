import React from 'react';
import { MemoryRouter as Router, Switch, Route } from 'react-router-dom';
import './App.global.css';
import KeyVaultPage from './components/key-vault-page';

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={KeyVaultPage} />
      </Switch>
    </Router>
  );
}
