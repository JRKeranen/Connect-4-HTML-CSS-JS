let allCheckers = document.getElementsByClassName("checker");
let turnBox = document.getElementById("turn");
let clickButton = document.getElementById("start");
var turn = 'red'; // red = red turn, yellow = yellow turn
var red = "red";
var yellow = "yellow";
var board = [
    ['0' , '1', '2', '3', '4', '5', '6'],
    ['7' ,'8' ,'9' ,'10','11','12','13'],
    ['14','15','16','17','18','19','20'],
    ['21','22','23','24','25','26','27'],
    ['28','29','30','31','32','33','34'],
    ['35','36','37','38','39','40','41']
];
var columnsA = [[],[],[],[],[],[],[]];
var columnsB = [[],[],[],[],[],[],[]];
let stringCol = [[],[],[],[],[],[],[]];
let stringRow = [[],[],[],[],[],[]];
let stringPosD = [[],[],[],[],[],[]];
let stringNegD = [[],[],[],[],[],[]];
let winRed = red+red+red+red;
let winYellow = yellow+yellow+yellow+yellow;
let win = false;

// Gets columnsA with background style, and gets columnsB with all checker elements
function getColumns(){
    columnsA = [[],[],[],[],[],[],[]];
    columnsB = [[],[],[],[],[],[],[]];
    for (let i = 0; i < allCheckers.length; i++) {
        let certCol = i%7;
        columnsB[certCol].push(allCheckers[i]);     
    };
    for (let i = 0; i < board.length; i++){
        let row = board[i];
        for (let x = 0; x <row.length; x++){
            let certCol = x%row.length;    
            columnsA[certCol].push(row[x]);  
        }
    };

};
// resets all checker background colors to black
function resetBoard(){
    for (let i = 0; i < allCheckers.length; i++) {
        allCheckers[i].style.backgroundColor = "black";
    };
};

//<<<<Updates Board array>>>>>>
/*this get the background color of every checker on the html document and puts that
for the value of its position on the array board */

function getBoard() { 
    let counter = 0;
    for (let i = 0; i < board.length; i++) {
        let element = board[i];
        for (let x = 0; x < element.length; x++) {
            let change = allCheckers[counter].style.backgroundColor;
            element[x] = change;
            counter += 1;
        }  
    }
    getColumns();
    };

//place checkers in column
function placeRow(x){ 
    if (win == false) {
        let lowest = getLowestchecker(x);
        let Turn = getTurn();
        if (lowest == null) {
            turnBox.innerHTML = "Choose Different Box";
        }else {
        lowest.style.backgroundColor = Turn;
        getBoard();
        checkWin(); 
        changeTurn();    
        }
    }
};

//adds event listener on every checker
for (let i = 0; i < allCheckers.length; i++) {
    let certCol = i%7;
    allCheckers[i].addEventListener('click', function(){
        placeRow(certCol);
        getBoard();
    })
    resetBoard();
    getBoard();     
    getTurn();
};
// Checks the lowest position in the column and outputs to placeRow()
function getLowestchecker(column){
    getBoard();
    let specificColumn =columnsA[column];
    let outputColumn = columnsB[column];
    for (let i = 5; i > -1; i--) {
        const element = specificColumn[i];
        if (specificColumn[0] != "black"){
            return null;
        }else {
            if (element == "black"){
                return outputColumn[i];
            }
        };
        
    }
    return outputColumn[4];
};
// get the turn of the user
function getTurn() {
    if (turn == "red"){
        return "red";
    }
    else if (turn == "yellow"){
        return "yellow";
    }else{console.log("turn Error in getTurn()");};
}

// function changes the turn
function changeTurn() {
    if (turn == "red"){
        turn = "yellow";
    }
    else if (turn == "yellow"){
        turn = "red";
    }
    else{console.log("turn Error in changeTurn()");};
    if (win == false) {
        turnBox.innerText = turn;
    }
};

// starts game over, is called from start game button
function startGame(){
    win = false;
    resetBoard();
    turn = red;
    turnBox.innerHTML = 'red';
}

clickButton.addEventListener('click', function(){
    startGame();
})

//this checks to see if there is a winner
function checkWin(){
    stringCol = [[],[],[],[],[],[],[]];
    stringRow = [[],[],[],[],[],[]];
    stringPosD = [[],[],[],[],[],[]];
    stringNegD = [[],[],[],[],[],[]];
    
    // loop to get stringCol
    for (let i = 0; i < board.length; i++){
        let row = board[i];
        for (let x = 0; x <row.length; x++){
            let certCol = x%row.length; 
            stringCol[certCol] += row[x];
        }
    };
    // loop to get stringRow
    for (let i = 0; i < board.length; i++){
        let row = board[i];
        for (let x = 0; x <row.length; x++){
            stringRow[i] += row[x];
        }
    };
    // loop to get stringPosD
    for (let i = 0; i < 3; i++) {
        let row = i
        if (row == 0) {
            for (let x = 6; x > 2; x--) {
                let col = x;
                if (x == 6){
                    for (let y = 0; y < 6; y++) {
                        stringPosD[2] += board[row+y][col-y];
                    }
                }
                else if (x == 5){
                    for (let y = 0; y < 6; y++) {
                        stringPosD[3] += board[row+y][col-y];
                    }
                }
                else if (x == 4){
                    for (let y = 0; y < 5; y++) {
                        stringPosD[4] += board[row+y][col-y];
                    }
                }
                else if (x == 3){
                    for (let y = 0; y < 4; y++) {
                        stringPosD[5] += board[row+y][col-y];
                    }
                }
            }
        }
        else if (row == 1){
            let col = 6;
            for (y = 0; y<5;y++){
            stringPosD[1] += board[row+y][col-y];
            }
        }
        else if (row == 2){
            let col = 6;
            for (y = 0; y<4;y++){
                stringPosD[0] += board[row+y][col-y];
                }
    }
        }
    // loop to get stringNegD
    for (let i = 0; i < 3; i++) {
        let row = i
        if (row == 0) {
            for (let x = 0; x < 4; x++) {
                let col = x;
                if (x == 0){
                    for (let y = 0; y < 6; y++) {
                        stringNegD[2] += board[row+y][col+y];
                    }
                }
                else if (x == 1){
                    for (let y = 0; y < 6; y++) {
                        stringNegD[3] += board[row+y][col+y];
                    }
                }
                else if (x == 2){
                    for (let y = 0; y < 5; y++) {
                        stringNegD[4] += board[row+y][col+y];
                    }
                }
                else if (x == 3){
                    for (let y = 0; y < 4; y++) {
                        stringNegD[5] += board[row+y][col+y];
                    }
                }
            }
        }
        else if (row == 1){
            let col = 0;
            for (y = 0; y<5;y++){
            stringNegD[1] += board[row+y][col+y];
            }
        }
        else if (row == 2){
            let col = 0;
            for (y = 0; y<4;y++){
                stringNegD[0] += board[row+y][col+y];
                }
    }
        }
    let colection = [stringRow,stringNegD,stringPosD];
    for (let i = 0; i < stringCol.length; i++) {
        let element = stringCol[i];
        if (element.includes(winRed)){
            win = true;
        }else if (element.includes(winYellow)){
            win = true;
        }
    }
    for (let i = 0; i < colection.length; i++) {
        const element = colection[i];
        for (let x = 0; x < element.length; x++) {
            const str = element[x];
            if (str.includes(winRed)){
                win = true;
            }else if (str.includes(winYellow)){
                win = true;
            }
        }
    }
    if (win == true) {
        console.log(turn);
        let winstr = turn + " Wins";
        turnBox.innerText = winstr;
    }
}

// this is the gets the right person
function getWinTurn() {
    if (turn == "red"){
        return "yellow";
    }
    else if (turn == "yellow"){
        return "red";
    }else{console.log("turn Error in getTurn()");};
}