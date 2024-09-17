let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameMode = '';
let isGameActive = true;

const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

document.getElementById('player-vs-player').addEventListener('click', () => startGame('PVP'));
document.getElementById('player-vs-computer').addEventListener('click', () => startGame('PVC'));
document.getElementById('reset').addEventListener('click', resetGame);

function startGame(mode) {
    gameMode = mode;
    document.getElementById('mode-selection').classList.add('hidden');
    document.getElementById('game-board').classList.remove('hidden');
}

function handleClick(event) {
    const cellIndex = event.target.getAttribute('data-index');
    if (board[cellIndex] || !isGameActive) return;

    board[cellIndex] = currentPlayer;
    event.target.textContent = currentPlayer;

    if (checkWinner()) {
        document.getElementById('status').textContent = `${currentPlayer} wins!`;
        isGameActive = false;
        return;
    }

    if (board.every(cell => cell)) {
        document.getElementById('status').textContent = 'It\'s a draw!';
        isGameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';

    if (gameMode === 'PVC' && currentPlayer === 'O' && isGameActive) {
        setTimeout(computerMove, 500);
    }
}

function computerMove() {
    let emptyCells = board.map((cell, index) => cell === '' ? index : null).filter(index => index !== null);
    let randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    board[randomIndex] = 'O';
    document.querySelector(`.cell[data-index="${randomIndex}"]`).textContent = 'O';
    
    if (checkWinner()) {
        document.getElementById('status').textContent = 'O wins!';
        isGameActive = false;
        return;
    }

    if (board.every(cell => cell)) {
        document.getElementById('status').textContent = 'It\'s a draw!';
        isGameActive = false;
        return;
    }

    currentPlayer = 'X';
}

function checkWinner() {
    return winningCombinations.some(combination => {
        const [a, b, c] = combination;
        return board[a] && board[a] === board[b] && board[a] === board[c];
    });
}

function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    isGameActive = true;
    document.querySelectorAll('.cell').forEach(cell => cell.textContent = '');
    document.getElementById('status').textContent = '';
    document.getElementById('mode-selection').classList.remove('hidden');
    document.getElementById('game-board').classList.add('hidden');
}

document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleClick));
