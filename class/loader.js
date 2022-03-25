const {Card} = require('./card.js');
const { Deck } = require('./deck.js');

class Loader{
    static cards = [];
    static decks = [];

    static loadCards(cardData){
        const cardList = cardData.cards;
        const deckList = cardData.decks;

        // instantiate decks
        for(let i = 0; i < deckList.length; i++){
            
            let newDeck;
            newDeck = new Deck();
            
            // instantiate cards...
            for(let j = 0; j < cardList.length; j++){
                let cardData1 = cardList[j];
                let newCard;
    
                newCard = new Card(cardData1.id, cardData1.value,cardData1.altValue, cardData1.suit, cardData1.ascii);
                newDeck.sortedStack.push(newCard);
            }
            // that should create a sorted stack within a deck that can be used to shuffle into the main stack...
            

        }
    }

}

module.exports = {
    Loader,
};