const {Actor} = require('./actor.js');

class Player extends Actor {
    constructor(name, turnID, victory = true){
        super(name, turnID, victory);
        // this.hand = []; dunno if this is needed
        this.cash = 100;
        this.bet = 0;
    }

    betMoney(num){
        if(num > this.cash || isNaN(num)){
            return false;
        } else {
            this.bet = num;
            return true;
        }
    }

    win(){
        if(this.sumHand() === 21 && this.hand.length === 2){
            this.cash += (Number(this.bet) * 1.5);
        } else {
            this.cash += Number(this.bet);
        }
    }

    lose(){
        this.cash -= Number(this.bet);
    }

    lossCheck(dealer){
        if(this.sumHand() < dealer.sumHand() && dealer.sumHand() <= 21){
            this.victory = false;
        } else if (this.sumHand() === dealer.sumHand()){
            this.victory = false;
        }
    }

    handInspect(){
        //returns the contents of your hand
        this.hand.forEach(el => {
            el.cardInspector();
        })
    }
}


module.exports = {
    Player,
}