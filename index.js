let Turn = "x";
let moves = 0;
let Over = false;
let span = document.getElementsByTagName("span")
let reset = '<button onclick="Again()"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-arrow-repeat" viewBox="0 0 16 16"><path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z"/><path fill-rule="evenodd" d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z"/></svg></button>'
let won = []

function play(escopo) {
    if (escopo.dataset.player == 'none' && Over == false) {
        escopo.innerHTML = Turn;
        escopo.dataset.player = Turn;

        moves++;

        if (Turn == 'x') {
            Turn = 'o'
        } else if (Turn == 'o') {
            Turn = 'x'
        }
    }

    check(0, 1, 2)
    check(3, 4, 5)
    check(6, 7, 8)
    check(0, 3, 6)
    check(1, 4, 7)
    check(2, 5, 8)
    check(0, 4, 8)
    check(2, 4, 6)

    if (moves == 9 && Over == false) {
        won = [-1, -1, -1];
        empate();
    }
}

function check(i, j, k) {
    if ((span[i].dataset.player == span[j].dataset.player && span[j].dataset.player == span[k].dataset.player) && span[i].dataset.player != 'none') {
        span[i].parentNode.className += " Active";
        span[j].parentNode.className += " Active";
        span[k].parentNode.className += " Active";

        won = [i, j, k]

        winner(i);
    }
}

function winner(i) {
    let Winner_msg = '<b>END<b><br><br>Jogador' + span[i].dataset.player.toUpperCase() + ' Ganhou!!!! <br><br>' + reset;
    let div = document.createElement("div");

    div.className = "alerta";
    div.innerHTML = Winner_msg;

    document.getElementsByTagName("body")[0].appendChild(div);
    Over = true;
    moves = 0;
}

function empate() {
    let empate_msg = '<b>EMPATE!!!<b><br><br>' + reset;
    let div = document.createElement("div");

    div.className = "alerta";
    div.innerHTML = empate_msg;

    document.getElementsByTagName("body")[0].appendChild(div);
    Over = true;
    moves = 0;
}

function Again() {
    document.getElementsByClassName('alerta')[0].parentNode.removeChild(document.getElementsByClassName('alerta')[0]);

    for (let i = 0; i < 9; i++) {
        span[i].innerHTML = '&nbsp'
        span[i].dataset.player = 'none'
    }

    if (won[0] != -1) {
        for (let i = 0; i < won.length; i++) {
            span[won[i]].parentNode.className = span[won[i]].parentNode.className.replace("Active", "");
        }
    }

    Turn = 'x'
    Over = false;
}