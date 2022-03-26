const {Actor} = require('./actor.js');
const {Player} = require('./player.js');
const {Dealer} = require('./dealer.js');
const {Deck} = require('./deck.js');
const {Card} = require('./card.js');

class Roster{
    constructor(turnOrder, actorStorage, playerCount){
        this.turnOrder = turnOrder;
        this.actorStorage = actorStorage;
        this.playerCount = playerCount;
        this.scoreStorage = {};
    }

    updatePlayerCount(){
        this.playerCount++
    }

    addToRoster(actor){
        this.actorStorage.push(actor);
    }

    initialHandDisplay(){
        //all this has to do is run on all chars after the first deal.
        for(let i = 0; i < this.actorStorage.length; i++){
            this.actorStorage[i].handDisplay();
        }
    }

    currentPlayer(){
        for(let i = 0; i < this.actorStorage.length; i++){
            if(this.actorStorage[i].turnID === this.turnOrder){
                console.log(`${this.actorStorage[i].name}'s turn.`);
                return this.actorStorage[i];
            }
        }
        //this should be fed into the actual ui when we get to that bit...
    }

}

module.exports = {
    Roster,
}