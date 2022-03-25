class Card{
    constructor(id, value, altValue, suit, ascii){
        this.id = id;
        this.value = value;
        this.altValue = altValue;
        this.suit = suit;
        this.ascii = ascii;
    }

    aceChecker(){
        
    }
}

module.exports = {
    Card,
}