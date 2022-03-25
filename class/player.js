const {Actor} = require('./actor.js');
const {Dealer} = require('./dealer.js');
const {Deck} = require('./deck.js');
const {Card} = require('./card.js');
const {Roster} = require('./roster.js');

class Player extends Actor{
    constructor(){
        super();
    }
}

module.exports = {
    Player,
}