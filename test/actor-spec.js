const { expect } = require('chai');

const {Actor} = require("../class/actor.js");
const {Player} = require("../class/player.js");
const {Dealer} = require("../class/dealer.js");
const {Roster} = require("../class/roster.js");
const {Deck} = require("../class/deck.js");
const {Cards} = require("../class/cards.js");



describe ('Actor', function (){
    let actor;
    let deck;
    
    beforeEach(function(){
        // create a test actor
        roster = new Roster(1, [], 1);
        actor = new Actor("John Doe", 1, []);
        // create a test deck
        deck = new Deck([2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A'], [], [], []);
        
    })
    
    it('should have a name, a turn ID, and a hand consisting of an empty array', function (){  
        expect(actor.name).to.equal("John Doe");
        expect(actor.turnID).to.equal(1);
        expect(actor.hand).to.equal([]);
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
       expect(deck.spades.length).to.equal(13);
       actor.hit();
       expect(actor.hand.length).to.equal(1);
       expect(deck.spades.length).to.equal(12);

       //that should be sufficient for this test
    });

    it('should be able to sum the cards in its hand', function(){
        expect(actor.sumHand()).to.equal(0);
        actor.hand = ['A', 'J'];
        expect(actor.sumHand()).to.equal(21);
    });

    it('should bust if its hand exceeds 21 in value', function(){
        actor.hand = ['A', 'J', 2];
        expect(actor.bust()).to.be.true;
        // bust should be called by sumHand after displaying the player's total
        // y'know, provided their total exceeds 21.
    });

    //REVISIT
    it('should add itself to the roster on creation', function(){
        // this will have to be a method called by the constructor i believe
        // that said... if it happens on creation it basically just calls for checking the roster.
        expect(roster.actorStorage[0][actor.name]).to.equal(actor.turnID);
        // god that's ugly... and I'm not sure that's the right way to go about this.
        // i'll revisit this one as I'm testing.
    });

    it("should update the roster's hand data every time its hand is modified", function(){
        expect(roster.actorStorage[0][actor.hand].length).to.equal(0);
        actor.hit();
        expect(roster.actorStorage[0][actor.hand].length).to.equal(1);
    });

    it('should be able to declare its turn over and move to the next actor', function(){
        let actor2 = new Actor("Jane Doe", 2, [5, 'K']);
        actor.hand = ['A', 'J']

        expect(roster.turnOrder).to.equal(1);
        expect(roster.currentPlayer()).to.equal(actor.name);
        expect(roster.currentHand()).to.equal(actor.hand);
        // the actor.stand() method should tick up the roster's turn order
        // then it should call a method in the roster class that checks the turnStorage
        // when it determines whose turn it is, it 'gets' the information fo that person
        // then it says it's their turn and display their hand.
        actor.stand();
        expect(roster.turnOrder).to.equal(2);
        expect(roster.turnOrder).to.equal(roster.actorStorage[1][actor2.name]);
        expect(roster.currentPlayer()).to.equal(actor2.name);
        expect(roster.currentHand()).to.equal(actor2.hand);

    });
});

//PHEW.

describe ('Player', function(){
    beforeEach(function(){
        // create a test actor
        roster = new Roster(1, []);
        player = new Player("John Doe", 1, []);
        // create a test deck
        deck = new Deck([2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A'], [], [], []);
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
    })

    it('should have a bet method that sets the value of the bet attribute', function(){
        expect(player.bet).to.equal(0);
        player.bet(50);
        expect(player.bet).to.equal(50);
    })

    it('should have a win method that adds the bet to its cash total', function(){
        expect(player.cash).to.equal(100);
        player.bet(50);
        player.win();
        expect(player.cash).to.equal(150);
    });

    it('should payout 1.5x the bet if the player wins with a natural blackjack', function(){
        player.hand = ['A', 'J'];
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

    it('should update the player count in the roster on creation', function(){
        expect(roster.playerCount).to.equal(1);
        let player2 = new Player("Jane Doe", 2, [5, 'K']);
        expect(roster.playerCount).to.equal(2);
    })
});

//PHEW...