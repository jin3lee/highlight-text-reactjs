import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const string = 'You will deliver new technology with an adorable puppy. Perfect!';
const highlights = [
  {
      startOffset: 4,
      endOffset: 20,
      color: '#d9f593',
      priority: 0, // lower numbers are higher in priority
  },
  {
      startOffset: 17,
      endOffset: 31,
      color: '#e8e8e8',
      priority: 1,
  }
];

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>
            {string}
          </p>
        </header>
      </div>
    );
  }
}

export default App;
