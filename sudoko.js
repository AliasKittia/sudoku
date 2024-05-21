const initialBoard = [
    [5, 3, null, null, 7, null, null, null, null],
    [6, null, null, 1, 9, 5, null, null, null],
    [null, 9, 8, null, null, null, null, 6, null],
    [8, null, null, null, 6, null, null, null, 3],
    [4, null, null, 8, null, 3, null, null, 1],
    [7, null, null, null, 2, null, null, null, 6],
    [null, 6, null, null, null, null, 2, 8, null],
    [null, null, null, 4, 1, 9, null, null, 5],
    [null, null, null, null, 8, null, null, 7, 9]
];

function createBoard() {
    const board = document.getElementById('sudoku-board');
    for (let i = 0; i < 9; i++) {
        let row = document.createElement('tr');
        for (let j = 0; j < 9; j++) {
            let cell = document.createElement('td');
            if (initialBoard[i][j]) {
                cell.innerHTML = initialBoard[i][j];
            } else {
                let input = document.createElement('input');
                input.setAttribute('type', 'text');
                input.setAttribute('maxlength', '1');
                input.setAttribute('oninput', 'validateInput(this)');
                cell.appendChild(input);
            }
            if ((j + 1) % 3 === 0 && j !== 8) {
                cell.classList.add('thick-border-right');
            }
            if ((i + 1) % 3 === 0 && i !== 8) {
                cell.classList.add('thick-border-bottom');
            }
            row.appendChild(cell);
        }
        board.appendChild(row);
    }
}

function validateInput(input) {
    input.value = input.value.replace(/[^1-9]/g, '');
}

function checkSudoku() {
    let correct = true;
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (initialBoard[i][j] === null) {
                const cell = document.querySelector(`#sudoku-board tr:nth-child(${i + 1}) td:nth-child(${j + 1})`);
                const input = cell.querySelector('input');
                const value = parseInt(input.value) || null;
                const isValid = value !== null && validateNumber(i, j, value);
                input.className = isValid ? 'green' : 'red';
                if (!isValid) correct = false;
            }
        }
    }

    if (correct) {
        document.getElementById('message').innerText = "Gratulálunk, minden szám helyes!";
    } else {
        document.getElementById('message').innerText = "";
    }
}

function validateNumber(row, col, num) {
    if (num === null) return false;

    for (let i = 0; i < 9; i++) {
        if ((initialBoard[row][i] === num && i !== col) || 
            (initialBoard[i][col] === num && i !== row)) {
            return false;
        }
    }

    let startRow = Math.floor(row / 3) * 3;
    let startCol = Math.floor(col / 3) * 3;
    for (let i = startRow; i < startRow + 3; i++) {
        for (let j = startCol; j < startCol + 3; j++) {
            if (initialBoard[i][j] === num && (i !== row || j !== col)) {
                return false;
            }
        }
    }
    return true;
}

function resetBoard() {
    const board = document.getElementById('sudoku-board');
    board.innerHTML = ''; // Töröljük a jelenlegi táblát
    createBoard(); // Újra létrehozzuk az eredeti táblát
    document.getElementById('message').innerText = ''; // Töröljük az üzenetet
}


document.addEventListener('DOMContentLoaded', createBoard);
