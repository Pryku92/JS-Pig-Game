/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

/*
YOUR 3 CHALLENGES
Change the game to follow these rules:
1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable)
2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good oportunity to use google to figure this out :)
3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)
*/

var scores, currentScore, activePlayer, dice1, dice2, previousRoll, winningScore,DOMdiceBox, DOMdice1, DOMdice2, DOMpanel, DOMname, DOMscore, DOMcurrent;

DOMdiceBox = document.querySelector('.dice-box');
DOMdice1 = document.querySelector('.dice1');
DOMdice2 = document.querySelector('.dice2');

init();

document.querySelector('.btn-roll').addEventListener('click', function () {
    if (isOngoing) {
        //roll dices
        dice1 = Math.floor(Math.random() * 6) + 1;
        dice2 = Math.floor(Math.random() * 6) + 1;
        bothDices = dice1 + dice2;
        //update UI
        DOMdice1.src = 'dice-' + dice1 + '.png';
        DOMdice2.src = 'dice-' + dice2 + '.png';
        DOMdiceBox.style.opacity = 1;
        //if both dices are higher than 1 check against previousRoll, else next player
        if (dice1 !== 1 && dice2 !== 1) {
            //if one of the dices is 6 compare with previousRoll
            if (dice1 === 6 || dice2 === 6) {
                //if previousRoll is 6 reset GLOBAL score and nextPlayer(), else update current score 
                if (previousRoll === 6) {
                    scores[activePlayer] = 0;
                    DOMscore.textContent = scores[activePlayer];
                    nextPlayer();
                } else {
                    currentScore += bothDices;
                    DOMcurrent.textContent = currentScore;
                    dice1 > dice2 ? previousRoll = dice1 : previousRoll = dice2;
                }
            } else {
                currentScore += bothDices;
                DOMcurrent.textContent = currentScore;
                dice1 > dice2 ? previousRoll = dice1 : previousRoll = dice2;
            }
        } else nextPlayer();
    }
});

document.querySelector('.btn-hold').addEventListener('click', function () {
    if (isOngoing) {
        //add current score to global
        scores[activePlayer] += currentScore;
        //update UI
        DOMscore.textContent = scores[activePlayer];
        if (scores[activePlayer] >= winningScore) {
            DOMpanel.classList.add('winner');
            DOMname.textContent = 'Winner!';
            isOngoing = false;
        } else nextPlayer();
    }
});

document.querySelector('.btn-new').addEventListener('click', init);

function nextPlayer() {
    currentScore = 0;
    previousRoll = 0;
    DOMcurrent.textContent = currentScore;
    DOMpanel.classList.toggle('active');
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    resetVars();
    DOMpanel.classList.toggle('active');
    fadeOutDices();
}

function init() {
    winningScore = parseInt(document.querySelector('.new-winning').value);
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    isOngoing = true;
    previousRoll = 0;
    resetVars();
    DOMdiceBox.style.opacity = 0;
    for (var i = 0; i < scores.length; i++) {
        document.querySelector('.player-' + i + '-panel').classList.remove('winner');
        document.querySelector('.player-' + i + '-panel').classList.remove('active');
        document.querySelector('#name-' + i).textContent = 'Player ' + (i + 1);
        document.querySelector('#score-' + i).textContent = 0;
        document.querySelector('#current-' + i).textContent = 0;
    }
    DOMpanel.classList.add('active');
}

function resetVars() {
    DOMpanel = document.querySelector('.player-' + activePlayer + '-panel');
    DOMname = document.querySelector('#name-' + activePlayer);
    DOMscore = document.querySelector('#score-' + activePlayer);
    DOMcurrent = document.querySelector('#current-' + activePlayer);
}

function fadeOutDices() {
    var fadeEffect = setInterval(function () {
        if (DOMdiceBox.style.opacity > 0) {
            DOMdiceBox.style.opacity -= 0.1;
        } else {
            clearInterval(fadeEffect);
        }
    }, 50);
}