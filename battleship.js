// sets grid rows and columns and the size of each square
var rows = 10;
var cols = 10;
var squareSize = 50;

//counts hits
var missCounter = 16;

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
	"J": 9
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
				[0,0,0,1,1,1,1,0,0,0],
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,1,0,0,0],
				[0,0,0,0,0,0,1,0,0,0],
				[1,0,0,0,0,0,1,1,1,1],
				[1,0,0,0,0,0,0,0,0,0],
				[1,0,0,1,0,0,0,0,0,0],
				[1,0,0,1,0,0,0,0,0,0],
				[1,0,0,0,0,0,0,0,0,0]
				]

function fireTorpedo() {
	var launchMissile = $("#textBox").val();
	var rowLM = launchMissile.substring(0, 1);
	var columnLM = launchMissile.substring(1,3);
	var letterR = letterConversion[rowLM];
	var letterC = columnLM - 1;

	//combines s + the id
	var together = 's' + letterR + letterC;



	if(gameBoard[letterR][letterC] == 1){
		$("#" + together).css("background-color", "red");
		missCounter += 1;
		console.log(missCounter);
	}	else {
			$("#" + together).css("background-color", "gray");
	}

	if (missCounter == 17){
		console.log("destroyed");
		$("#you_win").fadeIn();
		$("#you_win").css("display", "block");
		$("#invisdiv").fadeOut();

	}
}

function reload() {
	location.reload();
}

function close()  {
	$("#you_win").fadeOut();
}
