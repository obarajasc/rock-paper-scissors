function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getComputerSelection() {
    return gameOptions.get(getRandomInt(0, 2));
}

function getPlayerSelection(imageSelectedPath) {
    const match = imageSelectedPath.match(/\/([^/]+)\.\w+$/);
    const selection = match ? match[1] : null;
    let playerSelection = selection.toUpperCase();
    switch (playerSelection.toUpperCase()) {
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
    }
}


function getMatchWinner(computerSelection, playerSelection) {

    if (gameWinOptions.get(computerSelection) === playerSelection) {
        return "Computer";
    } else if (computerSelection === playerSelection) {
        return "Tie";
    }
    return "Player";
}

function calculatePoints(winner) {

    winner = winner.toUpperCase();

    if (winner === "COMPUTER") {
        computerPoints++;
    } else if (winner === "PLAYER") {
        playerPoints++;
    }

}

function isGameOver() {

    if (computerPoints >= 5 || playerPoints >= 5) {
        return true;
    }
    return false;
}

function displayMatchWinner(matchWinnerResult) {
    const gameResultsElement = document.querySelector(".game-results");

    if (gameResultsElement) {

        const matchRoundElement = gameResultsElement.querySelector(".match-round");
        const matchWinnerElement = gameResultsElement.querySelector(".match-winner");
        if (matchRoundElement && matchWinnerElement) {
            let paragraph = document.createElement("p");
            let textNode = document.createTextNode(`${round}`);

            paragraph.appendChild(textNode);
            gameResultsElement.appendChild(paragraph);
            matchRoundElement.appendChild(paragraph);

            paragraph = document.createElement("p");
            textNode = document.createTextNode(`${matchWinnerResult}`);

            paragraph.appendChild(textNode);
            gameResultsElement.appendChild(paragraph);
            matchWinnerElement.appendChild(paragraph);
        }

        round++;
    }
}

function displayGameWinner() {
    const gameWinnerElement = document.querySelector(".game-winner");

    if (gameWinnerElement) {

        const paragraph = document.createElement("p");
        let winnerText = "";
        if (computerPoints > playerPoints) {
            winnerText = "The Computer ☠️"
        } else {
            winnerText = "You 😈"
        }

        const textNode = document.createTextNode(`The Game winner is ${winnerText}`);
        paragraph.appendChild(textNode);
        gameWinnerElement.appendChild(paragraph);
    }
}

const gameClickHandler = function (event) {

    const imageSelectedPath = event.target.getAttribute("src");
    const playerSelection = getPlayerSelection(imageSelectedPath);
    const computerSelection = getComputerSelection();
    const matchWinnerResult = getMatchWinner(computerSelection, playerSelection);
    calculatePoints(matchWinnerResult);
    if (isGameOver()) {
        endGame(matchWinnerResult);
    } else {
        displayMatchWinner(matchWinnerResult);
    }

}

function addImageListeners() {
    const imgElements = document.querySelectorAll("img");

    imgElements.forEach(imgElement => {
        imgElement.addEventListener("click", gameClickHandler);
    });
}

function cleanResults() {
    const gameResultsElement = document.querySelector(".game-results");
    if (gameResultsElement) {

        const paragraphElements = gameResultsElement.querySelectorAll('p');
        paragraphElements.forEach(paragraphElement => {
            paragraphElement.remove();
        });

        const endGameElement = document.querySelector(".end-game");
        if (endGameElement) {
            const paragraphElements = endGameElement.querySelectorAll('p');
            paragraphElements.forEach(paragraphElement => {
                paragraphElement.remove();
            });

            const buttonsElements = endGameElement.querySelectorAll("button");
            buttonsElements.forEach(buttonsElement => {
                buttonsElement.remove();
            });
        }
    }
}

function restartCounters() {
    round = 1;
    playerPoints = 0;
    computerPoints = 0;
}

const startGame = function () {

    restartCounters()
    cleanResults();
    addImageListeners();

}

function removeImageListeners() {
    const imgElements = document.querySelectorAll("img");

    imgElements.forEach(imgElement => {
        imgElement.removeEventListener("click", gameClickHandler);
    });
}

function createRestartButton() {
    const endGameElement = document.querySelector(".end-game");
    const button = document.createElement("button");
    const textNode = document.createTextNode(`Play Again`);
    button.appendChild(textNode);
    endGameElement.appendChild(button);

    button.addEventListener("click", startGame);
}


function endGame(matchWinnerResult) {

    displayGameWinner(matchWinnerResult);
    removeImageListeners();
    createRestartButton();

}

const gameOptions = new Map();

gameOptions.set(0, "ROCK");
gameOptions.set(1, "PAPER");
gameOptions.set(2, "SCISSORS");

const gameWinOptions = new Map();

gameWinOptions.set("ROCK", "SCISSORS");
gameWinOptions.set("PAPER", "ROCK");
gameWinOptions.set("SCISSORS", "PAPER");

let round = 0;
let playerPoints = 0;
let computerPoints = 0;

startGame();