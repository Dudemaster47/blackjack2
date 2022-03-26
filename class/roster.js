const {Actor} = require('./actor.js');
const {Player} = require('./player.js');
const {Dealer} = require('./dealer.js');
const {Deck} = require('./deck.js');
const {Card} = require('./card.js');

class Roster{
    constructor(currentPlayer, actorStorage, playerCount){
        this.currentPlayer = currentPlayer;
        this.actorStorage = actorStorage;
        this.playerCount = playerCount;
    }

    updatePlayerCount(){
        this.playerCount++
    }
}

module.exports = {
    Roster,
}