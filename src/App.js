import React from 'react';
import './App.css';
import PropTypes from 'prop-types';
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


const articles = [
    {title:'javascript', content:'details of javascript', author:'Shyam'},
    {title:'Env', content:'details of Emvironment science', author:'Shivam'},
    {title:'Social Science', content:'details of Socioloyg', author:'Rashmi'},
    {title:'Maths', content:'details of Mathematics', author:'Saurabh'},
    {title:'Politics', content:'details of Politics', author:'Archana'},
    {title:'Biology', content:'details of Biology', author:'Shivam'}
  ];

class App extends React.Component {

  componentDidMount() {
    this.props.checkForAutoSign();
    console.log("component did mount app js")
    this.props.getArticles();
  }

  render() {
    return (
      <div className="App">
        <Toolbar isAuthenticated={this.props.isAuthenticated} userName={this.props.userName}></Toolbar>
        <HeaderContent></HeaderContent>
         
        <main className="MainContent">
          <Switch>
            <Route path="/signin" component={SignIn}/>
            <Route path="/signup" component={SignUp}/>
            <Route path="/logout" component={Logout}/>
            <Route path="/articles/:id" exact component={Article}/>
            <Route path="/createarticle" component={NewArticle}/>
            <Route path="/articles" render={() => <MainContent articles={this.props.articles} isAuthenticated={this.props.isAuthenticated}
              userName={this.props.userName}></MainContent>}/>
              
            
          </Switch> 
          <Redirect to="/articles" />
        </main>     
        
      </div>
    );
  }
}

App.defaultProps = {
  counter: 100
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
    userName: state.auth.userName,
    articles: state.article.articles
  }
}

const mapDispatchToProps = dispatch => {
  return {
    checkForAutoSign: () => dispatch(actions.autoSignIn()),
    getArticles: () => dispatch(actions.getArticles())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
