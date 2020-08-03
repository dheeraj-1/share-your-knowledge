import React from 'react';
import './App.css';
import PropTypes from 'prop-types';
import { Route, Switch, Redirect } from 'react-router-dom';

import Toolbar from './components/toolbar/Toolbar';
import HeaderContent from './components/header/HeaderContent';
import MainContent from './components/mainContent/MainContent';
import SignIn from './components/SignIn/SignIn';
import SignUp from './components/SignUp/SignUp';
// function App(props) {
//   return (
//     <div className="App">
//       <div>This div is clicked {props.counter} times!</div>
//     </div>
//   );
// }

const articles = [
    {title:'javascript', content:'details of javascript', author:'Shyam'},
    {title:'Env', content:'details of Emvironment science', author:'Shivam'},
    {title:'Social Science', content:'details of Socioloyg', author:'Rashmi'},
    {title:'Maths', content:'details of Mathematics', author:'Saurabh'},
    {title:'Politics', content:'details of Politics', author:'Archana'},
    {title:'Biology', content:'details of Biology', author:'Shivam'}
  ];

class App extends React.Component {
  render() {
    return (
      <div>
        <Toolbar></Toolbar>
        <HeaderContent></HeaderContent>
        <Switch>
          <Route path="/signin" component={SignIn}/>
          <Route path="/signup" component={SignUp}/>
          <Route path="/" render={() => <MainContent articles={articles}></MainContent>}/>
          <Redirect to="/" />
        </Switch>       
        
      </div>
    );
  }
}

App.defaultProps = {
  counter: 100
}

export default App;
