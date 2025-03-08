let gridSize = 5; // default grid size
let pulledNumbers = []; // store pulled numbers
let selectedMode = generate75Ball; // default bingo mode
let selectedPull = pullNumber75;
let playing = false;
let keybindPull = false;

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
					"<div class='card star' style='font-size:40px'>" +
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

function play() {
	document.getElementById("bingocaller").classList.toggle("play");
	const button = document.getElementById("play");
	pulledballs = document.getElementById("pulledballs").innerHTML = "";
	currentletter = document.getElementById("letter").textContent = "";
	currentnum = document.getElementById("number").textContent = "";

	if (!playing) {
		playing = true;
        button.disabled = true;
        pulledNumbers = [];
        
        document.querySelectorAll(".card").forEach((card) => {
            card.classList.remove("toggled");
        });

		let countdown = 5;
		button.textContent = "Starting in " + countdown + "...";
		document.getElementById("countdown").textContent = "Starting in " + countdown + "...";

		const countdownInterval = setInterval(() => {
			countdown--;
			if (countdown > 0) {
				button.textContent = "Starting in " + countdown + "...";
				document.getElementById("countdown").textContent = "Starting in " + countdown + "...";
			} else {
				clearInterval(countdownInterval);
                button.disabled = false;
				button.textContent = "End Game";
				call();
			}
		}, 1000);
	} else {
		playing = false;
		button.textContent = "Start Game";
	}
}

function call(secs = 15) {
	let countdown = secs;
	selectedPull(); // first pull
	document.getElementById("countdown").textContent = "Next ball in: " + countdown;

	const countdownInterval = setInterval(() => {
		if (pulledNumbers.length >= 75 || !playing) {
			clearInterval(countdownInterval);
            document.getElementById("footer") += "<p style='color:lightred;'>There are no more numbers.</p>"
			return;
		}

		countdown--;
		if (countdown >= 1) {
			document.getElementById("countdown").textContent = "Next ball in: " + countdown;
		} else {
			countdown = secs;
			selectedPull();
			document.getElementById("countdown").textContent = "Next ball in: " + countdown;
		}
	}, 1000);
}

function checkBingo() {
	const cards = document.querySelectorAll(".card");
	const grid = Array.from(cards).map(card => card.classList.contains("toggled"));

	// Check rows
	for (let i = 0; i < gridSize; i++) {
		if (grid.slice(i * gridSize, (i + 1) * gridSize).every(cell => cell)) {
			return true;
		}
	}

	// Check columns
	for (let i = 0; i < gridSize; i++) {
		let column = [];
		for (let j = 0; j < gridSize; j++) {
			column.push(grid[i + j * gridSize]);
		}
		if (column.every(cell => cell)) {
			return true;
		}
	}

	// Check diagonals
	let diagonal1 = [];
	let diagonal2 = [];
	for (let i = 0; i < gridSize; i++) {
		diagonal1.push(grid[i * (gridSize + 1)]);
		diagonal2.push(grid[(i + 1) * (gridSize - 1)]);
	}
	if (diagonal1.every(cell => cell) || diagonal2.every(cell => cell)) {
		return true;
	}

	return false;
}

function checkCard(card) {
    if (pulledNumbers.includes(parseInt(card.textContent.trim()))) {
        card.classList.toggle("toggled");
    } else if (card.classList.contains('star')) {
        card.classList.toggle("toggled");
    }
    else {
        card.classList.toggle("wrong");
        setTimeout(() => {
            card.classList.toggle("wrong");
        }, 500);
    }
}

/* ---------------------------------- to do ---------------------------------- */
// add custom grid size feature
// add custom card text feature
// add custom card color feature
// add feature that checks if card is bingo (diagonal, horizontal, vertical, blackout)
// add button to regenerate bingo cards
// add button to change bingo card type (regular or custom)
// add feature to save and load custom bingo card data
// add feature to make middle card free space
// add custom header feature
// add multiplayer feature (servers/rooms?) + chat + account feature
// add different bingo patterns (4 corners, X, etc.) + custom pattern +
// add different bingo game types (75-ball, 80-ball, 90-ball, 30-ball) + custom mode
// add ball color randomizer when generated
// add multiple bingo cards feature
// add sound effects

document.addEventListener("DOMContentLoaded", (event) => {
	const panel = document.getElementById("panel");
	const container = document.getElementById("container");
	selectedMode();

	document.querySelectorAll(".card").forEach((card) => {
		card.addEventListener("click", () => {
            
            if (!playing) {
                card.classList.toggle("toggled");
            } else {
                checkCard(card);
            }
		});
	});

	document.getElementById("arrow").addEventListener("click", () => {
		panel.classList.toggle("collapsed");

		if (playing) {
			container.classList.toggle("fullscreenplay");
		} else {
			container.classList.toggle("fullscreen");
		}
	});

	document.getElementById("menu").addEventListener("click", () => {
		panel.classList.toggle("collapsed");

		if (playing) {
			container.classList.toggle("fullscreenplay");
		} else {
			container.classList.toggle("fullscreen");
		}
	});

	document.addEventListener("keydown", (event) => {
		if (
			event.code === "KeyP" &&
			pulledNumbers.length < 75 &&
			playing &&
			keybindPull
		) {
			pullNumber75();
		}

		else if (event.code === "Space" && !playing) {
			selectedMode();
		}

		else if (event.code === "Minus") {
			document.querySelectorAll(".card").forEach((card) => {
				card.classList.remove("toggled");
			});
		}
	});
});
