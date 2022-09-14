var board;
var score = 0;
var rows = 4;
var columns = 4;

window.onload = function () {
    InicioGame();
}

function InicioGame() {
    board = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
    ]

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            let num = board[r][c];
            atualizarTile(tile, num);
            document.getElementById("board").append(tile);
        }
    }

    InicioDois();
    InicioDois();
}

function atualizarTile(tile, num) {
    tile.innerText = "";
    tile.classList.value = "";
    tile.classList.add("tile");
    if (num > 0) {
        tile.innerText = num.toString();
        if (num <= 4096) {
            tile.classList.add("x"+num.toString());
        }
        else {
            tile.classList.add("x8192");
        }
    }
}

document.addEventListener('keyup', (e) => {
    if (e.code == "ArrowLeft") {
        deslizarEsquerda();
        InicioDois();
    }
    else if (e.code == "ArrowRight") {
        deslizarDireita();
        InicioDois();
    }
    else if (e.code == "ArrowUp") {
        deslizarAcima();
        InicioDois();
    }
    else if (e.code == "ArrowDown") {
        deslizarAbaixo();
        InicioDois();
    }
    document.getElementById("score").innerText = score;
})

function colocaZero(row) {
    return row.filter(num => num != 0);
}

function deslizar(row) {
    row = colocaZero(row);
    for (let i = 0; i < row.length-1; i++){
        if (row[i] == row[i+1]) {
            row[i] *= 2;
            row[i+1] = 0;
            score += row[i];
        }
    } //[4, 0, 2]
    row = colocaZero(row); //[4, 2]
    //add zeroes
    while (row.length < columns) {
        row.push(0);
    } //[4, 2, 0, 0]
    return row;

}

function deslizarEsquerda() {
    for (let r = 0; r < rows; r++) {
        let row = board[r];
        row = deslizar(row);
        board[r] = row;
        for (let c = 0; c < columns; c++) {
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            atualizarTile(tile, num);
        }
    }
}

function deslizarDireita() {
    for (let r = 0; r < rows; r++) {
        let row = board[r];
        row.reverse();
        row = deslizar(row);     
        board[r] = row.reverse();
        for (let c = 0; c < columns; c++) {
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            atualizarTile(tile, num);
        }
    }
}

function deslizarAcima() {
    for (let c = 0; c < columns; c++) {
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
        row = deslizar(row);

        for (let r = 0; r < rows; r++){
            board[r][c] = row[r];
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            atualizarTile(tile, num);
        }
    }
}

function deslizarAbaixo() {
    for (let c = 0; c < columns; c++) {
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
        row.reverse();
        row = deslizar(row);
        row.reverse();
        // board[0][c] = row[0];
        // board[1][c] = row[1];
        // board[2][c] = row[2];
        // board[3][c] = row[3];

        for (let r = 0; r < rows; r++) {
            board[r][c] = row[r];
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            atualizarTile(tile, num);
        }
    }
}


function InicioDois() {
    if (!seVazioTile()) {
        return;
    }

    let found = false;
    while (!found) {
        let r = Math.floor(Math.random() * rows);
        let c = Math.floor(Math.random() * columns);
        console.log('caiu aqui xereca')
        if (board[r][c] == 0) {
            board[r][c] = 2;
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            tile.innerText = "2";
            tile.classList.add("x2");
            found = true;
        }
    }
}


function seVazioTile(){
    let conta = 0;
    for(let r = 0; r < rows; r++)
    {
        for (let c = 0; c < columns; c++)
        {
            if(board[r][c]==0){
                return true;
            }
        }
    }
    return false;
}
