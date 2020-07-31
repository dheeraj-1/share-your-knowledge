import React from 'react';
import logo from './logo.svg';
import './App.css';
import PropTypes from 'prop-types';

import Toolbar from './components/toolbar/Toolbar';

// function App(props) {
//   return (
//     <div className="App">
//       <div>This div is clicked {props.counter} times!</div>
//     </div>
//   );
// }
class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Toolbar></Toolbar>
        <div>Header Content</div>
        <div> Main Content</div>
        <div onClick={this.props.onClick}>This div is clicked {this.props.counter} times!!</div>
      </div>
    );
  }
}

App.defaultProps = {
  counter: 100
}

export default App;
