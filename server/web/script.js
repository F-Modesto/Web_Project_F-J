
function getData(){

$.getJSON('/all',show);

function show(data){

var key = Object.keys(data);
console.log(key);
var game = key[0];
var year = data[game];
console.log(game);
console.log(year);
document.getElementById('game').innerHTML = game +" "+ year;

}

}

getData();

var but = document.getElementById('submit');

but.onclick = function send(){

var nameG = document.getElementById('gameName').value;
var nameY = document.getElementById('gameYear').value;

console.log(nameG);
console.log(nameY);

$.getJSON('add/'+nameG+'/'+nameY, end);

function end(data){
  console.log(data);
}

}






