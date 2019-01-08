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
      color: '#000000',
      priority: 1,
  },
  {
      startOffset: 25,
      endOffset: 50,
      color: '#e8e8e8',
      priority: 5,
  },
  {
      startOffset: 55,
      endOffset: 59,
      color: '#FFFFFF',
      priority: 2,
  }
];

// sort highlight array by priority
highlights.sort( _highlightCompareFunction );

// initialize color array with null
var indexColorArray = [];
for( var i = 0; i < string.length; i++ ) {
  indexColorArray.push(null);
}

// fill boolean array with background color for each character in 'string'
for( var j = 0; j < highlights.length; j++ ) {
  for( var i = 0; i < string.length; i++ ) {
    if( _charIndexIsWithinHighlightObjectRange( highlights[j] , i ) ) {
      indexColorArray[i] = highlights[j].color;
    }
  }
}

// returns true if index is between the highlight param's startOffset & endOffset
function _charIndexIsWithinHighlightObjectRange ( highlight, index ) {
  return highlight.startOffset <= index && index <= highlight.endOffset;
}

// comparing highlight objects function
function _highlightCompareFunction ( a, b ) {
  if( a.priority < b.priority ) {
      return -1;
  } else if( a.priority > b.priority ) {
      return 1;
  } else {
      return 0;
  }
}


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
