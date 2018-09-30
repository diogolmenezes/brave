import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import HomePage from './components/pages/homePage';
import QuestionPage from './components/pages/questionPage';
import ResumePage from './components/pages/resumePage';

import './css/brave.css';


class App extends Component {
  render() {
    return (
      <Switch>           
          <Route exact path="/">
              <HomePage />
          </Route> 
          <Route exact path="/:id/question">
              <QuestionPage />
          </Route> 
          <Route exact path="/:id/resume">
              <ResumePage />
          </Route>          
      </Switch>
    );
  }
}

export default App;
