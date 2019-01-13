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
      endOffset: 60,
      color: '#e8e8e8',
      priority: 1,
  }
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

// update word metadata with highlights
for( var j = 0; j < highlights.length; j++ ) {

  var highlight = highlights[j];

  if( map[highlight.startOffset] ) {

    var wordMetaData = map[highlight.startOffset].metadata;

      // map pointer
      var currentWordMetaData = wordMetaData;

      // iterate through the map until the highlight hits its endOffset
      while( highlight
        && currentWordMetaData
        && highlight.endOffset >= currentWordMetaData.endOffset ) {

          // update color & priority
          if( highlight.priority <= currentWordMetaData.priority ) {
            currentWordMetaData['priority'] = highlight.priority;
            currentWordMetaData['color'] = highlight.color;
          }

          // move pointer to next word&Metadata
          currentWordMetaData = map[""+currentWordMetaData['nextStartOffset']].metadata;
      }
  }
}

// generate texts
function _generateText() {

  var mapKeys = Object.keys(map);

  var returnHtml = [];
  var previousColor = null;
  var phrase = [];

  // get the rest
  for( var i = 0; i < mapKeys.length; i++ ) {

    // get currentColor
    var wordAndData = map['' + mapKeys[i]];

    // if word exist in map proceed to process html
    if( wordAndData ) {

      // get word and color of the word
      var word = wordAndData['word'];
      var color = wordAndData['metadata'].color;

      // once color is different update color and insert prev color collection of words
      if( previousColor != color ) {
          if( phrase.length > 0 ) {
              returnHtml.push(
                <span style={{"backgroundColor": ""+previousColor}}>{phrase}</span>
              );
          }
          phrase = [];
          previousColor = color;
      }

      // add word to phrase
      if( i != mapKeys.length - 1 ) {
        phrase.push(word + " ");
      } else {
        phrase.push(word);
      }

      // add last word to returnHtml
      if( i == mapKeys.length - 1) {
          returnHtml.push(
            <span style={{"backgroundColor": ""+previousColor}}>{phrase}</span>
          );
      }
    }

    // // if first wordAndData fill in initial values
    // if( i == 0 || previousColor != color ) {
    //   previousColor = color;
    //     var wordAndData = map['' + mapKeys[i]];
    //
    //     if( wordAndData ) {
    //       var word = wordAndData['word'];
    //       var color = wordAndData['metadata'].color;
    //
    //
    //         var wordList = [];
    //         var currentColor = previousColor;
    //         while( currentColor == previousColor ) {
    //
    //         }
    //       }

        // close previous tag and update previousColor
        // if( previousColor != color ) {
        //   returnHtml.push(</span>);
        //   previousColor = color;
        //   returnHtml.push(<span style={{"backgroundColor": ""+color}}>);
        // }

        // returnHtml.push(
        //   <span style={{"backgroundColor": ""+color}}>
        //     { word }&nbsp;
        //   </span>
        // );
        //
        // // if last index than close tag
        // if( i == 0 ) {
        //   previousColor = color;
        //   returnHtml.push(
        //     <span style={{"backgroundColor": ""+color}}>
        //   );
        // }


  }

  return returnHtml;
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div>
            { _generateText() }
          </div>
        </header>
      </div>
    );
  }
}

export default App;
