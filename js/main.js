const cardSets = {
  baseSet: null,
  exSet: null,
  dpSet: null,
  bwSet: null,
  xySet: null,
  smSet: null,
  swshSet: null,
  svSet: null,
  myDeck: []
};

function getBaseSetData() {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://api.pokemontcg.io/v2/cards?q=set.id:base1');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    cardSets.baseSet = xhr.response.data;
    data.set = xhr.response.data;
    cardsFromNetwork(data.set);
  });
  xhr.send();
}
function getExData() {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://api.pokemontcg.io/v2/cards?q=set.id:ex1');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    cardSets.exSet = xhr.response.data;
  });
  xhr.send();
}
function getDpData() {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://api.pokemontcg.io/v2/cards?q=set.id:dp1');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    cardSets.dpSet = xhr.response.data;
  });
  xhr.send();
}
function getBwData() {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://api.pokemontcg.io/v2/cards?q=set.id:bw1');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    cardSets.bwSet = xhr.response.data;
  });
  xhr.send();
}
function getXyData() {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://api.pokemontcg.io/v2/cards?q=set.id:xy1');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    cardSets.xySet = xhr.response.data;
  });
  xhr.send();
}
function getSmData() {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://api.pokemontcg.io/v2/cards?q=set.id:sm1');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    cardSets.smSet = xhr.response.data;
  });
  xhr.send();
}
function getSwshData() {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://api.pokemontcg.io/v2/cards?q=set.id:swsh1');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    cardSets.swshSet = xhr.response.data;
  });
  xhr.send();
}
function getSvData() {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://api.pokemontcg.io/v2/cards?q=set.id:sv1');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    cardSets.svSet = xhr.response.data;
  });
  xhr.send();
}
getBaseSetData();
getExData();
getDpData();
getBwData();
getXyData();
getSmData();
getSwshData();
getSvData();

function renderCard(card) {
  const $cardDiv = document.createElement('div');
  const $image = document.createElement('img');
  const $blankButton = document.createElement('a');
  $blankButton.className = ('blank-ball');
  $blankButton.setAttribute('id', 'blank');
  $cardDiv.className = ('card');
  $image.className = ('pokemon');
  $cardDiv.appendChild($blankButton);
  $image.setAttribute('src', card.images.small);
  $cardDiv.append($image);
  $blankButton.addEventListener('click', function (event) {
    for (let i = 0; i < cardSets.myDeck.length; i++) {
      const $myDeckIndex = cardSets.myDeck[i];
      if (card.name !== $myDeckIndex.name) {
        cardSets.myDeck.push(card);
      }
    }
  });
  return $cardDiv;
}

function cardsFromNetwork(cardset) {
  const $pokecardRow = document.querySelector('#pokecard-row');
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
const $newCardContainer = document.querySelector('.card-container');

// SEARCH BAR FUNCTIONALITY!!

$searchBar.addEventListener('input', function (event) {
  const $searchValue = event.target.value;
  for (let i = 0; i < data.set.length; i++) {
    const $aCard = data.set[i];
    const $lowerCasedCard = $aCard.name.toLowerCase();
    const $lowerCasedSearch = $searchValue.toLowerCase();
    if ($lowerCasedCard === $lowerCasedSearch) {
      const $matchedCard = renderCard($aCard);
      const $pokecardRow = document.querySelector('#pokecard-row');
      $pokecardRow.remove();
      const $newcardDiv = document.createElement('div');
      $newcardDiv.className = ('row card-row');
      $newcardDiv.setAttribute('id', 'pokecard-row');
      $newcardDiv.append($matchedCard);
      $newCardContainer.append($newcardDiv);
    }
  }
});

// FILTER BAR FUNCTIONALITY!

const $aDropDown = document.querySelectorAll('a');

for (let i = 0; i < $aDropDown.length; i++) {
  const $aIndex = $aDropDown[i];
  $aIndex.addEventListener('click', function (event) {
    const $clickEvent = event.target;
    const $filterId = $clickEvent.getAttribute('id');
    data.set = cardSets[$filterId];
    const $pokecardRow = document.querySelector('#pokecard-row');
    $pokecardRow.remove();
    const $newcardDiv = document.createElement('div');
    $newcardDiv.className = ('row card-row');
    $newcardDiv.setAttribute('id', 'pokecard-row');
    for (let i = 0; i < data.set.length; i++) {
      const $cardFromNetwork = data.set[i];
      const $cardDom = renderCard($cardFromNetwork);
      $newcardDiv.append($cardDom);
    }
    $newCardContainer.append($newcardDiv);
  });
}

function myFunction() {
  document.getElementById('myDropdown').classList.toggle('show');
}

function filterFunction() {
  const $input = document.getElementById('myInput');
  const $filter = $input.value.toUpperCase();
  const $div = document.getElementById('myDropdown');
  const $a = $div.getElementsByTagName('a');
  for (let i = 0; i < $a.length; i++) {
    const $txtValue = $a[i].textContent || $a[i].innerText;
    if ($txtValue.toUpperCase().indexOf($filter) > -1) {
      $a[i].style.display = '';
    } else {
      $a[i].style.display = 'none';
    }
  }
}
