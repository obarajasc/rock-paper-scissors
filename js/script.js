function getRandomInt(min, max){
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getComputerSelection(){
    return gameOptions.get(getRandomInt(0,2));
}

function getPlayerSelection(){
    let playerSelection;
    while(true){
        console.info("Select an option my friend!");
        playerSelection = prompt("Choose: Rock, Paper, or Scissors!");
        playerSelection = playerSelection.toUpperCase();
        switch(playerSelection.toUpperCase()){
            case "ROCK":
                return playerSelection;
                break;
            case "PAPER":
                return playerSelection;
                break;
            case "SCISSORS":
                return playerSelection;
                break;
            default: 
                console.warn("--- Invalid option my friend 😔 ---");
                console.warn(playerSelection);
                continue;
        }
    }
}

function getMatchWinner(computerSelection, playerSelection){
    console.log("Compute Selected: " + computerSelection + " Player Selected: " + playerSelection );

    if(gameWinOptions.get(computerSelection) === playerSelection){
        return "Computer won 😝";
    }else if(computerSelection===playerSelection){
        return "No one won 😔";
    }
    return "You won 😊";
}

const gameOptions = new Map();

gameOptions.set(0, "ROCK");
gameOptions.set(1, "PAPER");
gameOptions.set(2, "SCISSORS");

const gameWinOptions = new Map();

gameWinOptions.set("ROCK","SCISSORS");
gameWinOptions.set("PAPER","ROCK");
gameWinOptions.set("SCISSORS","PAPER");

function playGame(matches){
    
    for(;matches>0;matches--){
        let computerSelection = getComputerSelection();
        let playerSelection = getPlayerSelection();

        console.log(getMatchWinner(computerSelection, playerSelection));
    }
}

playGame(5);

