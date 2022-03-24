

const { clear } = require("console");

const readline = require("readline");



const rl = readline.createInterface({

    input: process.stdin,

    output: process.stdout

});


// i have to do my own for this, it's too confusing to follow other peoples' code.
/* Alright! First off:
Cards are 2-11, with four 10s in each suit.

Dealing needs to be wholly random, picking a random card from each suit and removing it from the object when drawn.

Any number of players should be able to play, with a single dealer who draws last. 

Multiple decks should be able to be added if so desired.

Aces need to count as 1 OR 11, depending on whether or not the hand holding them would exceed 21.

The Dealer stays on 17.

Hands need to be stored as an array of the numeric values, suit doesn't really matter after the cards are removed from the deck.

Add bidding????
*/

let deck = {
    // deck needs to be mutable.
    Spades: [2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A'],
    Hearts: [2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A'],
    Diamonds: [2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A'],
    Clubs: [2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A']
    
};

const numberOfPlayers = () => {
    rl.question(`How many players are there?`, (answer) => {
        if (!(isNaN(answer))){
            console.log(`You responded ${answer} players. Is that correct?`);
                rl.question(`Y/N`, (conf) => {
                    if (conf === 'y' || conf === 'Y' || conf === 'yes' || conf === 'Yes' || conf === 'YES'){
                        console.log(`Understood`);
                        let playerCount = answer;
                        numberOfDecks(playerCount);
                    }
                    else if (conf === 'n' || conf === 'N' || conf === 'no' || conf === 'No' || conf === 'NO'){
                        console.log(`Understood.`);
                        numberOfPlayers();
                    }
                    else {
                        console.log(`I'll take that as a 'no'.`);
                        numberOfPlayers();
                    }
                });
        }
        else if (Number(answer) > 5){
            console.log(`${answer} is too many players.`)
            numberOfPlayers();

        }
        else {
            console.log(`I'm sorry, ${answer} isn't a number. Try again.`);
            numberOfPlayers();
        }
    })
};

const handSum = (hand) => {
    // this should look at a player's hand array and sum it.
    let sum = 0;
    let ace = 11;
    sum = hand.reduce((prevVal, currVal) => {
        let faceCards = ['J', 'Q', 'K']
        if (prevVal.includes(faceCards)){
            prevVal = 10;
        }
        if (currVal.includes(faceCards)){
            currVal = 10;
        }
        if (currVal.includes('A') && prevVal + 11 <= 21){
            currVal = ace;
        }
        if (prevVal.includes('A') && currVal + 11 <= 21){
            prevVal = ace;
        }
        if (currVal.includes('A') && prevVal + 11 > 21){
            ace = 1;
            currVal = ace;
        }
        if (prevVal.includes('A') && prevVal + 11 > 21){
            ace = 1;
            prevVal = ace;
        }
        return (prevVal + currVal);
        //this is a job for refactoring to clean it up...
    
    }, sum);
};

const cardDrawer = () => {
    let suitsArr = Object.keys(deck);
    let suit = suitsArr[Math.floor(Math.random() * suitsArr.length)]
   
    if(deck[suit].length > 0){
        let deckSuit = deck[suit]
        let card = deckSuit[Math.floor(Math.random() * deckSuit.length)]
        return [suit, card];

    } else {
        delete deck[suit];
        cardDrawer();
    }

}

/* this is Alonso's solution for the dealing, which I'll just shamelessly steal. It works well and I don't really see a reason to change this bit.*/


const dealACard = (hand) => {
    let cardArr = cardDrawer();
    hand.push(cardArr[1]);
    deck[cardArr[0]] = deck[cardArr[0]].filter(element => !(element === cardArr[1]))
};
    
const firstDeal = (roster) => {
    // calls numberOfDecks first.
    // anyway once the full deck is compiled...
    // Cards are dealt to each player in order of P1 -> PN -> D
    // Each player gets two cards in that cycle. These are added to the roster object as an array of their numerical values. 
    // calls on cardDrawer each time it deals a card.
        for (let i = 0; i < 2; i++){
            for (let hand in roster){
                dealACard(roster[hand]);
            }
        }
        // this... SHOULD cycle through it twice?
};
    
let playerRoster = (playerCount, roster = {}) => {
    //so what we want to do is get each player's name, and shove each name into the object as its own key that we'll later use to store an array of cards as the values.
    //first things first, we need to iterate over the player count.
    for (let i = 1; i <= playerCount; i++){
        rl.question(`Player ${i}, please enter your name.`, name => {
            roster[name] = []
            if (i < playerCount){
                rl.close();
            }   
            else {
                roster[dealer] = [];
                console.log(roster);
                console.log(`Let's begin.`)
                firstDeal(roster);
            }
        });
    };
};
//this should return an object containing blank arrays for each player hand, the keys being each player's name.

let numberOfDecks = (playerCount) => {
// this might require deep duping?
// instead of asking, just like. set the number of decks equal to the players
// then copy the deck object that many times and concat them together?
// i don't really wanna deal with it.
    playerRoster(playerCount);
};


let victoryStorage = () => {};

let dealerTurn = (dealerHand) => {
// ok
    let dealerSum; 
    if (handSum(dealerHand) >= 17 && handSum(dealerHand) <= 21){
        dealerSum = handSum(dealerHand);
        console.log(`The Dealer stays.`);
        victoryStorage(dealerSum);
    }
    else if (handSum(dealerHand) > 21){
        dealerSum = handSum(dealerHand);
        console.log(`The Dealer busts.`);
        victoryStorage(dealerSum);
    }
    else {
        console.log(`The Dealer draws a card.`);
        dealerTurn(dealACard(dealerHand));
    }
};

let playerTurn = (playerHand) => {
    let playerSum;
};



let victory = () => {
//one of the more complicated helper functions?
/* Rules to note:
    1. Ties go to the Dealer.
    2. As long as one Player beats the Dealer, all Players who didn't bust win.
    3. If the Dealer draws a 21, the game ends immediately.
    4. If a Player draws a 21 and the Dealer does not, the game ends immediately.*/
};
