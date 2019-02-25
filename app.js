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

var scores, currentScore, activePlayer, dice, DOMpanel, DOMname, DOMscore, DOMcurrent, DOMnew, DOMroll, DOMhold;

DOMdice = document.querySelector('.dice');
DOMnew = document.querySelector('.btn-new');
DOMroll = document.querySelector('.btn-roll');
DOMhold = document.querySelector('.btn-hold');

init();

DOMroll.addEventListener('click', function(){
  if(isOngoing) {
    //roll the dice
    dice = Math.floor(Math.random() * 6) + 1;
    //update UI
    DOMdice.style.display = 'block';
    DOMdice.src = 'dice-' + dice + '.png';
    //if NOT 1 update current score, else next player
    if(dice > 1) {
      currentScore += dice;
      DOMcurrent.textContent = currentScore;
    } else nextPlayer();
  }
});

DOMhold.addEventListener('click', function(){
  if(isOngoing) {
    //add current score to global
    scores[activePlayer] += currentScore;
    //update UI
    DOMscore.textContent = scores[activePlayer];
    if(scores[activePlayer] >= 100) {
      DOMpanel.classList.add('winner');
      DOMname.textContent = 'Winner!';
      isOngoing = false;
    } else nextPlayer();
  }
});

DOMnew.addEventListener('click', init);

function nextPlayer() {
  currentScore = 0;
  DOMcurrent.textContent = currentScore;
  DOMpanel.classList.toggle('active');
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
  resetVars();
  DOMpanel.classList.toggle('active');
  DOMdice.style.display = 'none';
}

function init() {
  scores = [0,0];
  currentScore = 0;
  activePlayer = 0;
  isOngoing = true;
  resetVars();
  DOMdice.style.display = 'none';
  for(var i = 0; i < scores.length; i++) {
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