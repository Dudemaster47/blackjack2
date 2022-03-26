const {Deck} = require('./deck.js');
const {Card} = require('./card.js');
const {Roster} = require('.roster.js');

class Actor{
    constructor(name, turnID, victory = true){
        this.name = name;
        this.turnID = turnID;
        this.victory = victory;
        this.hand = []
        this.displayHand;
        this.rosterAdd(roster);
    }

    rosterAdd(roster){
        roster.addToRoster(this);
    }

    setDeck(deck){
        this.deck = deck;
    }

    hit(deck){
        //this is a method for drawing cards...
        this.hand.push(deck.stack.shift());
        //...huh, that should actually be all it needs.
    }

    getCardByID(id){

    }

    sumHand(){

    }

    handDisplay(){
        //creates the hand that's actually shown
        this.hand.forEach(el => {
            let card = this.getCardByID(el);
            this.displayHand.concat(card.ascii);
        //should just give a string that's the cards
        });
    }

    bust(){

    }

    stand(){

    }
}

module.exports = {
    Actor,
}