let board;
let score = 0;
let rows = 4;
let cols = 4;
let stopgame = false;

window.onload = function () {
    setGame();
}

function setGame() {
    board = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ]
    document.getElementById("gameOver").style.display = "none";
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            let num = board[r][c];
            updateTile(tile, num);
            document.getElementById("board").append(tile);
        }
    }
    setTwo();
    setTwo();
}
function reset() {
    board = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ]
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            updateTile(tile, board[r][c]);
        }
    }
    score = 0;
    document.getElementById("score").innerHTML = score;
    stopgame = false;
    document.getElementById("gameOver").style.display = "none";
    setTwo();
    setTwo();
}
function emptyTile() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (board[r][c] == 0)
                return true;
        }
    }
    return false;
}
function setTwo() {
    if (!emptyTile()) {
        stopgame = true;
        gameOverDisplay();
        let x = document.getElementById("gameOver");
        x.style.display = "block";
        return;
    }
    let found = false;
    while (!found) {
        let r = Math.floor(Math.random() * rows);
        let c = Math.floor(Math.random() * cols);
        if (board[r][c] == 0) {
            board[r][c] = 2;
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            updateTile(tile, 2);
            found = true;
        }
    }
}
function gameOverDisplay() {
    board = [
        ["*", "*", "*", "*"],
        ["G", "A", "M", "E"],
        ["O", "V", "E", "R"],
        ["*", "*", "*", "*"]
    ]
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            tile.innerText = board[r][c];
            tile.classList.value = "";
            tile.classList.add("tile");
            tile.classList.add("overtext");
        }
    }
}
function updateTile(tile, num) {
    tile.innerText = "";
    tile.classList.value = "";//clear the classList;
    tile.classList.add("tile");
    if (num > 0) {
        tile.innerText = num;
        if (num <= 4096) {
            tile.classList.add("tile" + num.toString());
        }
        else {
            tile.classList.add(tile8192);
        }
    }
}
document.addEventListener("keyup", (e) => {
    if (!stopgame) {
        if (e.code == "ArrowLeft") {
            slideLeft(); setTwo();
        }
        if (e.code == "ArrowRight") {
            slideRight(); setTwo();
        }
        if (e.code == "ArrowUp") {
            slideUp(); setTwo();
        }
        if (e.code == "ArrowDown") {
            slideDown(); setTwo();
        }
        document.getElementById("score").innerHTML = score;
    }
})
function filterZero(row) {
    return row.filter(num => num > 0);
}
function slide(row) {
    row = filterZero(row);

    for (let i = 0; i < row.length - 1; i++) {
        if (row[i] == row[i + 1]) {
            row[i] *= 2;
            row[i + 1] = 0;
            score += row[i];
        }
    }
    row = filterZero(row);
    for (let i = row.length; i < rows; i++) {
        row.push(0);
    }
    return row;
}
function slideLeft() {
    for (let r = 0; r < rows; r++) {
        let row = board[r];
        row = slide(row);
        board[r] = row;

        for (let c = 0; c < cols; c++) {
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);

        }
    }
}
function slideRight() {
    for (let r = 0; r < rows; r++) {
        let row = board[r];
        row.reverse();
        row = slide(row);
        row.reverse();
        board[r] = row;

        for (let c = 0; c < cols; c++) {
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);

        }
    }
}
function slideUp() {
    for (let c = 0; c < cols; c++) {
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
        row = slide(row);
        for (let r = 0; r < rows; r++) {
            board[r][c] = row[r];
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}
function slideDown() {
    for (let c = 0; c < cols; c++) {
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
        row.reverse()
        row = slide(row);
        row.reverse();
        for (let r = 0; r < rows; r++) {
            board[r][c] = row[r];
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}