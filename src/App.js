import React, { Component } from 'react';
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
  },
];

// split words by spaces
var textList = string.split(' ');

// generate a list of startOffsetCounter
var map = {};
var startOffsetCounter = 0;
for( var i = 0; i < textList.length; i++ ) {
  // get word
  var word = textList[i];

  // check if word is not null
  if( word ) {

    // create metadata
    var valueMetaData = {}
    valueMetaData['startOffset'] = startOffsetCounter;
    valueMetaData['endOffset'] = startOffsetCounter + word.length;
    valueMetaData['color'] = null;
    valueMetaData['priority'] = Number.MAX_VALUE;  // set default to highest number
    valueMetaData['nextStartOffset'] = startOffsetCounter + word.length + 1;

    // create value
    var value = {};
    value['word'] = word;
    value['metadata'] = valueMetaData;

    // push the key & value object
    map["" + startOffsetCounter] = value;

    // update startOffsetCounter
    startOffsetCounter += word.length + 1;
  }
}

// highlight words
for( var j = 0; j < highlights.length; j++ ) {

  var highlight = highlights[j];

  if( map[highlight.startOffset] ) {

    var wordMetaData = map[highlight.startOffset].metadata;

      // map pointer
      var currentWordMetaData = wordMetaData;
      
      while( highlight
        && currentWordMetaData
        && highlight.endOffset >= currentWordMetaData.endOffset ) {

          if( highlight.priority <= currentWordMetaData.priority ) {
            currentWordMetaData['priority'] = highlight.priority;
            currentWordMetaData['color'] = highlight.color;
          }

          currentWordMetaData = map[""+currentWordMetaData['nextStartOffset']].metadata;
      }
  } else {
    console.log("taco");
  }
}


console.log(map);

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div>
            { string }
          </div>
        </header>
      </div>
    );
  }
}

export default App;
