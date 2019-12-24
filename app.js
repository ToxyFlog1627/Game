/*
 * Rules:

 - The game has 2 players, playing in rounds
 - In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
 - BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
 - The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
 - The first player to reach 100 points on GLOBAL score wins the game

*/
//  Seting variables
let activePlayer,roundScore, score, gamePlaying;

// Toggle players function
function togglePlayers(){
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.querySelector('.dice').style.display = 'none';
}

// Zeroing function
function clearAll(){
    document.querySelector('.dice').style.display = 'none'; 
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = "0";
    document.getElementById('current-0').textContent = "0";
    document.getElementById('current-1').textContent = "0";
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    activePlayer = 0;
    scores = [0, 0];
    roundScore = 0;
    gamePlaying = true;
}

clearAll();

// Roll button
document.querySelector('.btn-roll').addEventListener('click', function () {
    if(gamePlaying){
        let dice = Math.floor(Math.random() * 6) + 1;
        let diceDOM = document.querySelector('.dice');

        diceDOM.style.display = 'block';
        diceDOM.src = "dice-" + dice + ".png";

        if (dice !== 1) {
            roundScore += dice;
            document.getElementById('current-' + activePlayer).textContent = roundScore;
        } else {
            togglePlayers();
        }
    }
});

// Hold button
document.querySelector('.btn-hold').addEventListener('click', function(){
    if(gamePlaying && roundScore !== 0){
        scores[activePlayer] += roundScore;

        document.getElementById('score-0').textContent = scores[0];
        document.getElementById('score-1').textContent = scores[1];
    
        if(scores[activePlayer] >= 100){
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-0-panel').classList.remove('active');
            document.querySelector('.player-1-panel').classList.remove('active');
            document.getElementById('name-' + activePlayer).textContent = 'Winner!';
            gamePlaying = false;
        }

        togglePlayers();
    }
});

// New Game button
document.querySelector('.btn-new').addEventListener('click', clearAll);
