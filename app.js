var inputs = ["X", "O"];
var currentIndex = 0;
var order = 3;
var grid = [];
var count = 0;
var tableId = "tic-toc-toe";

function move(event) {
  var target = event.target;
  var rowIndex = target.parentElement.rowIndex;
  var cellIndex = target.cellIndex;
  var value = inputs[currentIndex];
  if (target.tagName !== 'TD' || grid[rowIndex][cellIndex]) return;
  grid[rowIndex][cellIndex] = value;
  currentIndex = 1 - currentIndex;
  target.innerText = value;
  count = count + 1;

  if (count >= ((2 * order) - 1)) {
    setTimeout(function() {
      computeScore();
    }, 100);
  }
}

function computeScore() {
  var winner = checkRowTriplet() || checkColumnTriplet() || checkDiagonal1Triplet() || checkDiagonal2Triplet();
  if (winner) {
    alert('Winner - ' + winner);
    reset();
    return;
  }
  if(count >= order ** 2) {
    alert('Match drawn!');
    reset();
  }
}

function checkRowTriplet() {
  var player;
  var count;
  var winner;
  for (var row = 0; row < order; row++) {
    player = grid[row][0];
    count = 0;
    if(!player) continue;
    for (var col = 1; col < order; col++) {
      if(player === grid[row][col]) count = count + 1;
    }
    if(count === order - 1) {
      winner = player;
      break;
    }
  }
  return winner;
}

function checkColumnTriplet() {
  var player;
  var count;
  var winner;
  for (var col = 0; col < order; col++) {
    player = grid[0][col];
    count = 0;
    if(!player) continue;
    for (var row = 1; row < order; row++) {
      if(player === grid[row][col]) count = count + 1;
    }
    if(count === order - 1) {
      winner = player;
      break;
    }
  }
  return winner;
}

function checkDiagonal1Triplet() {
  var player = grid[0][0];
  var count = 0;
  if(!player) return;
  for (var row = 1; row < order; row++) {
    if (player === grid[row][row]) count = count + 1;
  }
  if (count === order - 1) return player;
}

function checkDiagonal2Triplet() {
  var player = grid[0][order-1];
  var count = 0;
  if(!player) return;
  for (var row = 1; row < order; row++) {
    if (player === grid[row][order-row-1]) count = count + 1;
  }
  if (count === order - 1) return player;
}

function reset() {
  init();
}

function init() {
  var ticTocToe = document.getElementById(tableId);
  if (ticTocToe) {
    ticTocToe.parentNode.removeChild(ticTocToe);
  }
  generateTable(order, tableId);
  document.getElementById(tableId).addEventListener('click', move);
  grid = [];
  for(var row = 0; row < order; row++) {
    grid.push([]);
  }
}

function changeOrder(object) {
  order = Number(object.value);
  init();
}

function generateTable(order, id) {
  var gameContainer = document.getElementsByClassName("game-container")[0];
  var tbl = document.createElement("table");
  tbl.setAttribute('id', id)
  var tblBody = document.createElement("tbody");
  for (var i = 0; i < order; i++) {
    var row = document.createElement("tr");
    for (var j = 0; j < order; j++) {
      var cell = document.createElement("td");
      row.appendChild(cell);
    }
    tblBody.appendChild(row);
  }
 
  tbl.appendChild(tblBody);
  gameContainer.insertBefore(tbl, gameContainer.firstChild);
  tbl.setAttribute("border", "1");
}

init();