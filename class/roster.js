class Roster{
    constructor(turnOrder, actorStorage, playerCount){
        this.turnOrder = turnOrder;
        this.actorStorage = actorStorage;
        this.playerCount = playerCount;
        this.scoreStorage = {};
    }

    addToRoster(actor){
        this.actorStorage.push(actor);
    }

    rosterUpdate(actor){
        for(let i = 0; i < this.actorStorage.length; i++){
            if(this.actorStorage[i].turnID === actor.turnID){
                //checking the turnID since that will ultimately not be mutable
                //or... possible to mess with, like by having two players with the same name.
                this.actorStorage[i] = actor;
            }
        }
    }

    dealerTurnSet(dealer){
        dealer.turnID = (Number(this.playerCount) + 1)
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

    tableInspect(actor){
        //shows the first card in the hand of all actors at the table
        for(let i = 0; i < this.actorStorage.length; i++){
            if(this.actorStorage[i].turnID !== actor.turnID){
            console.log(`${this.actorStorage[i].name}'s hand: ${this.actorStorage[i].checkedHand}`);
            }
        }
    }

    playerKick(){
        for(let i = 0; i < this.actorStorage.length; i++){
            if(this.actorStorage[i].cash === 0){
                console.log(`Sorry ${this.actorStorage[i].name}, but the House always wins.`);
                console.log(`${this.actorStorage[i].name} has been kicked from the table!`);
                this.actorStorage.splice(i, 1);
                this.playerCount --;
                i--;
            }
        }
        
    }

    reset(){
        this.turnOrder = 1;
        for(let i = 0; i < this.actorStorage.length; i++){
            this.actorStorage[i].hand = [];
            this.actorStorage[i].displayHand = '';
            this.actorStorage[i].checkedHand = '';
            this.actorStorage[i].victory = true;
        }
    }

}

module.exports = {
    Roster,
}