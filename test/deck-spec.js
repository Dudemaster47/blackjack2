const { expect } = require('chai');

const {Actor} = require("../class/actor.js");
const {Player} = require("../class/player.js");
const {Dealer} = require("../class/dealer.js");
const {Roster} = require("../class/roster.js");
const {Deck} = require("../class/deck.js");
const {Card} = require("../class/card.js");
const {Loader} = require("../class/loader.js");




describe('Card', function(){
    let card;
    let card2;
    let card3;
    let deck;

    beforeEach(function(){
    //create a set of test cards
    //create a test deck
    card = new Cards('AS', 'Ace', 11, 1, 'Spades');
    card2 = new Cards('JH', 'Jack', 10, 10, 'Hearts');
    card3 = new Cards('2C', 'Two', 2, 2, 'Clubs');
    deck = new Deck(1, []);
    })


    it('should have an id, value, altValue, and suit property', function(){
        expect(card.id).to.equal('AS');
        expect(card.name).to.equal('Ace');
        expect(card.value).to.equal(11);
        expect(card.altValue).to.equal(1);
    });

    it('should have an aceChecker method that swaps all values with altValues for summation', function(){
        let player = new Player("John Doe", 1, true);
        player.hand = ['AS', 'JH'];
        expect(player.sumHand()).to.equal(21);
        player.hand.push(card3);
        expect(player.sumHand()).to.equal(13);

        //this hides what aceChecker does but...
        //it should basically be called by player.sumHand whenever it gets over 21
        //then it just sums the hand with the cards' alt values and returns that instead.
    });

    it('should have an ASCII art card to show off when displayed in a hand', function(){
        //this is a tomorrow job
    })
    
});

describe ('Deck', function(){
    let deck;

    beforeEach(function(){
        //create a set of test cards
        //create a test deck
       
        deck = new Deck(1, []);
        });

        it('should have an id property that defines which deck it is', function(){
            expect(deck.id).to.equal(1);
        });

        it('should have a stack property that defaults to empty', function(){
            expect(deck.stack.length).to.equal(0);
        });

        it('should have 52 total cards in the stack when shuffled', function(){
            expect(deck.stack.length).to.equal(0);
            deck.shuffle();
            expect(deck.stack.length).to.equal(52);
            //also the stack should be randomized but i don't really know how to test for that
        });

});