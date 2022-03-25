const readline = require('readline');

const {Actor} = require("./class/actor.js");
const {Player} = require("./class/player.js");
const {Dealer} = require("./class/dealer.js");
const {Roster} = require("./class/roster.js");
const {Deck} = require("./class/deck.js");
const {Card} = require("./class/card.js");
const {Loader} = require("./class/loader.js");

const cardData = require("./data/card-data.js");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });