// function getData() {

// 	$.getJSON('/all', show);

// 	function show(data) {

// 	var key = Object.keys(data);
// 	console.log(key);
// 	var name = key[0];
// 	var email = data[name];
// 	console.log(name);
// 	console.log(email);
// 	document.getElementById('entry').innerHTML = name + " " + email;
// 	}
// }

// getData();

// var but = document.getElementById('submit');

// but.onclick = function log() {
// 	console.log("a");
// }

// but.onclick = function send() {

// 	var entryN = document.getElementById('name').value;
// 	var entryE = document.getElementById('email').value;

// 	console.log(entryN);
// 	console.log(entryE);

// 	$.getJSON('add/' + entryN + '/' + entryE, end);

// 	function end(data) {
// 	  console.log(data);
// 	}
// }
var loadFile = function(event) {
	var output = document.getElementById('output');
    output.src = URL.createObjectURL(event.target.files[0]);
};