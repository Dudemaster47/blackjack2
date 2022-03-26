const {Actor} = require('./actor.js');
const {Player} = require('./player.js');
const {Deck} = require('./deck.js');
const {Card} = require('./card.js');
const {Roster} = require('./roster.js');

class Dealer extends Actor {
    constructor(name, turnID){
        super(name, turnID);
        this.victory = true;
        // this.hand = [];
        // this.turnSet(roster);
    }

    checkSeventeen(roster){
        this.bustChecker(roster);
        if(this.sumHand() >= 17 && this.sumHand() <= 21){
            return true;
        } else {
            return false;
        }
    }

    turn(roster, deck){
        if(this.checkSeventeen()){
            this.stand(roster);
        } else {
            this.hit(deck);
        }
    }
}

module.exports = {
    Dealer,
}