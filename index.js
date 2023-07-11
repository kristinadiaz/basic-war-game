let deckId;
const newDeckBtn = document.getElementById('new-deck');
const drawCardBtn = document.getElementById('draw-card');
const cardImgContainer = document.getElementById('card-img');

function newDeckClick() {
  fetch('https://deckofcardsapi.com/api/deck/new/shuffle/')
    .then(res => res.json())
    .then(data => {
      deckId = data.deck_id;
    })
};

function drawTwoCards() {
  fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)
    .then(res => res.json())
    .then(data => {
      let cards = data.cards;
      cardImgContainer.innerHTML = `
        <img src=${cards[0].image} />
        <img src=${cards[1].image} />
      `
    })
};

newDeckBtn.addEventListener('click', newDeckClick);
drawCardBtn.addEventListener('click', drawTwoCards);