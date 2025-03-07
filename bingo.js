let gridSize = 5; // default grid size
let pulledNumbers = []; // store pulled numbers
let selectedMode = generate80Ball; // default bingo mode

function generateUnique(low, interval, size) {
	let arr = [];
	while (arr.length < size) {
		let num = Math.floor(Math.random() * interval) + low;
		if (arr.includes(num)) {
			continue;
		} else {
			arr.push(num);
		}
	}

	return arr;
}

function generate80Ball() {
	let B = [],
		I = [],
		N = [],
		G = [],
		O = [];

	B = generateUnique(1, 15, 5);
	I = generateUnique(16, 15, 5);
	N = generateUnique(31, 15, 5);
	G = generateUnique(46, 15, 5);
	O = generateUnique(61, 15, 5);

	let bingoData = [B, I, N, G, O];

	const bingoDiv = document.getElementById("bingo");
	bingoDiv.innerHTML = ""; // clear bingo div

	for (let i = 0; i < gridSize; i++) {
		for (let j = 0; j < bingoData.length; j++) {
			if (j === 2 && i === 2) {
				bingoDiv.innerHTML += "<div class='card' style='font-size:40px'>" + "<i class='bi bi-star-fill'></i>" + "</div>"; // add free space to bingo div
				continue;
			} else {
				bingoDiv.innerHTML += "<div class='card'>" + bingoData[j][i] + "</div>"; // add card to bingo div
			}
		}
	}
}

// generate bingo cards on page
function generateCustom(bingoData) {
	/* UNCOMMENT WHEN BASIC FEATURES ARE WORKING
    // make bingo div to hold all cards according to grid size (if custom), otherwise 5x5 (edit css)
    if (col !=5 || row !=5) {
        bingoDiv.style.gridTemplateColumns = "repeat(" + bingoData.length + ", 1fr)";
        bingoDiv.style.gridTemplateRows = "repeat(" + bingoData.length + ", 1fr)";
    }
     */
}

function pullNumber() {
	do {
		let num = Math.floor(Math.random() * 75) + 1;
		if (pulledNumbers.includes(num)) {
			return num; // change to editing inner html
		} else {
			break;
		}
	} while (pulledNumbers.size < 75);
}

/* ---------------------------------- to do ---------------------------------- */
// add custom grid size feature
// add custom card text feature
// add custom card color feature
// add feature that checks if card is bingo (diagonal, horizontal, vertical, blackout)
// add bingo number generator (for playing actual bingo)
// add button to regenerate bingo cards
// add button to change bingo card type (regular or custom)
// add feature to save and load custom bingo card data
// add feature to make middle card free space
// add custom header feature
// add panel to show pulled numbers
// add multiplayer feature (servers/rooms?) + chat + account feature
// add different bingo patterns (4 corners, X, etc.) + custom pattern +
// add different bingo game types (75-ball, 80-ball, 90-ball, 30-ball) + custom mode

document.addEventListener("DOMContentLoaded", (event) => {
	selectedMode();

	document.querySelectorAll(".card").forEach((card) => { // why inside this event listener?
		card.addEventListener("click", () => {
			card.classList.toggle("toggled");
		});
	});

    document.getElementById("arrow").addEventListener("click", () => {
        const panel = document.getElementById("panel");
        const container = document.getElementById("container")

        panel.classList.toggle("collapsed");
        container.classList.toggle("fullscreen");
    });

    document.getElementById("menu").addEventListener("click", () => {
        panel.classList.toggle("collapsed");
        container.classList.toggle("fullscreen");
    });
});
