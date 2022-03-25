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
        //then it just...sums the hand with the cards' alt values and returns that instead.
    });
});