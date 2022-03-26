const {Card} = require('./card.js');
const { Deck } = require('./deck.js');
const {Roster} = require('./roster.js');

class Loader{
    static decks = [];
    static roster;
    static fnlDeck = new Deck('fnl', []);

    static loadCards(cardData){
        const cardList = cardData.cards;
        const deckList = cardData.decks;

        // instantiate decks...
        for(let i = 0; i < deckList.length; i++){
            
            let deckData = deckList[i];
            let newDeck;
            newDeck = new Deck(deckData.id, deckData.stack);
            Loader.decks.push(newDeck)
            
            // instantiate cards...
            for(let j = 0; j < cardList.length; j++){
                let cardData1 = cardList[j];
                let newCard;
    
                newCard = new Card(cardData1.id, cardData1.name, cardData1.value,cardData1.altValue, cardData1.suit, cardData1.ascii);
                newDeck.sortedStack.push(newCard);
            }
            // that should create a sorted stack within a deck that can be used to shuffle into the main stack...
        }
    }

    static initializeRoster(){
        roster = new Roster(1, [], 0);
    }

    static deckMerge(roster){
        
        let counter = roster.playerCount;

        if (roster.playerCount % 2 !== 0){
            counter++;
        }

        for(let i = 0; i < (counter / 2); i++){
            fnlDeck.sortedStack.concat(deck[i].sortedStack);
        }
    }

    static setDeck(fnlDeck){
        for(let i = 0; i < Loader.roster.actorStorage.length; i++){
            if(Loader.roster.actorStorage[i]){
                Loader.roster.actorStorage[i].setDeck(fnlDeck);
            }
        }
    }

}

module.exports = {
    Loader,
};