const {Deck} = require('./deck.js');
const {Card} = require('./card.js');
const {Roster} = require('./roster.js');

class Actor{
    constructor(name, turnID, victory = true){
        this.name = name;
        this.turnID = turnID;
        this.victory = victory;
        this.hand = []
        this.displayHand;
        
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
    }

    bustChecker(roster){
        if (this.sumHand() > 21){
            this.bust(roster);
        }
    }

    bust(roster){
        console.log(`${this.name} busts!`);
        this.victory = false;
        this.stand(roster);
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