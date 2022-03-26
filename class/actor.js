const readline = require('readline');

const {Deck} = require('./deck.js');
const {Card} = require('./card.js');
const {Roster} = require('./roster.js');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

class Actor{
    constructor(name, turnID, victory = true){
        this.name = name;
        this.turnID = turnID;
        this.victory = victory;
        this.hand = []
        this.displayHand;
        this.checkedHand;
        
        // this.rosterAdd(roster);
    }

    setDeck(deck){
        this.deck = deck;
    }

    hit(roster, deck){
        //this is a method for drawing cards...
        this.hand.push(deck.stack.shift());
        this.handDisplay();
        roster.rosterUpdate(this);
        this.bustChecker(roster);
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

        return this.aceChecker(sum);
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
        checkHand();
    }
    
    checkHand(){
        for(i = 0; i < this.displayHand.length; i++){
            if(i = 0){
                this.checkedHand.concat(this.displayHand[i]);
            } else {
                this.checkedHand.concat("\uD83C\uDCA0");
            }
        }
    }

    bustChecker(roster){
        if (this.sumHand() > 21){
            this.bust(roster);
        }
    }

    bust(roster){
        rl.question(`${this.name} busts!`, response =>{
            this.victory = false;
        });
    }

    stand(roster){
        this.scoreStorage(roster, this.sumHand());
        roster.turnOrder++;
        console.clear();
        
        if(roster.turnOrder <= roster.actorStorage.length){
            roster.currentPlayer();
        } else {
        }
    }
}

module.exports = {
    Actor,
}