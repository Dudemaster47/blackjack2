

class Actor{
    constructor(name, turnID, victory = true){
        this.name = name;
        this.turnID = turnID;
        this.victory = victory;
        this.hand = []
        this.displayHand = '';
        this.checkedHand = '';
        
        // this.rosterAdd(roster);
    }

    setDeck(deck){
        this.deck = deck;
    }

    hit(roster, deck){
        //this is a method for drawing cards...
        this.hand.push(deck.stack.shift());
        this.hand = this.hand.flat();
        this.handDisplay();
        roster.rosterUpdate(this);
        this.bustChecker(roster);
        //...huh, that should actually be all it needs.
    }

    getCardByID(id){
        this.hand.forEach(el => {
            if(el.id === id){
                return el
            }
        });
    }

    sumHand(){
        let sum = 0;
        let sumArr = [];
        if(this.hand.length > 1){
        this.hand.forEach(el => {
            sumArr.push(el.value);
        });

        sum = sumArr.reduce((prevVal, currVal) => {
            return prevVal + currVal;
        });

        return this.aceChecker(sum);
        }
    }

    aceChecker(sum){
        let sumArr = [];
        if(sum > 21){
            this.hand.forEach(el => {
                sumArr.push(el.altValue);
            });
    
            sum = sumArr.reduce((prevVal, currVal) => {
                return prevVal + currVal;
            });
        }
        return sum;
    }

    handDisplay(){
        //creates the hand that's actually shown
        this.displayHand = '';
        this.hand.forEach(el => {
            this.displayHand = this.displayHand.concat(el.ascii);
        //should just give a string that's the cards
        });
        this.checkHand();
    }
    
    checkHand(){
        this.checkedHand = '';
        
    
        for(let i = 0; i < this.hand.length; i++){
            
            if(i === 0){
                this.checkedHand = this.checkedHand.concat(this.hand[0].ascii);
            } else {
               
                this.checkedHand = this.checkedHand.concat("\uD83C\uDCA0");
            } 
        }
       
    }

    bustChecker(roster){
        if (this.sumHand() > 21){
            this.bust(roster);
        }
    }

    bust(roster){
        console.log(`${this.name} busts!`)
        this.victory = false;
        
    }

    stand(roster){
        roster.rosterUpdate(this);
        roster.turnOrder++;
        
        
        if(roster.turnOrder <= roster.actorStorage.length){
            roster.currentPlayer();
        } 
    }
}

module.exports = {
    Actor,
}