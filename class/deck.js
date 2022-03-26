const {Card} = require('./card.js');
const {Loader} = require('./loader.js');

class Deck {
    constructor(id, stack){
        this.id = id;
        this.stack = stack;
        this.sortedStack = [];
    }

    shuffle(){
        //this should generate random values between 0 and (this.sortedStack.length - 1)
        //then it should splice the selected random index out of sorted stack and push the card ID into stack
        //then it should recurse
        //it should keep recursing until the length of sortedStack is 0
    }
}

module.exports = {
    Deck,
  };