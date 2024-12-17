document.addEventListener('DOMContentLoaded', () => {
    const displayStatus = document.querySelector('.game--status');
    const displayPlayer = document.querySelector('.game--player');
    const cells = document.querySelectorAll('.container--cell');
    const restart = document.querySelector('.game--restart--bttn');

    let gameActive = true;
    let currentPlayer = 'X';
    let gameStatus = ["", "", "", "", "", "", "", "", ""];

    const currentPlayerTurn = () => {
        return `Turn: ${currentPlayer}`;
    };

    displayPlayer.innerHTML = currentPlayerTurn();

    restart.addEventListener('click', handleRestart);

    cells.forEach((cell, index) => {
        console.log(`Attaching event listener to cell ${index}`); // Log for debugging
        cell.addEventListener('click', () => handleCellClicked(index)); // Only pass index here
    });

    function handleCellClicked(clickedCellIndex) {
        if (gameStatus[clickedCellIndex] != "" || !gameActive) return;

        const clickedCell = cells[clickedCellIndex]; // Get the actual cell
        gameStatus[clickedCellIndex] = currentPlayer;
        clickedCell.innerHTML = currentPlayer;
        resultValidation();
        handlePlayerChange();
    }

    function handlePlayerChange() {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        displayPlayer.innerHTML = currentPlayerTurn();
    }

    function resultValidation() {
        let roundWon = false;

        const winningConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        for (let i = 0; i < winningConditions.length; i++) {
            const [a, b, c] = winningConditions[i];
            if (
                gameStatus[a] !== "" &&
                gameStatus[a] === gameStatus[b] &&
                gameStatus[a] === gameStatus[c]
            ) {
                roundWon = true;
                break;
            }
        }
        if (roundWon) {
            displayStatus.innerHTML = `${currentPlayer} has won!!`;
            gameActive = false;
            return;
        }
        if (!gameStatus.includes("")) {
            displayStatus.innerHTML = 'Draw!!';
            gameActive = false;
            return;
        }
    }

    function handleRestart() {
        gameActive = true;
        gameStatus = ["", "", "", "", "", "", "", "", ""];
        currentPlayer = 'X';
        cells.forEach(cell => {
            cell.innerHTML = "";
        });
        displayPlayer.innerHTML = currentPlayerTurn();
        displayStatus.innerHTML = "";
    }
});
