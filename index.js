let deckId;
const newDeckBtn = document.getElementById('new-deck');
const drawCardBtn = document.getElementById('draw-card');
const cardImgContainer = document.getElementById('card-img');
const gameResult = document.getElementById('game-result');

newDeckBtn.addEventListener('click', newDeckClick);
drawCardBtn.addEventListener('click', drawTwoCards);

function newDeckClick() {
  fetch('https://deckofcardsapi.com/api/deck/new/shuffle/')
    .then(res => res.json())
    .then(data => {
      deckId = data.deck_id;
      console.log(deckId);
    })
};

function drawTwoCards() {
  fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)
    .then(res => res.json())
    .then(data => {
      let cards = data.cards;
      cardImgContainer.children[0].innerHTML = `
        <img src=${cards[0].image} class="card" />
      `
      cardImgContainer.children[1].innerHTML = `
        <img src=${cards[1].image} class="card" />
      `
      const winnerText = cardWinner(cards[0], cards[1]);
      gameResult.innerHTML = winnerText;
    })
};

function cardWinner(card1, card2) {
  const valueOptions = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "JACK", "QUEEN", "KING", "ACE"];

  const card1ValueIndex = valueOptions.indexOf(card1.value);
  const card2ValueIndex = valueOptions.indexOf(card2.value);

  if(card1ValueIndex > card2ValueIndex) {
    return 'Card 1 wins!';
  } else if(card1ValueIndex < card2ValueIndex) {
    return 'Card 2 wins!';
  } else {
    return "War!";
  }
}
