const { expect } = require('chai');

const {Actor} = require("../class/actor.js");
const {Player} = require("../class/player.js");
const {Dealer} = require("../class/dealer.js");
const {Roster} = require("../class/roster.js");
const {Deck} = require("../class/deck.js");
const {Card} = require("../class/card.js");
const {Loader} = require("../class/loader.js");



describe ('Actor', function (){
    let actor;
    let roster;
    let deck;
    
    beforeEach(function(){
        // create a test actor
        roster = new Roster(1, [], 1);
        actor = new Actor("John Doe", 1, true);
        // create a test deck
        deck = new Deck(1, ['2S', '3S', '4S', '5S', '6S', '7S', '8S', '9S', '10S', 'JS', 'QS', 'KS', 'AS']);
        
    })
    
    it('should have a name, a turn ID, and a hand consisting of an empty array', function (){  
        expect(actor.name).to.equal("John Doe");
        expect(actor.turnID).to.equal(1);
        expect(actor.hand).to.equal([]);
    });

    it('should have a victory property that defaults to true', function(){
        expect(actor.victory).to.be.true;
    });

    it('should not be an instance of Player or Dealer', function (){
        expect(actor instanceof Player).to.be.false;
        expect(actor instanceof Dealer).to.be.false;
    });

    it('should be able to add random cards to their hand from a deck', function(){
        /* 
        This one's a bit complicated... technically it should only test a single method,
        but that method itself needs multiple other methods within the Deck class in order to 
        facilitate it.
        */
       expect(actor.hand.length).to.equal(0);
       expect(deck.stack.length).to.equal(13);
       actor.hit();
       expect(actor.hand.length).to.equal(1);
       expect(deck.stack.length).to.equal(12);

       //that should be sufficient for this test
    });

    it('should be able to sum the cards in its hand', function(){
        expect(actor.sumHand()).to.equal(0);
        actor.hand = ['AS', 'JS'];
        expect(actor.sumHand()).to.equal(21);
    });

    it('should bust if its hand exceeds 21 in value', function(){
        actor.hand = ['AS', 'JS', '2S'];
        expect(actor.bust()).to.be.true;
        expect(actor.victory).to.be.false;
        // bust should be called by sumHand after displaying the player's total
        // y'know, provided their total exceeds 21.
    });

    it('should be able to get cards by their ids', function(){
        let card = new Cards('AS', 11, 1, 'Spades');
        actor.hand.push(card);
        expect(actor.hand.length).to.equal(1);
        expect(actor.getCardByID('AS')).to.equal(card);
    });

    //REVISIT
    it('should add itself to the roster on creation', function(){
        // this will have to be a method called by the constructor i believe
        // that said... if it happens on creation it basically just calls for checking the roster.
        expect(roster.actorStorage[0].name).to.equal(actor.name);
        // god that's ugly... and I'm not sure that's the right way to go about this.
        // i'll revisit this one as I'm testing.
    });

    it("should update the roster's hand data every time its hand is modified", function(){
        expect(roster.actorStorage[0][actor.hand].length).to.equal(0);
        actor.hit();
        expect(roster.actorStorage[0][actor.hand].length).to.equal(1);
    });

    it('should be able to declare its turn over and move to the next actor', function(){
        let actor2 = new Actor("Jane Doe", 2, ['5S', 'KS'], true);
        actor.hand = ['AS', 'JS']

        expect(roster.turnOrder).to.equal(1);
        expect(roster.currentPlayer()).to.equal(actor);
        // the actor.stand() method should tick up the roster's turn order
        // then it should call a method in the roster class that checks the turnOrder
        // when it determines whose turn it is, it 'gets' the information for that person
        // then it says it's their turn.
        actor.stand();
        expect(roster.turnOrder).to.equal(2);
        expect(roster.turnOrder).to.equal(roster.actorStorage[1][actor2.name]);
        expect(roster.currentPlayer()).to.equal(actor2);

    });
});

//PHEW.

describe ('Player', function(){
    let player;
    let roster;
    let deck;
    let dealer;

    beforeEach(function(){
        // create a test actor
        roster = new Roster(1, [], 0);
        player = new Player("John Doe", 1, true);
        dealer = new Dealer("Dealer", 0);
        // create a test deck
        deck = new Deck(1, ['2S', '3S', '4S', '5S', '6S', '7S', '8S', '9S', '10S', 'JS', 'QS', 'KS', 'AS']);
    });

    it('should inherit from the Actor class', function(){
        expect(player instanceof Actor).to.be.true;
        expect(player instanceof Player).to.be.true;
        expect(player instanceof Dealer).to.be.false;
    });

    it('should have a cash attribute that defaults to $100', function(){
        expect(player.cash).to.equal(100);
    });

    it('should have a bet attribute that defaults to $0.', function(){
        expect(player.bet).to.equal(0);
    });

    it('should have a betMoney method that sets the value of the bet attribute', function(){
        expect(player.bet).to.equal(0);
        player.betMoney(50);
        expect(player.bet).to.equal(50);
    });

    it('should not allow you to bet more than you have', function(){
        player.cash = 100;
        player.bet = 0;
        expect(player.betMoney(99)).to.be.true;
        expect(player.bet).to.equal(99);
        expect(player.betMoney(101)).to.be.false;
        expect(player.bet).to.equal(0);

        //the purpose of this is just because all betMoney does is change the player.bet property...
        //so it also can return true or false so the readline function that calls it can have a conditional that
        //y'know. throws sass if it's false.
    });

    it('should have a win method that adds the bet to its cash total', function(){
        expect(player.cash).to.equal(100);
        player.bet(50);
        player.win();
        expect(player.cash).to.equal(150);
    });

    it('should payout 1.5x the bet if the player wins with a natural blackjack', function(){
        player.hand = ['AS', 'JS'];
        player.bet(50);
        expect(player.cash).to.equal(100);
        player.win();
        expect(player.cash).to.equal(175);
    });

    it('should have a lose method that removes the bet from its cash total', function(){
        expect(player.cash).to.equal(100);
        player.bet(50);
        player.lose();
        expect(player.cash).to.equal(50);
    });

    it('should have a method that sets the victory property to false if it ties with the dealer', function(){
        player.hand = ['KS', '10S'];
        dealer.hand = ['AS', '9S'];
        player.tieCheck();
        expect(player.victory).to.be.false;
    });

    it("should have a method that sets victory to false if its hand sums to less than the Dealer's", function(){
        player.hand = ['6S', '10S'];
        dealer.hand = ['AS', 'JS'];
        player.lossCheck();
        expect(player.victory).to.be.false;
        //note that loss check should have a clause if the dealer's hand exceeds 21
        // it determines both if the player's hand is less than the dealer's
        // and if the dealer has busted.
    })

    it('should update the player count in the roster on creation', function(){
        expect(roster.playerCount).to.equal(1);
        let player2 = new Player("Jane Doe", 2, ['5S', 'KS']);
        expect(roster.playerCount).to.equal(2);
    });
});

//PHEW...

describe ('Dealer', function(){
    let player;
    let roster;
    let deck;
    let dealer;

    beforeEach(function(){
        // create a test actor
        roster = new Roster(1, [], 0);
        player = new Player("John Doe", 1, true);
        dealer = new Dealer("Dealer", 0);
        // create a test deck
        deck = new Deck(1, ['2S', '3S', '4S', '5S', '6S', '7S', '8S', '9S', '10S', 'JS', 'QS', 'KS', 'AS']);
    });

    it('should inherit from the Actor class', function(){
        expect(dealer instanceof Actor).to.be.true;
        expect(dealer instanceof Dealer).to.be.true;
        expect(dealer instanceof Player).to.be.false;
    });

    it('should always go last in the turn order', function(){
        //should have a method on creation that checks the player count from the roster
        //then sets the dealer's turn ID to that number plus 1.
        dealer.turnSet();
        expect(dealer.turnID).to.equal(roster.playerCount + 1);
    });

    it('should determine if its hand sums to over or under 17', function(){
        dealer.hand = ['5S', '7S'];
        expect(dealer.checkSeventeen()).to.be.false;

        dealer.hand = ['AS', '6S'];
        expect(dealer.checkSeventeen()).to.be.true;
    });

    it('should hit if checkSeventeen returns false', function(){
        //it needs a turn method that runs checkSeventeen then decides whether to hit or stay based on its hand sum
        dealer.hand = ['5S', '7S'];
        expect(dealer.hand.length).to.equal(2);
        dealer.turn();
        expect(dealer.hand.length).to.equal(3);
    });

    it('should stand if checkSeventeen returns true', function(){
        dealer.hand = ['AS', '9S'];
        expect(dealer.hand.length).to.equal(2);
        dealer.turn();
        expect(dealer.hand.length).to.equal(2);
        expect(roster.turnOrder).to.equal(dealer.turnID + 1);
    });

});

/* I don't think the dealer needs a victory check, 
since the players' victory checks are checked against its hand anyway

Anyway that should be a good set of test specs for the actors...
*/