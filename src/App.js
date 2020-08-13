import React from 'react';
import './App.css';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Toolbar from './container/toolbar/Toolbar';
import HeaderContent from './components/header/HeaderContent';
import MainContent from './container/mainContent/MainContent';
import SignIn from './components/SignIn/SignIn';
import SignUp from './components/SignUp/SignUp';
import * as actions from './store/actions/index';
import Logout from './components/logout/Logout';
import Article from './components/articles/article/Article';
import NewArticle from './container/newArticle/NewArticle';


class App extends React.Component {

  componentDidMount() {
    this.props.checkForAutoSign();
    console.log("component did mount app js")
  }

  render() {
    return (
      <div className="App">
        <Toolbar isAuthenticated={this.props.isAuthenticated} userName={this.props.userName}></Toolbar>
        <HeaderContent></HeaderContent>
         
        <main className="MainContent">
          <Switch>
            <Route path="/signin" exact component={SignIn}/>
            <Route path="/signup" component={SignUp}/>
            <Route path="/logout" component={Logout}/>
            <Route path="/createarticle" exact component={NewArticle}/>
            <Route key={this.props.userName} exact path="/myarticles" render={() => <MainContent author={this.props.userName}/>}/>
            <Route path="/articles/:id" exact component={Article}/>
            <Route key="" exact path="/articles" render={() => <MainContent author=""/>}/>
              
            
          </Switch> 
          <Redirect to="/articles" />
        </main>     
        
      </div>
    );
  }
}


const mapStateToProps = state => {
  return {
    isAuthenticated: state.token !== null,
    userName: state.userName
  }
}

const mapDispatchToProps = dispatch => {
  return {
    checkForAutoSign: () => dispatch(actions.autoSignIn())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
