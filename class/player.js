const {Actor} = require('./actor.js');
const {Dealer} = require('./dealer.js');
const {Deck} = require('./deck.js');
const {Card} = require('./card.js');
const {Roster} = require('./roster.js');

class Player extends Actor{
    constructor(name, turnID, victory = true){
        super(name, turnID, victory);
        // this.hand = []; dunno if this is needed
        this.cash = 100;
        this.bet = 0;
        this.rosterUpdate(roster);
    }

    betMoney(){

    }

    win(){

    }

    lose(){

    }

    tieCheck(){

    }

    lossCheck(){

    }

    rosterUpdate(roster){
        roster.updatePlayerCount();
    }
}

module.exports = {
    Player,
}