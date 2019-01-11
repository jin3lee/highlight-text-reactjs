import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const string = '123456789';

const highlights = [
  {
      startOffset: 1,
      endOffset: 2,
      color: '#d9f593',
      priority: 0, // lower numbers are higher in priority
  },
  {
      startOffset: 3,
      endOffset: 4,
      color: '#e8e8e8',
      priority: 1,
  },
  {
      startOffset: 5,
      endOffset: 9,
      color: '#0000FF',
      priority: 0,
  },
  {
      startOffset: 6,
      endOffset: 7,
      color: '#00FF00',
      priority: 1,
  },
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

// generate html tags with color for corresponding group of words
var map = {};
var index = 0;
var counter = 0;
var textGroup = [];


while( counter <= string.length ) {
    // reset color
    var currentColor = indexColorArray[counter];
    var currentStartIndex = counter;

    // start with tag for first index
    while( counter <= string.length - 1 && currentColor == indexColorArray[counter + 1] ) {
      counter++;
    }

    // insert html tag into textGroup
    if( currentColor ) {
      textGroup.push(<span style={{"backgroundColor": ""+currentColor}}>
                  { string.substring(currentStartIndex, counter) }
                </span>);
      textGroup.push(<span>&nbsp;</span>);
    } else {
      textGroup.push(<span>
                  { string.substring(currentStartIndex, counter) }
                </span>);
      textGroup.push(<span>&nbsp;</span>);
    }

    // increment
    counter++;
}

console.log(textGroup);

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
          <div>
            { textGroup }
          </div>
        </header>
      </div>
    );
  }
}

export default App;
