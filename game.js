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

function printHelp(){
  console.log("Commands:");
  console.log("Type h at any time to review the list of commands.");
  console.log("Type 'q' at any time to end the game")
  console.log("Type 'hit' to draw another card");
  console.log("Type 'stand' to end your turn");
  console.log("Type 'hand' to list the contents of your hand.");
  console.log("Type 'table' to see everyone else's hands!");
  console.log("Split and double down functionality coming eventually.")
}

function startGame(){
  console.clear();
  rl.question(`  (@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@  
    (@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@  
    (@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@  
    (@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@  
    (@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@.@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@  
    (@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@(#@*&@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@  
    (@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ @@@@@.@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@  
    (@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@.&@@@@@@@#*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@  
    (@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@,%@@@@@@@@@@@(*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@  
    (@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@.@@@@@@@@@@@@@@@@#,@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@  
    (@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@&.@@@@@@@@@@@@@@@@@@@@@.@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@  
    (@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@.%@@@@@@@@@@@@@@@@@@@@@@@@@#*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@  
    (@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@(,@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@.#@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@  
    (@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@& @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@% @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@  
    (@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ #@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@/,@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@  
    (@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@**@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@,(@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@  
    (@@@@@@@@@@@@@@@@@@@@@@@@@@@@@#,@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@.%@@@@@@@@@@@@@@@@@@@@@@@@@@@@@  
    (@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@&(*/#@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@  
    (@@@@@@@@@@@@@@@@%              %(      @@@@@@@@@@@@          ,@@@@@@(          (.     *@@@      *@@@@@@@@@@@@@@@@@@  
    (@@@@@@@@@@@@@@@@%      @@%     ,#      @@@@@@@@@@@,           (@@@*            (.     *@@      (@@@@@@@@@@@@@@@@@@@  
    (@@@@@@@@@@@@@@@@%      @@@*    ,#      @@@@@@@@@@(     ,       @@.            .@.     *@      %@@@@@@@@@@@@@@@@@@@@  
    (@@@@@@@@@@@@@@@@%      ,.      *#      @@@@@@@@@@     ,@@       %        %@@@@@@.            &@@ @@@@@@@@@@@@@@@@@@  
    (@@@@@@@@@@@@@@@@%             .@(      @@@@@@@@@.     @@@(     .(       *@@@@@@@.           (@@@@@ @@@@@@@@@@@@@@@@  
    (@@@@@@@@@@@@@@.@%      @@@/    ,#      @@@@@@@@/     ,%%%%.     &             /@.     ,/     .@@@@@#/@@@@@@@@@@@@@@  
    (@@@@@@@@@@@@@.@@%      @@@*    ,#      @@@@@@@&                 ,(             %.     *@#      @@@@@@ @@@@@@@@@@@@@  
    (@@@@@@@@@@@@.@@@%              ,#            @      %@@@@@@/      @.           (.     *@@#      #@@@@@.@@@@@@@@@@@@  
    (@@@@@@@@@@@,&@@@%             ,@@&&&&&&&&   %&&&&&&&@@@@@@@@.   (&%((#&%*&&&&&&@%  .&&&@@@@&     ,@@@@%(@@@@@@@@@@@  
    (@@@@@@@@@@@.@@@@@@@@@@@@@@@@@@@@%       %@@@,          @@@@@@@,         .#      @@@/      @@@@@@@@@@@@@.@@@@@@@@@@@  
    (@@@@@@@@@@##@@@@@@@@@@@@@@@@@@@@%       %@@#           ,@@@@            .#      @@*     .@@@@@@@@@@@@@@*@@@@@@@@@@@  
    (@@@@@@@@@@(%@@@@@@@@@@@@@@@@@@@@%       %@@             #@%             ##      @.     .@@@@@@@@@@@@@@@*@@@@@@@@@@@  
    (@@@@@@@@@@&,@@@@@@@@@@@@@@@@@@@@%       %@      @@       @.       .&@@%#@#            /@@@@@@@@@@@@@@@@.@@@@@@@@@@@  
    (@@@@@@@@@@@ &@@@@@@@@@@@%, .@@@@%       %/     (@@&      &        @@@@@@@#           ,@@@@@@@@@@@@@@@@#*@@@@@@@@@@@  
    (@@@@@@@@@@@@ @@@@@@@@@@*    @@@@*       &      @@@@/     (,             @#      #      @@@@@@@@@@@@@@@ @@@@@@@@@@@@  
    (@@@@@@@@@@@@@ @@@@@@@@@(               @                  &             .#      @&      %@@@@@@@@@@@% @@@@@@@@@@@@@  
    (@@@@@@@@@@@@@@*/@@@@@@@@/             (,     .&&&&&&%      ((           .#      @@@      *@@@@@@@@@,#@@@@@@@@@@@@@@  
    (@@@@@@@@@@@@@@@@//@@@@@@@@#          *#      @@@.@@@@/      *@@,        .#      @@@@       @@@@@@.#@@@@@@@@@@@@@@@@  
    (@@@@@@@@@@@@@@@@@@@,/@@@@@@@@@@@@@@@@@@@@@@@@@,#@@@@@@@/@@&%@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@,*@@@@@@@@@@@@@@@@@@@  
    (@@@@@@@@@@@@@@@@@@@@@@%./@@@@@@@@@@@@@@@@@@%.&@@@@@@@@@.@@&,@@@@@@@@@%.&@@@@@@@@@@@@@@@@@&*.&@@@@@@@@@@@@@@@@@@@@@@  
    (@@@@@@@@@@@@@@@@@@@@@@@@@@@@(, .,/((/*,./@@@@@@@@@@@@@%*@@@ @@@@@@@@@@@@@&*.,//((/,..,#@@@@@@@@@@@@@@@@@@@@@@@@@@@@  
    (@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@.@@@@&,@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@  
    (@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@,#@@@@@//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@  
    (@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@.#@@@@@@@*/@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@  
    (@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ @@@@@@@@@@%.@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@  
    (@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*(@@@@@@@@@@@@@*#@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@  
    (@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*%@@@@@@@@@@@@@@@@@//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@  
    (@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@  
    (&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&& `, () => {
      console.clear();
      console.log(`Node Blackjack ver. 0.2
      Developed by Alex Hiller, Megha Sahgal, and Brody Owen`);

      Loader.loadCards(cardData);
      

      printHelp();

      rl.question("Press the 'Any' key to begin your Blackjack adventure!", () => {
      
      console.clear();
      numberOfPlayers();
      });
    });
}

const numberOfPlayers = () => {
  rl.question(`First of all, how many players are there? `, firstQuestion)
}

const firstQuestion = (answer) => {
  if (!(isNaN(answer)) && Number(answer) <= 7){
      console.clear();
      console.log(`You responded ${answer} players. Is that correct?`);
      rl.question(`Y/N `, response =>{
              secondQuestion(response, answer)
      })

  }else if (Number(answer) > 7){
          console.clear();
          console.log(`The table limit is 7 players, bud.`)
          numberOfPlayers();

  }
  else {
      console.clear();
      console.log(`${answer} isn't a number. Try harder next time.`);
      numberOfPlayers();
  }

}

const secondQuestion = (conf, answer) =>{
  if (conf.toLowerCase() === 'y' || conf.toLowerCase() === 'yes'){
      console.clear();
      console.log(`Understood `);
      let playerCount = answer;
      playerRoster(playerCount);
  }
  else if (conf.toLowerCase() === 'n' ||  conf.toLowerCase() === 'no'){
      console.clear();
      console.log(`Understood.`);
      numberOfPlayers();
  }
  else {
      console.clear();
      console.log(`I'll take that as a 'no'.`);
      numberOfPlayers();
  }
}

let playerRoster = (playerCount) => {
  let roster = new Roster(1, [], playerCount);
  let deck = Loader.deckMerge(roster);
  recursiveQuestion(playerCount, roster, deck);
}

let n = 1
let recursiveQuestion = (playerCount, roster, deck) => {
    if(playerCount === 0){
        let dealer = new Dealer("Dealer", 0);
        roster.dealerTurnSet(dealer);
        roster.addToRoster(dealer);
        console.clear();
        firstDeal(roster, deck);
    }
    else{
    console.clear();
    rl.question(`Player ${n}, please enter your name. `, name => {
        console.log(roster.playerCount);
        let player = new Player(name, n, true);
        roster.addToRoster(player);
        n++
        recursiveQuestion((playerCount - 1), roster, deck);
    }); 
    }
}

let firstDeal = (roster, deck) => {
  deck.setDeck(roster);
  deck.shuffle();
  for(let i = 0; i < 2; i++){
    for(let j = 0; j < roster.actorStorage.length; j++){
      this.roster.actorStorage[j].hit(roster, deck);
    }
  }
  andNowWeActuallyBegin(roster, deck);
}

let andNowWeActuallyBegin = (roster, deck) => {
  rl.question("Let's begin.", response => {
    playerTurn(roster, deck);
  })
}

let printTurn = (player) => {
  console.clear();
  console.log(`${player.name}
  Hand: ${player.displayHand}
  Card Total: ${player.sumHand()}
  Cash: $${player.cash}`);
}

let playerTurn = (roster, deck) => {
  if (roster.actorStorage[roster.turnOrder - 1].name !== 'Dealer'){
    let player = roster.actorStorage[roster.turnOrder - 1];
    printTurn(player);
  } else {
    dealerTurn(roster, deck);
  }


  rl.question(`First, place your bet. 
  > $`, bet => {
    if (player.betMoney(bet)){
      console.log("Now, what will you do?")
      processInput(roster, deck, player);
    }
    else {
      console.log(`Try entering a VALID bet.`);
      rl.question("You know, like an amount less than or equal to the cash you've got on you.", response => {
        playerTurn(roster, deck);
      });
    }
  });
}

let processInput = (roster, deck, player) => {

  rl.question('> ', cmd => {
    cmd = cmd.toLowerCase();

    if(cmd === 'h'){
      printHelp();
    }

    else if(cmd === 'q'){
      rl.close();
      process.exit();
    }

    else if(cmd === 'hit'){
      player.hit(roster, deck);
      if(!player.victory){
        player.stand(roster);
        playerTurn(roster, deck);
      }
    }

    else if(cmd === 'stand'){
      player.stand(roster);
      playerTurn(roster, deck);
    }

    else if(cmd === 'hand'){
      player.handInspect();
    }

    else if(cmd === 'table'){
      roster.tableInspect(player);
    }
    
    rl.question("", response => {
      printTurn(player);
      processInput(roster, deck, player);
    });
  });
}