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

    rosterUpdate(roster){
        for(let i = 0; i < roster.actorStorage.length; i++){
            if(roster.actorStorage[i].turnID === this.turnID){
                //checking the turnID since that will ultimately not be mutable
                //or... possible to mess with, like by having two players with the same name.
                roster.actorStorage[i] = this;
            }
        }
    }

    setDeck(deck){
        this.deck = deck;
    }

    hit(deck){
        //this is a method for drawing cards...
        this.hand.push(deck.stack.shift());
        this.handDisplay();
        this.rosterUpdate(roster);
        //...huh, that should actually be all it needs.
    }

    getCardByID(id){
        this.hand.forEach(el => {
            if(el.id === id){
                return el
            }
        });
    }

    sumHand(){
        let sum = 0;
        sum = this.hand.reduce((prevCard, currCard) => {
            return prevCard.value + currCard.value;
        }, sum);

        aceChecker(sum);
    }

    aceChecker(sum){
        if(sum > 21){
            sum = 0;
            sum = this.hand.reduce((prevCard, currCard) =>{
                return prevCard.altValue + currCard.altValue;
            }, sum);
        }
        return sum;
    }

    handDisplay(){
        //creates the hand that's actually shown
        this.hand.forEach(el => {
            this.displayHand.concat(el.ascii);
        //should just give a string that's the cards
        });
    }

    bust(){
        console.log(`${this.name} busts!`);
        this.victory = false;
        this.stand();
    }

    stand(roster){
        this.scoreStorage(roster, this.sumHand());
        roster.turnOrder++;
        console.clear();
        roster.currentPlayer();
    }

    scoreStorage(roster, handSum){
        roster.scoreStorage[this.name] = handSum;
    }
}

module.exports = {
    Actor,
}