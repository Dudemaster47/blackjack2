const {Actor} = require('./actor.js');
const {Player} = require('./player.js');
const {Deck} = require('./deck.js');
const {Card} = require('./card.js');
const {Roster} = require('./roster.js');

class Dealer extends Actor{
    constructor(){
        super();
    }
}

module.exports = {
    Dealer,
}