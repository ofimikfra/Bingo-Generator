let gridSize = 5; // default grid size
let pulledNumbers = []; // store pulled numbers
let selectedMode = generate75Ball; // default bingo mode
let gameover = false;

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

function generate75Ball() {
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
				bingoDiv.innerHTML +=
					"<div class='card' style='font-size:40px'>" +
					"<i class='bi bi-star-fill'></i>" +
					"</div>"; // add free space to bingo div
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

function pullNumber75() {

	let num;
	let letter;
    const pulledballs = document.getElementById("pulledballs");
    const currentletter = document.getElementById("letter");
	const currentnum = document.getElementById("number");

    while (true) {
        num = Math.floor(Math.random() * 75) + 1;
        if (!pulledNumbers.includes(num)) {
            pulledNumbers.push(num);
            break;
        }
    }

	if (num >= 1 && num <= 15) {
		letter = "B";
	} else if (num >= 16 && num <= 30) {
		letter = "I";
	} else if (num >= 31 && num <= 45) {
		letter = "N";
	} else if (num >= 46 && num <= 60) {
		letter = "G";
	} else if (num >= 61 && num <= 75) {
		letter = "O";
	}

	const newBall = 
		"<div class='outerball'> \
			<div class='innerball'> \
				<div class='text'> \
					<p class='letter'>" + letter + "</p> \
					<p class='number'>" + num + "</p> \
				</div> \
			</div> \
		</div>";
	pulledballs.innerHTML = newBall + pulledballs.innerHTML; // prepend new ball

	currentletter.innerHTML = letter;
	currentnum.innerHTML = num;
}

function showPrevious() {
	document.getElementById("pulledballs").classList.toggle("toggled");
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
// add multiplayer feature (servers/rooms?) + chat + account feature
// add different bingo patterns (4 corners, X, etc.) + custom pattern +
// add different bingo game types (75-ball, 80-ball, 90-ball, 30-ball) + custom mode
// add ball color randomizer when generated

document.addEventListener("DOMContentLoaded", (event) => {
	selectedMode();

	document.querySelectorAll(".card").forEach((card) => {
		// why inside this event listener?
		card.addEventListener("click", () => {
			card.classList.toggle("toggled");
		});
	});

	document.getElementById("arrow").addEventListener("click", () => {
		const panel = document.getElementById("panel");
		const container = document.getElementById("container");

		panel.classList.toggle("collapsed");
		container.classList.toggle("fullscreen");
	});

	document.getElementById("menu").addEventListener("click", () => {
		panel.classList.toggle("collapsed");
		container.classList.toggle("fullscreen");
	});

    document.addEventListener("keydown", (event) => {
        if (event.code === "Space" && pulledNumbers.length < 75) {
            pullNumber75();
        }
    });
});
