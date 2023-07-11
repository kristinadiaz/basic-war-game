const newDeckBtn = document.getElementById('new-deck');

function handleClick() {
  fetch('https://deckofcardsapi.com/api/deck/new/shuffle/')
    .then(res => res.json())
    .then(data => console.log(data))
};

newDeckBtn.addEventListener('click', handleClick);