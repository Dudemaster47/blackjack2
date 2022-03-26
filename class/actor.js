const {Deck} = require('./deck.js');
const {Card} = require('./card.js');
const {Roster} = require('.roster.js');

class Actor{
    constructor(name, turnID, victory = true){
        this.name = name;
        this.turnID = turnID;
        this.victory = victory;
        this.hand = []
        
    }

    hit(){
        //this is a method for drawing cards...
    }

    getCardByID(name){

    }

    sumHand(){

    }

    bust(){

    }

    stand(){
        
    }
}

module.exports = {
    Actor,
}