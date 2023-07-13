let deckId;
let remainingCards;
let computerScore = 0;
let myScore = 0;
const newDeckBtn = document.getElementById('new-deck');
const drawCardBtn = document.getElementById('draw-card');
const cardImgContainer = document.getElementById('card-img');
const gameResult = document.getElementById('game-result');
const cardsRemaining = document.getElementById('remaining-cards');
const computerScoreEl = document.getElementById('comp-score');
const myScoreEl = document.getElementById('my-score');

newDeckBtn.addEventListener('click', newDeckClick);
drawCardBtn.addEventListener('click', drawTwoCards);

function newDeckClick() {
  fetch('https://deckofcardsapi.com/api/deck/new/shuffle/')
    .then(res => res.json())
    .then(data => {
      cardsRemaining.textContent = `Remaining Cards: ${data.remaining}`;
      deckId = data.deck_id;
    })
};

function drawTwoCards() {
  fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)
    .then(res => res.json())
    .then(data => {
      let cards = data.cards;
      cardsRemaining.textContent = `Remaining Cards: ${data.remaining}`;
      cardImgContainer.children[0].innerHTML = `
        <img src=${cards[0].image} class="card" />
      `
      cardImgContainer.children[1].innerHTML = `
        <img src=${cards[1].image} class="card" />
      `
      const winnerText = cardWinner(cards[0], cards[1]);
      gameResult.textContent = winnerText;

      if(data.remaining === 0) {
        drawCardBtn.disabled = true;
        if(computerScore > myScore) {
          gameResult.textContent = 'The computer won the game!';
        } else if(myScore > computerScore) {
          gameResult.textContent = 'You won the game!';
        } else {
          gameResult.textContent = "It's a tie game!";
        }
      }
    })
};

function cardWinner(card1, card2) {
  const valueOptions = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "JACK", "QUEEN", "KING", "ACE"];

  const card1ValueIndex = valueOptions.indexOf(card1.value);
  const card2ValueIndex = valueOptions.indexOf(card2.value);

  if(card1ValueIndex > card2ValueIndex) {
    computerScore++;
    computerScoreEl.textContent = `Computer Score: ${computerScore}`;
    return 'Computer Wins!';
  } else if(card1ValueIndex < card2ValueIndex) {
    myScore++;
    myScoreEl.textContent = ` My Score: ${myScore}`;
    return 'You Win!';
  } else {
    return "War!";
  }
}
