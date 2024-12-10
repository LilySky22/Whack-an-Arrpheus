let currMoleTile;
let currPlantTile;
let score = 0;
let gameOver = false;
let timeLeft = 30;
let moleTimer, plantTimer, timerInterval;
let moleClickable = true;

function setGame() {
    const board = document.getElementById("board");
    board.innerHTML = "";

    for (let i = 0; i < 9; i++) {
        let tile = document.createElement("div");
        tile.id = i.toString();
        tile.addEventListener("click", selectTile);
        board.appendChild(tile);
    }

    score = 0;
    timeLeft = 30;
    gameOver = false;

    document.getElementById("score").innerText = "0";
    document.getElementById("timer").innerText = "Time Remaining: 30 Seconds";
}

function startGame() {
    if (gameOver) return;

    moleTimer = setInterval(setMole, 1500);
    plantTimer = setInterval(setPlant, 2000);

    timerInterval = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            document.getElementById("timer").innerText = "Time Remaining: " + timeLeft + " Seconds";
        } else {
            endGame("TIME'S UP! Final Score: " + score);
        }
    }, 1000);

    document.getElementById("startButton").disabled = true;
    document.getElementById("restartButton").disabled = false;
}

function restartGame() {
    clearInterval(moleTimer);
    clearInterval(plantTimer);
    clearInterval(timerInterval);
    setGame();
    document.getElementById("startButton").disabled = false;
    document.getElementById("restartButton").disabled = true;
}

function endGame(message) {
    gameOver = true;
    clearInterval(moleTimer);
    clearInterval(plantTimer);
    clearInterval(timerInterval);
    document.getElementById("score").innerText = message;
    document.getElementById("restartButton").disabled = false;
}

function getRandomTile() {
    let num = Math.floor(Math.random() * 9);
    return num.toString();
}

function setMole() {
    if (gameOver) return;

    if (currMoleTile) currMoleTile.innerHTML = "";
    moleClickable = true;

    let mole = document.createElement("img");
    mole.src = "img/monty-mole.png";

    let num = getRandomTile();
    if (currPlantTile && currPlantTile.id == num) return;
    if (num == 0) num = num + 1;

    currMoleTile = document.getElementById(num);
    currMoleTile.appendChild(mole);
}

function setPlant() {
    if (gameOver) return;

    if (currPlantTile) currPlantTile.innerHTML = "";

    let plant = document.createElement("img");
    plant.src = "img/piranha-plant.png";

    let num = getRandomTile();
    if (currMoleTile && currMoleTile.id == num) return;

    currPlantTile = document.getElementById(num);
    currPlantTile.appendChild(plant);
}

function selectTile() {
    if (gameOver) return;

    if (this == currMoleTile && moleClickable) {
        score += 10;
        document.getElementById("score").innerText = score.toString();
        moleClickable = false;
        setMole();
    } else if (this == currPlantTile) {
        endGame("GAME OVER! Final Score: " + score);
    }
}

window.onload = function () {
    setGame();
    document.getElementById("startButton").addEventListener("click", startGame);
    document.getElementById("restartButton").addEventListener("click", restartGame);
};
