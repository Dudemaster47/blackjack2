

const {Actor} = require('./actor.js');

class Dealer extends Actor {
    constructor(name, turnID){
        super(name, turnID);
        this.victory = true;
        // this.hand = [];
        // this.turnSet(roster);
    }

    checkSeventeen(roster){
        
        if(this.sumHand() >= 17 && this.sumHand() <= 21){
            return true;
        } else {
            return false;
        }
    }

    turn(roster, deck){
        if(this.checkSeventeen(roster)){
            console.log(`The Dealer stands.`);
            this.stand(roster);

        }else {
            if(!this.victory){
                this.stand(roster);
            } else {
                console.log(`The Dealer hits.`);
                this.hit(roster, deck);  
                this.turn(roster, deck);          
            }
        }
    }
}

module.exports = {
    Dealer,
}