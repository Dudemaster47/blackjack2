const {Actor} = require('./actor.js');
const {Player} = require('./player.js');
const {Deck} = require('./deck.js');
const {Card} = require('./card.js');
const {Roster} = require('./roster.js');

class Dealer extends Actor{
    constructor(name = "Dealer", turnID){
        super(name, turnID);
        // this.hand = [];
        this.turnSet(roster);
    }

    turnSet(roster){
        this.turnID = (roster.playerCount + 1)
    }

    checkSeventeen(){

    }
}

module.exports = {
    Dealer,
}