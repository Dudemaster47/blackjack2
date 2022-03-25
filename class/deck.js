const {Card} = require('./card.js');

class Deck {
    constructor(){
        this.stack = [];
        this.sortedStack = [];
        this.shuffle();
    }

    shuffle(){

    }
}

module.exports = {
    Deck,
  };