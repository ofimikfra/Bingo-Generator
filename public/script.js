let gridSize = 5; // default grid size
let calledNumbers = []; // store called numbers
let selectedMode = generate75Ball; // default bingo mode
let selectedCall = callNumber75;
let playing = false;
let keybindCall = false;
let secs = 15; // default interval for calling numbers
let patterns = ["line","diagonal"] // default patterns
let wins = 0; // default wins

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

function callNumber75() {
	let num;
	let letter;
	const calledballs = document.getElementById("calledballs");
	const currentletter = document.getElementById("letter");
	const currentnum = document.getElementById("number");

	while (true) {
		num = Math.floor(Math.random() * 75) + 1;
		if (!calledNumbers.includes(num)) {
			calledNumbers.push(num);
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
	calledballs.innerHTML = newBall + calledballs.innerHTML; 

	currentletter.innerHTML = letter;
	currentnum.innerHTML = num;
}

function showPrevious() {
	document.getElementById("calledballs").classList.toggle("toggled");
}

function play() {
	document.getElementById("bingocaller").classList.toggle("play");
	const button = document.getElementById("play");
    const notif = document.getElementById("notif");
    const cards = document.querySelectorAll(".card");
	document.getElementById("calledballs").innerHTML = "";
	document.getElementById("letter").textContent = "";
	document.getElementById("number").textContent = "";

	if (!playing) {
		playing = true;
        button.disabled = true;
        calledNumbers = [];

        notif.style.backgroundColor = "darkred";
        
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
				call(secs);
			}
		}, 1000);
	} else {
		playing = false;
		button.textContent = "Start Game";
        notif.classList.remove("notif");
        cards.forEach(card => card.classList.remove("win"));
		cards.forEach(card => card.classList.remove("toggled"));
	}
}

function call(secs) {
    const notif = document.getElementById("notif");
	let countdown = secs;
	selectedCall(); // first call
	document.getElementById("countdown").textContent = "Next ball in: " + countdown;

	const countdownInterval = setInterval(() => {
		if (!playing) {
			clearInterval(countdownInterval);
			return;
		}

        else if (calledNumbers.length >= 75) {
            clearInterval(countdownInterval);
            notif.classList.toggle("notif");
            notif.textContent = "There are no more numbers.";
            setTimeout(() => {
                notif.classList.toggle("notif");
            }, 1500)
            return;
        }

		countdown--;
		if (countdown >= 1) {
			document.getElementById("countdown").textContent = "Next ball in: " + countdown;
		} else {
			countdown = secs;
			selectedCall();
			document.getElementById("countdown").textContent = "Next ball in: " + countdown;
		}
	}, 1000);
}

// understand this function
function bingo(patterns) {
    const cards = document.querySelectorAll(".card");
    const grid = Array.from(cards).map(card => card.classList.contains("toggled"));
    const notif = document.getElementById("notif");
    const mywins = document.getElementById("wins");

    notif.textContent = "BINGO! Click the End Game button to end the game."
    notif.style.backgroundColor = "lime";

    if (patterns.includes("line")) {
        // rows
        for (let i = 0; i < gridSize; i++) {
            if (grid.slice(i * gridSize, (i + 1) * gridSize).every(cell => cell)) {
                grid.slice(i * gridSize, (i + 1) * gridSize).forEach((_, index) => {
                    cards[i * gridSize + index].classList.add("win");
                });

                wins++;
                mywins.textContent = "Wins: " + wins;
                notif.classList.toggle("notif");
                return true;
            }
        }

        // columns
        for (let i = 0; i < gridSize; i++) {
            let column = [];
            for (let j = 0; j < gridSize; j++) {
                column.push(grid[i + j * gridSize]);
            }
            if (column.every(cell => cell)) {
                column.forEach((_, index) => {
                    cards[i + index * gridSize].classList.add("win");
                });

                wins++;
                mywins.textContent = "Wins: " + wins;
                notif.classList.toggle("notif");
                return true;
            }
        }
    }

    if (patterns.includes("diagonal")) {
        // diagonals
        let diagonal1 = [];
        let diagonal2 = [];
        for (let i = 0; i < gridSize; i++) {
            diagonal1.push(grid[i * (gridSize + 1)]);
            diagonal2.push(grid[(i + 1) * (gridSize - 1)]);
        }
        if (diagonal1.every(cell => cell)) {
            diagonal1.forEach((_, index) => {
                cards[index * (gridSize + 1)].classList.add("win");
            });

            wins++;
            mywins.textContent = "Wins: " + wins;
            notif.classList.toggle("notif");
            return true;
        }
        if (diagonal2.every(cell => cell)) {
            diagonal2.forEach((_, index) => {
                cards[(index + 1) * (gridSize - 1)].classList.add("win");
            });

            wins++;
            mywins.textContent = "Wins: " + wins;
            notif.classList.toggle("notif");
            return true;
        }
    }

    if (patterns.includes("blackout")) {
        // blackout
        if (grid.every(cell => cell)) {
            cards.forEach(card => card.classList.add("win"));
            wins++;
            mywins.textContent = "Wins: " + wins;
            notif.classList.toggle("notif");
            return true;
        }
    }

    notif.textContent = "No bingo... The game continues!";
    notif.classList.toggle("notif");
    setTimeout(() => {
        notif.classList.toggle("notif");
    }, 1500);
}

function checkCard(card) {
    const notif = document.getElementById("notif");
    if (calledNumbers.includes(parseInt(card.textContent.trim()))) {
        card.classList.toggle("toggled");
    } else if (card.classList.contains('star')) {
        card.classList.toggle("toggled");
    }
    else {
        card.classList.toggle("wrong");
        notif.textContent = "The number you selected was not called."
        
        notif.classList.toggle("notif");
        setTimeout(() => {
            card.classList.toggle("wrong");
        }, 200);

        setTimeout(() => {
            notif.classList.toggle("notif");
        }, 1500)
    }
}

function popup() {
	document.getElementById('signupWindow').classList.toggle('popup'); 
	document.getElementById('blur').classList.toggle('popup'); 
	document.getElementById('panel').classList.toggle('collapsed');

	if (playing) {
		document.getElementById('container').classList.toggle('fullscreenplay');
	} else {
		document.getElementById('container').classList.toggle('fullscreen');
	}
}

/* ---------------------------------- to do ---------------------------------- */
// add custom grid size feature
// add custom card text feature
// add custom card color feature
// add button to change bingo card type (regular or custom)
// add feature to save and load custom bingo card data
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
			calledNumbers.length < 75 &&
			playing &&
			keybindCall
		) {
			callNumber75();
		}

		else if (event.code === "Space" && !playing) {
			selectedMode();
		}

		else if (event.code === "Minus") {
			document.querySelectorAll(".card").forEach((card) => {
				card.classList.remove("toggled");
			});
        }

        else if (event.code === "Enter") {
            bingo(patterns);
        }
	});
});
