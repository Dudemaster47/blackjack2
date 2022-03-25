const { expect } = require('chai');

const {Actor} = require("../class/actor.js");
const {Player} = require("../class/player.js");
const {Dealer} = require("../class/dealer.js");
const {Roster} = require("../class/roster.js");
const {Deck} = require("../class/deck.js");
const {Cards} = require("../class/cards.js");




describe('Card', function(){
    let card;
    let card2;
    let card3;
    let deck;

    beforeEach(function(){
    //create a set of test cards
    //create a test deck
    card = new Cards('A', 11, 1);
    card2 = new Cards('J', 10, 10);
    card3 = new Cards(2, 2, 2);
    deck = new Deck([2, 'J', 'A'], [], [], []);
    })


    it('should have an id, value, and altValue property', function(){
        expect(card.id).to.equal('A');
        expect(card.value).to.equal(11);
        expect(card.altValue).to.equal(1);
    });

    it('should have an aceChecker method that swaps all values with altValues for summation', function(){
        let player = new Player("John Doe", 1, ['A', 'J'], true);
        expect(player.sumHand()).to.equal(21);
        player.hand.push(card3);
        expect(player.sumHand()).to.equal(13);

        //this hides what aceChecker does but...
        //it should basically be called by player.sumHand whenever it gets over 21
        //then it just sums the hand with the cards' alt values and returns that instead.
    });
    
});

describe ('Deck', function(){
    let card2;
    let card3;
    let card4;
    let card5;
    let card6;
    let card7;
    let card8;
    let card9;
    let card10;
    let card11;
    let card12;
    let card13;
    let card14;
    let deck;

    beforeEach(function(){
        //create a set of test cards
        //create a test deck
        card2 = new Cards(2, 2, 2);
        card3 = new Cards(3, 3, 3);
        card4 = new Cards(4, 4, 4);
        card5 = new Cards(5, 5, 5);
        card6 = new Cards(6, 6, 6);
        card7 = new Cards(7, 7, 7);
        card8 = new Cards(8, 8, 8);
        card9 = new Cards(9, 9, 9);
        card10 = new Cards(10, 10, 10);
        card11 = new Cards('J', 10, 10);
        card12 = new Cards('Q', 10, 10);
        card13 = new Cards('K', 10, 10);
        card14 = new Cards('A', 11, 1);
        deck = new Deck([], [], [], []);
        });
    
        it('should be created with 13 cards in every suit', function(){
            expect(deck.spades.length).to.equal(0);
            expect(deck.hearts.length).to.equal(0);
            expect(deck.diamonds.length).to.equal(0);
            expect(deck.clubs.length).to.equal(0);
            deck.shuffle();
            expect(deck.spades.length).to.equal(13);
            expect(deck.hearts.length).to.equal(13);
            expect(deck.diamonds.length).to.equal(13);
            expect(deck.clubs.length).to.equal(13);
        });

        it('should randomly choose suits and cards in each suit when dealing', function(){

        });

        it('should remove cards from its arrays when they are dealt', function(){

        });

        it('should be able to be combined with other decks', function(){

        });

        it('should have a quantity of decks related to the player count', function(){

        });
});