const {Card} = require('./card.js');
const {Loader} = require('./loader.js');

class Deck {
    constructor(id, stack){
        this.id = id;
        this.stack = stack;
        this.sortedStack = [];
    }
    setDeck(roster){
        
        for(let i = 0; i < roster.actorStorage.length; i++){
            if(roster.actorStorage[i]){
                roster.actorStorage[i].setDeck(this);
            }
        }
    }
    shuffle(){
        //this should generate random values between 0 and (this.sortedStack.length - 1)
        //then it should splice the selected random index out of sorted stack
        //and push that object into the stack
        //then it should recurse
        //it should keep recursing until the length of sortedStack is 0
        if(this.sortedStack.length > 0){
            let randNum = Math.random(Math.floor() * (this.sortedStack.length - 1));
            this.stack.push(this.sortedStack.splice(randNum, 1));
            this.shuffle();
        }
        //pretty sure that's all it needs.
    }
    
}

module.exports = {
    Deck,
  };