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


Side note, this would benefit from refactoring with classes... and testing to simplify this mess.*/
let dealer = "Alex";
let faceCards = {
    'J': 10,
    'Q': 10,
    'K': 10,
    'A': 11
}

let deck = {
    // deck needs to be mutable.
    Spades: [2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A'],
    Hearts: [2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A'],
    Diamonds: [2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A'],
    Clubs: [2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A']

};

const numberOfPlayers = () => {
    rl.question(`How many players are there? `, firstQuestion)
}
// Refactoring the Above
const firstQuestion = (answer) => {
    if (!(isNaN(answer))){
        console.log(`You responded ${answer} players. Is that correct?`);
        rl.question(`Y/N `, response =>{
                secondQuestion(response, answer)
        })

    }else if (Number(answer) > 1){
            console.log(`${answer} is too many players.`)
            numberOfPlayers();

    }
    else {
        console.log(`I'm sorry, ${answer} isn't a number. Try again.`);
        numberOfPlayers();
    }

}

const secondQuestion = (conf, answer) =>{
    console.log("conf:", conf)
    if (conf.toLowerCase() === 'y' || conf.toLowerCase() === 'yes'){
        console.log(`Understood `);
        let playerCount = answer;
        playerRoster(playerCount);
    }
    else if (conf.toLowerCase() === 'n' ||  conf.toLowerCase() === 'no'){
        console.log(`Understood.`);
        numberOfPlayers();
    }
    else {
        console.log(`I'll take that as a 'no'.`);
        numberOfPlayers();
    }
}


numberOfPlayers()
const handNumberizer = (hand) => {
    // this basically just lets us turn the original hand into numbers so it can be used for MATH.
    // there's probably a better way to do this but i suck at objects
    let numArr = [];
    hand.forEach(el => {
        if (Object.keys(faceCards).includes(el)){
            let newEl = faceCards[el]
            numArr.push(newEl);
        } else {
            numArr.push(el);
        }
    })
    return numArr;
}

const aceChecker = (hand) => {
    //this takes NUMBERS from handNumberizer, checks the array, and determines if an ace is 1 or 11
    let newHand = [];
    if (hand.includes(11)){
        hand.forEach(el => {
            if (el === 11){
                newHand.push(1);
            } else{
                newHand.push(el);
            }
        });
        return newHand;
    } else {
        return hand;
    }
}

const handSum = (hand) => {
    // this should look at a player's hand array and sum it.
    let sum = 0;
    sum = handNumberizer(hand).reduce((prevVal, currVal) => {
        return prevVal + currVal;
    }, sum);
    if (sum > 21){
        sum = 0;
        let fnlArr = aceChecker(handNumberizer(hand))
        sum = fnlArr.reduce((prevVal, currVal) => {
            return prevVal + currVal;
        }, sum);
        return sum;
    } else {
        return sum;
    }
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
    // Create a Recursive Function
    for (let i = 1; i <= playerCount; i++){
        rl.question(`Player ${i}, please enter your name.`, name => {
            roster[name] = []
        }); // put this into a function and recursively call it
    };
    roster[dealer] = [];
    //console.log("roster", roster);
    console.log(`Let's begin.`)
    firstDeal(roster);
    //console.log("roster", roster)
}

//playerRoster(3)


//this should return an object containing blank arrays for each player hand, the keys being each player's name.

// let numberOfDecks = (playerCount) => {
// // this might require deep duping?
// // instead of asking, just like. set the number of decks equal to the players
// // then copy the deck object that many times and concat them together?
// // i don't really wanna deal with it.
//     playerRoster(playerCount);
// };




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
    /* This will need functionality for multiple players, which means the roster object should also store a turn order to cycle through
    That is probably gonna be a pain in the ass.

    Anyway, the base functionality of the player turn should be...
    idk basically the same as the dealer turn but with readline stuff
    */
};

let victoryStorage = () => {};
// i think this is for determining what type of victory it outputs

let victory = () => {
//one of the more complicated helper functions?
/* Rules to note:
    1. Ties go to the Dealer.
    2. As long as one Player beats the Dealer, all Players who didn't bust win.
    3. If the Dealer draws a 21, the game ends immediately.
    4. If a Player draws a 21 and the Dealer does not, the game ends immediately.*/
};

// let testHand1 = ['A', 10, 2]
// let testHand2 = ['A', 'J']
// let testHand3 = ['J', 'Q', 'K']
// console.log(handSum(testHand1));
// console.log(handSum(testHand2));
// console.log(handSum(testHand3));
