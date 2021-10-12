'use strict';

// Selecting Elements
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const score0El = document.querySelector("#score--0");
const score1El = document.querySelector("#score--1");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");

const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

let currentScore,scores,activePlayer,isPlaying;

// Initial Conditions
function init() {
    currentScore = 0;
    scores = [0,0];
    activePlayer = 0;
    isPlaying = true;
    current0El.textContent = 0;
    current1El.textContent = 0;
    score0El.textContent = 0;
    score1El.textContent = 0;
    diceEl.classList.add("hidden");
    player0El.classList.remove("player--winner");
    player1El.classList.remove("player--winner");
    player0El.classList.add("player--active");
    player1El.classList.remove("player--active");
}
init();

const switchPlayer = function() {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = (activePlayer === 0 ? 1 : 0);
    player0El.classList.toggle("player--active");
    player1El.classList.toggle("player--active");
};

//Rolling the dice functionality
btnRoll.addEventListener("click", function() {
    if (isPlaying) {
    //generating the random dice number to be ralled
    const diceNumber = Math.trunc(Math.random() * 6) + 1;

    // Displaying the dice image accoring to number rolled
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${diceNumber}.png`;

    if (diceNumber !== 1) {
        currentScore += diceNumber;
        document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    } else {
        switchPlayer();
    }
}
});

btnHold.addEventListener("click", function() {
    if (isPlaying) {
        
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
    
    if (scores[activePlayer] >= 100) {
        document.querySelector(`.player--${activePlayer}`).classList.add("player--winner");
        document.querySelector(`.player--${activePlayer}`).classList.remove("player--acitve");
        isPlaying = false;
        diceEl.classList.add("hidden");
    } else {
        switchPlayer();
    }
}
});

btnNew.addEventListener("click", init);
