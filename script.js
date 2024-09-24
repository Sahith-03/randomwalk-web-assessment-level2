const game_board = document.getElementById('game-board');
const status = document.getElementById('status');
const reset_button = document.getElementById('new-game');
const x_score = document.getElementById('x-score');
const o_score = document.getElementById('o-score');
const draw_score = document.getElementById('draw-score');

let current_player = 'X'; 
let game_state = ['', '', '', '', '', '', '', '', '']; // Stores the current state of the board
let game_active = true; //To check whether the game is ongoing
let scores = { X: 0, O: 0, Draw: 0 };

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Handles the click event on a cell
function handleCellClick(e) {
    const cell = e.target; //clicked cell
    const index = parseInt(cell.getAttribute('data-index')); //clicked cell_index

    if (game_state[index] !== '' || !game_active) {
        return;
    }

    //updating the game state and placing the current_symbol on the cell clicked
    game_state[index] = current_player; 
    placeSymbol(cell, current_player);

    //Checking whether the current user wins
    checkResult();
}

//Adding the symbol svg to the clicked_cell's div
function placeSymbol(cell, player) {
    cell.innerHTML = `<svg class="pop"><use href="#icon-${player.toLowerCase()}"/></svg>`;
    cell.classList.add(player.toLowerCase());
}

function checkResult() {
    let roundWon = false;
    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i]; //Destructuring each winning combination
        if (game_state[a] && game_state[a] === game_state[b] && game_state[a] === game_state[c]) { //checking whether winning condition meets
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        status.innerHTML = `Player ${current_player} wins!`; //Game status changed
        game_active = false;
        updateScore(current_player); //Updating score
        return;
    }

    // Check if all cells are filled and no winner - it's a draw
    if (!game_state.includes('')) {
        status.innerHTML = "It's a draw!"; 
        game_active = false; //End the game
        updateScore('Draw'); //Update Draw_Score
        return;
    }

    current_player = current_player === 'X' ? 'O' : 'X'; //Toggling current player
    status.innerHTML = `Player ${current_player}'s turn`; 
}

function updateScore(result) {
    scores[result]++; //Updating the scores object
    x_score.innerHTML = scores.X;
    o_score.innerHTML = scores.O;
    draw_score.innerHTML = scores.Draw;
}

function resetGame() {
    current_player = 'X';
    game_state = ['', '', '', '', '', '', '', '', ''];
    game_active = true;
    status.innerHTML = `Player ${current_player}'s turn`;
    document.querySelectorAll('.cell').forEach(cell => {
        cell.innerHTML = '';
        cell.classList.remove('x', 'o');
    });
}

game_board.addEventListener('click', handleCellClick);
reset_button.addEventListener('click', resetGame);