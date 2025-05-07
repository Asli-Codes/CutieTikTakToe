let player1name;
let player2name;
let playerTurn;

let submitButton = document.getElementById("submit");
let userInput = document.getElementById("player-name");
let playerNumSpan = document.getElementById("player-num");


submitButton.addEventListener("click", () => {
    const name = userInput.value.trim();
    if (!name) return;


    if(!player1name) {
        player1name = name;
       userInput.value = "";
       playerNumSpan.innerText = "2"; //ikinci oyuncu için gösterimi değiştirir
    } else if (!player2name) {
        player2name = name;
        userInput.value = "";
        userInput.disabled = true;
        submitButton.disabled = true;
        startGame();
    }
});

function startGame() {
    playerTurn = 1;
    playerNumSpan.innerText = playerTurn; 

    const tds = document.getElementsByTagName("td");
    for (let i=0 ; i<tds.length; i++){
        tds[i].addEventListener("click", function handleClick() {
            if(tds[i].innerText ==="X" || tds[i].innerText === "O") return;
            
            tds[i].innerText =playerTurn === 1 ? "X" : "O";

            if(checkWin()){
                disableBoard();
                setTimeout(resetBoard,1000);
                return;
            }

            if (checkDraw()){
                disableBoard();
                setTimeout(resetBoard,1000);
                return;
            }

            changeTurn();
        });
    }
}

function changeTurn() {
   playerTurn = playerTurn === 1 ? 2 : 1 ;
   playerNumSpan.innerText = playerTurn;

    //Oyuncu sırasını ekrana yazdır 
    document.getElementById("player-num").innerText = playerTurn;
}

function checkWin() {
    const winPatterns = [
        ["r0c0","r0c1","r0c2"],
        ["r1c0","r1c1","r1c2"],
        ["r2c0","r2c1","r2c2"],

        ["r0c0","r1c0","r2c0"],
        ["r0c1","r1c1","r2c1"],
        ["r0c2","r1c2","r2c2"],

        ["r0c0","r1c1","r2c2"], 
        ["r0c2","r1c1","r2c0"]

    ];

    for (let pattern of winPatterns) {
        const [a,b,c] = pattern ;
        const cellA =document.getElementById(a).innerText;
        const cellB =document.getElementById(b).innerText;
        const cellC =document.getElementById(c).innerText;

        if (!cellA  || !cellB || !cellC) continue;

        if (cellA === cellB && cellB === cellC) {
            alert(`Player ${playerTurn} (${playerTurn === 1 ? player1name : player2name }) wins!`)
            return true ;
        }
    }
    return false;
}


function checkDraw() {
    const tds = document.getElementsByTagName("td");
    for(let i =0; i < tds.length; i++){
        if (tds[i].innerText !=="X" && tds[i].innerText !=="O"){
            return false;
        }
    }
    alert("It's a draw!");
    return true;
}

function disableBoard() {
    const tds = document.getElementsByTagName("td");
    for (let i = 0; i < tds.length; i++) {
        tds[i].style.pointerEvents ="none";
    } 
}

function resetBoard() {
    const tds = document.getElementsByTagName("td");
    for (let i = 0; i < tds.length; i ++) {
        tds[i].innerText ="";
        tds[i].style.pointerEvents = "auto";
    }
    playerTurn = 1;
    playerNumSpan.innerText = playerTurn;
}
