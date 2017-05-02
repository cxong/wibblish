/* eslint semi:0,comma-dangle:0,padded-blocks:0,eqeqeq:0,no-redeclare:0,no-useless-escape:0,comma-spacing:0 */

import Patterns from './patterns'
import Words from './vocab'

/*
 * main.js
 *
 * New Age Bullshit Generator
 * © 2014-15 Seb Pearce (sebpearce.com)
 * Licensed under the MIT License.
 *
 */

// Toolkit of useful functions
var kit = {

  copyArrayOfArrays(arr) {
    var result = [];
    for (var i = 0; i < arr.length; i++) {
      result[i] = arr[i].slice();
    }
    return result;
  },

  capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  },

  randomInt(max) {
    return Math.floor(Math.random() * (max + 1));
  },

};

// The generator in all its quantum glory
export default class {

  constructor() {
    this.sentencePatterns = Patterns;
    this.bullshitWords = Words
    this.sentencePool = [];
    this.sentencePool = kit.copyArrayOfArrays(this.sentencePatterns);
  }

  removeSentenceFromPool(topic, el) {
    if (el > -1) {
      this.sentencePool[topic].splice(el, 1);
    }
  }

  retrieveRandomWordOfType(type) {
    var rand = kit.randomInt(this.bullshitWords[type].length - 1);
    return this.bullshitWords[type][rand];
  }

  generateSentence(topic) {

    var patternNumber = kit.randomInt(this.sentencePool[topic].length - 1);
    var pattern = this.sentencePool[topic][patternNumber];

    if (typeof pattern == 'undefined') {
      console.log('ran out of pattern ' + patternNumber);
    }

    // insert a space before . , ; ? so we can split the string into an array
    var pattern = pattern.replace(/([\.,;\?])/g,' $1');
    var pattern = pattern.split(' ');

    // remove the pattern from the sentence pool so it can't be re-used
    this.removeSentenceFromPool(topic, patternNumber);

    // remove the topic from the sentence pool if there are no sentences left
    // for that particular topic
    if (this.sentencePool[topic].length === 0) {
      this.sentencePool.splice(topic, 1);
    }

    var result = '';
    for (var x in pattern) {
      // if word matches one of the placeholder words (e.g. nPerson),
      // replace it with a random instance of its type (e.g. warrior)
      if (this.bullshitWords.hasOwnProperty(pattern[x])) {
        result += this.retrieveRandomWordOfType(pattern[x]);
      } else {
        result += pattern[x];
      }
      result += ' ';
    }

    // replace 'a [vowel]' with 'an [vowel]'
    // I added a \W before the [Aa] because one time I got
    // 'Dogman is the antithesis of knowledge' :)
    result = result.replace(/(^|\W)([Aa]) ([aeiou])/g,'$1$2n $3');

    result = result.trim();
    result = kit.capitalizeFirstLetter(result);

    // remove spaces before commas/periods/semicolons
    result = result.replace(/ ([,\.;\?])/g,'$1');
    // take care of prefixes (delete the space after the hyphen)
    result = result.replace(/- /g,'-');
    // add space after question marks if they're mid-sentence
    result = result.replace(/\?(\w)/g,'? $1');

    return result;
  }

  generateText(numberOfSentences, sentenceTopic) {

    var fullText = '';
    for (var i = 0; i < numberOfSentences; i++) {
      fullText += this.generateSentence(sentenceTopic);
      // if the topic has been deleted, pick another topic
      if (typeof this.sentencePool[sentenceTopic] == 'undefined') {
        sentenceTopic = kit.randomInt(this.sentencePool.length - 1);
      }
    }

    // insert a space between sentences (after periods and question marks)
    fullText = fullText.replace(/([\.\?])(\w)/g,'$1 $2');

    return fullText;
  }

};
