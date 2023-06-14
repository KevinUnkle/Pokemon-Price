/* exported data */
var card = {
  name: '',
  hp: '',
  attack0: '',
  attack1: '',
  weakness: '',
  resistance: '',
  retreatCost: ''
};

function getPokemonCardData() {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://api.pokemontcg.io/v2/cards?q=set.id:base1');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    console.log(xhr.status);
    const baseSet = xhr.response;
    console.log(baseSet);
  });
  xhr.send();
}
getPokemonCardData();
