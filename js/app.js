let activePlayer, roundScore, scores, gamePlaying;
initGame();

document.querySelector(".btn-roll").addEventListener("click", function() {
    if (gamePlaying) {
        const DICE1 = Math.floor(Math.random() * 6) + 1;
        const DICE2 = Math.floor(Math.random() * 6) + 1;

        //Display the result
        document.getElementById("dice-1").style.display = "block";
        document.getElementById("dice-2").style.display = "block";
        document.getElementById("dice-1").src = "dice-" + DICE1 + ".png";
        document.getElementById("dice-2").src = "dice-" + DICE2 + ".png";

        if (DICE1 !== 1 && DICE2 !== 1) {
            roundScore += DICE1 + DICE2;
            document.querySelector("#current-" + activePlayer).textContent = roundScore;
        } else {
            nextPlayer();
        }
    }
});


function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector(".player-0-panel").classList.toggle("active");
    document.querySelector(".player-1-panel").classList.toggle("active");

    document.getElementById("dice-1").style.display = "none";
    document.getElementById("dice-2").style.display = "none";
}


document.querySelector(".btn-hold").addEventListener("click", function() {
    if (gamePlaying) {
        scores[activePlayer] += roundScore;
        document.querySelector("#score-" + activePlayer).textContent = scores[activePlayer];
        document.querySelector("#current-" + activePlayer).textContent = "0";

        let resultForWinner = document.querySelector(".final-score").value;
        let winningScore;

        if (resultForWinner) {
            winningScore = resultForWinner;
        } else {
            winningScore = 100;
        }

        if (scores[activePlayer] >= winningScore) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.getElementById('dice-1').style.display = 'none';
            document.getElementById('dice-2').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
            document.querySelector(".btn-new").addEventListener("click", initGame)
        } else {
            nextPlayer();
        }
    }
});



function initGame() {
    activePlayer = 0;
    roundScore = 0;
    scores = [0, 0];
    gamePlaying = true;

    //Hide our cubes
    document.getElementById("dice-1").style.display = "none";
    document.getElementById("dice-2").style.display = "none";

    //Reset scores & current score
    document.getElementById("score-0").textContent = "0";
    document.getElementById("score-1").textContent = "0"
    document.getElementById("current-0").textContent = "0";
    document.getElementById("current-1").textContent = "0";
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}