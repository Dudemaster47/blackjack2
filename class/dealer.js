const readline = require('readline');

const {Actor} = require('./actor.js');
const {Player} = require('./player.js');
const {Deck} = require('./deck.js');
const {Card} = require('./card.js');
const {Roster} = require('./roster.js');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

class Dealer extends Actor {
    constructor(name, turnID){
        super(name, turnID);
        this.victory = true;
        // this.hand = [];
        // this.turnSet(roster);
    }

    checkSeventeen(roster){
        this.bustChecker(roster);
        if(!this.victory){
            this.stand(roster);
        } else if(this.sumHand() >= 17 && this.sumHand() <= 21){
            return true;
        } else {
            return false;
        }
    }

    turn(roster, deck){
        if(this.checkSeventeen(roster)){
            rl.question(`The Dealer stands.`, response => {
                this.stand(roster);
            });
            
        } else {
            rl.question(`The Dealer hits.`, response => {
                this.hit(roster, deck);
            });
            
        }
    }
}

module.exports = {
    Dealer,
}