class Card{
    constructor(id, name, value, altValue, suit, ascii){
        this.id = id;
        this.name = name;
        this.value = value;
        this.altValue = altValue;
        this.suit = suit;
        this.ascii = ascii;
    }

    cardInspector(){
        console.log(`${this.name} of ${this.suit}`)
    }
}

module.exports = {
    Card,
}