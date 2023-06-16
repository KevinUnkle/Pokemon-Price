const cardSets = {
  baseSet: null,
  exSet: null,
  dpSet: null,
  bwSet: null,
  xySet: null,
  smSet: null,
  swshSet: null,
  svSet: null
};

function getPokemonCardData() {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://api.pokemontcg.io/v2/cards?q=set.id:base1');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    cardSets.baseSet = xhr.response.data;
    data.set = xhr.response.data;
    cardsFromNetwork(xhr.response.data);
  });
  xhr.send();
}
getPokemonCardData();

function renderCard(card) {
  const $cardDiv = document.createElement('div');
  const $image = document.createElement('img');
  $cardDiv.className = ('card');
  $image.className = ('pokemon');
  $image.setAttribute('src', card.images.small);
  $cardDiv.append($image);
  return $cardDiv;
}
const $pokecardRow = document.querySelector('#pokecard-row');

function cardsFromNetwork(cardset) {
  for (let i = 0; i < cardset.length; i++) {
    const $cardFromNetwork = cardset[i];
    const $cardDom = renderCard($cardFromNetwork);
    $pokecardRow.append($cardDom);
  }
  if (cardset.length > 0) {
    hideNoCardsText();
  }
}

const $noCardsText = document.querySelector('#no-cards-text');
function hideNoCardsText() {
  $noCardsText.className = 'hidden';
}

const $searchBar = document.querySelector('#search-bar');
// const $filterBar = document.querySelector('#filter-bar');

$searchBar.addEventListener('input', function (event) {
  const $searchValue = event.target.value;
  for (let i = 0; i < data.set.length; i++) {
    const $aCard = data.set[i];
    // console.log('$aCard', $aCard.name);
    // console.log('$searchValue', $searchValue);
    if ($searchValue === $aCard.name) {
      const $matchedCard = renderCard($aCard);
      // console.log($matchedCard);
      $pokecardRow.append($matchedCard);
    }
  }
});
