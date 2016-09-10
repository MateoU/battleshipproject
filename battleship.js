// sets grid rows and columns and the size of each square
var rows = 10;
var cols = 10;
var squareSize = 50;

//counts hits
var hits = 0;

//variable for high score
var highScore = 30;

//num of things
var num = 0;
var hitNum = 0;

//Score
var currentScore = 0;

var explosionSound = new Audio('explosion.mp3');
// gets the container element
var gameBoardContainer = document.getElementById("gameboard");

// you can use this to convert your letters into numbers for use
// with the 2D array
var letterConversion = {
	"A": 0,
	"B": 1,
	"C": 2,
	"D": 3,
	"E": 4,
	"F": 5,
	"G": 6,
	"H": 7,
	"I": 8,
	"J": 9,
	"a": 0,
	"b": 1,
	"c": 2,
	"d": 3,
	"e": 4,
	"f": 5,
	"g": 6,
	"h": 7,
	"i": 8,
	"j": 9
}
var arrayOne = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
// makes the grid columns and rows
for (i = 0; i < cols; i++) {
	for (j = 0; j < rows; j++) {
//J is rows i is columns
		// creates a new div HTML element for each grid square and makes it the right size
		var square = document.createElement("div");
		gameBoardContainer.appendChild(square);

    // give each div element a unique id based on its row and column, like "s00"
		square.id = 's' + j + i;
		square.className = "boardSquare";

		square.textContent = arrayOne[j] + (i+1);

		// set each grid square's coordinates: multiples of the current row or column number
		var topPosition = j * squareSize;
		var leftPosition = i * squareSize;

		// use CSS absolute positioning to place each grid square on the page
		square.style.top = topPosition + 'px';
		square.style.left = leftPosition + 'px';
	}
}

// Hardcoded 2D array to indicate where the ships are placed
var gameBoard = [
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0]
				]

function fireTorpedo() {
	var launchMissile = $("#textBox").val();
	var rowLM = launchMissile.substring(0, 1);
	var columnLM = launchMissile.substring(1,3);
	var letterR = letterConversion[rowLM];
	var letterC = columnLM - 1;

	//combines s + the id
	var coordinates = 's' + letterR + letterC;

	currentScore++;
	console.log("Moves: " + currentScore)

	if(gameBoard[letterR][letterC] == 1){
		$("#" + coordinates).css("background-color", "#025C00");
		hits++;
		console.log("Hits: " + hits);
		explosionSound.play();
		hitNum++;
	}	else {
			$("#" + coordinates).css("background-color", "#3B3B3B");
	}

	if (hitNum == num){
		console.log("destroyed");
		$("#you_win").slideDown();
		$("#you_win").css("display", "block");
		$("#invisdiv").fadeOut();

	}
}

function reload() {
	location.reload();
}

function setShip() {
      var thisBox = $("#thingimabob").val();
			var theFirstOne = thisBox.substring(0,1);
			var theSecondOne = thisBox.substring(1, 3);
			var firstConv = letterConversion[theFirstOne];
			var secondConv = theSecondOne - 1;

			var sevenSubstring = thisBox.substring(3, 10);
			var carLocString = thisBox.substring(10, 16);

			var tenSubstring = thisBox.substring(3, 13);
			var batLocString = thisBox.substring(13, 19);

			var nineSubstring = thisBox.substring(3, 12);
			var subLocString = thisBox.substring(12, 18);

			if(sevenSubstring == "carrier"){
				if(carLocString == " down"){
					for(i = 0; i < 5; i++){
						var fi = firstConv + i;
						gameBoard[fi][secondConv] = 1;
					}
				} else if(carLocString == " up"){
					for(i = 0; i < 5; i++){
						var fj = firstConv - i;
						gameBoard[fj][secondConv] = 1;
					}
				} else if(carLocString == " left"){
					for(i = 0; i < 5; i++){
						var fk = secondConv - i;
						gameBoard[firstConv][fk] = 1;
					}
				} else if(carLocString == " right"){
					for(j = 0; j < 5; j++){
						var fl = secondConv + j;
						gameBoard[firstConv][fl] = 1;
					}
				}

					console.log("carrier placed");
					num += 5;
			} else if(tenSubstring == "battleship") {

				console.log("battleship placed");

				if(batLocString == " down"){
					for(i = 0; i < 4; i++){
						var gi  = firstConv + i;
						gameBoard[gi][secondConv] = 1;
					}
				} else if(batLocString == " up"){
					for(i = 0; i < 4; i++){
						var gj = firstConv - i;
						gameBoard[gj][secondConv] = 1;
					}
				} else if(batLocString == " left"){
					for(i = 0; i < 4; i++){
						var gk = secondConv - i;
						gameBoard[firstConv][gk] = 1;
					}
				} else if(batLocString == " right"){
					for(i = 0; i < 4; i++){
						var gl = secondConv + i;
						gameBoard[firstConv][gl] = 1;
					}
				}

				//console.log("battleship placed");
				num += 4;
			} else if(sevenSubstring == "cruiser"){
				console.log("cruiser placed")
				if(carLocString == " down"){
					for(i = 0; i < 3; i++){
						var fi = firstConv + i;
						gameBoard[fi][secondConv] = 1;
					}
				} else if(carLocString == " up"){
					for(i = 0; i < 3; i++){
						var fj = firstConv - i;
						gameBoard[fj][secondConv] = 1;
					}
				} else if(carLocString == " left"){
					for(i = 0; i < 3; i++){
						var fk = secondConv - i;
						gameBoard[firstConv][fk] = 1;
					}
				} else if(carLocString == " right"){
					for(j = 0; j < 3; j++){
						var fl = secondConv + j;
						gameBoard[firstConv][fl] = 1;
					}
				}
				num += 3;
			} else if(nineSubstring == "submarine"){
				console.log("sub placed");
				if(subLocString == " down"){
					for(i = 0; i < 3; i++){
						var hi = firstConv + i;
						gameBoard[hi][secondConv] = 1;
					}
				} else if(subLocString == " up"){
					for(i = 0; i < 3; i++){
						var hj = firstConv - i;
						gameBoard[hj][secondConv] = 1;
					}
				} else if(subLocString == " left"){
					for(i = 0; i < 3; i++){
						var hk = secondConv - i;
						gameBoard[firstConv][hk] = 1;
					}
				} else if(subLocString == " right"){
					for(j = 0; j < 3; j++){
						var hl = secondConv + j;
						gameBoard[firstConv][hl] = 1;
					}
				}
				num += 3;
			}  else if(nineSubstring == "destroyer"){
				console.log("dest placed")
				if(subLocString == " down"){
					for(i = 0; i < 2; i++){
						var ei = firstConv + i;
						gameBoard[ei][secondConv] = 1;
					}
				} else if(subLocString == " up"){
					for(i = 0; i < 2; i++){
						var ej = firstConv - i;
						gameBoard[ej][secondConv] = 1;
					}
				} else if(subLocString == " left"){
					for(i = 0; i < 2; i++){
						var ek = secondConv - i;
						gameBoard[firstConv][ek] = 1;
					}
				} else if(subLocString == " right"){
					for(j = 0; j < 2; j++){
						var el = secondConv + j;
						gameBoard[firstConv][el] = 1;
					}
				}
				num += 2;
			}
}
