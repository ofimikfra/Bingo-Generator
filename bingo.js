let gridSize = 5; // default grid size

function generateNumbers() {
	let B = Array.from({ length: 5 }, () => Math.floor(Math.random() * 15) + 1); // 1 to 15
	let I = Array.from({ length: 5 }, () => Math.floor(Math.random() * 15) + 16); // 16 to 30
	let N = Array.from({ length: 5 }, () => Math.floor(Math.random() * 15) + 31); // 31 to 45
	let G = Array.from({ length: 5 }, () => Math.floor(Math.random() * 15) + 46); // 46 to 60
	let O = Array.from({ length: 5 }, () => Math.floor(Math.random() * 15) + 61); // 61 to 75
	return [B, I, N, G, O];
}

function generateBingo(bingoData) {
	// generate bingo cards on page
	let bingoDiv = document.getElementById("bingo");
	bingoDiv.innerHTML = ""; // clear bingo div

	/* UNCOMMENT WHEN BASIC FEATURES ARE WORKING
    // make bingo div to hold all cards according to grid size (if custom), otherwise 5x5 (edit css)
    if (col !=5 || row !=5) {
        bingoDiv.style.gridTemplateColumns = "repeat(" + bingoData.length + ", 1fr)";
        bingoDiv.style.gridTemplateRows = "repeat(" + bingoData.length + ", 1fr)";
    }
     */

	// iterate thru bingoData & create divs for each card
	for (let i = 0; i < gridSize; i++) {
		for (let j = 0; j < bingoData.length; j++) {
			bingoDiv.innerHTML += "<div class='card'>" + bingoData[j][i] + "</div>"; // add card to bingo div
		}
	}
}

function randNumGen() {
    let num = Math.floor(Math.random()*75) + 1;
    return num; // change to editing inner html
}

/* ---------------------------------- to do ---------------------------------- */
// work out how toggle thingy works
// add custom grid size feature
// add custom card text feature
// add custom card color feature
// add feature that checks if card is bingo (diagonal, horizontal, vertical, blackout)
// add bingo number generator (for playing actual bingo)
// add button to regenerate bingo cards
// add button to change bingo card type (regular or custom)
// add feature to save and load custom bingo card data 
// add feature to make middle card free space

document.addEventListener("DOMContentLoaded", (event) => {
	generateBingo(generateNumbers());

	document.querySelectorAll(".card").forEach((card) => {
		card.addEventListener("click", () => {
			card.classList.toggle("toggled");
		});
	});
});
