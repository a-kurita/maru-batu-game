const maruMark = "〇";
const batuMark = "✕";
const maruWinPattern = maruMark + maruMark + maruMark;
const batuWinPattern = batuMark + batuMark + batuMark;

let currentPlayer = maruMark;
let winner = "";

function displayCurrentPlayer() {
  let element = document.getElementById("player");
  element.innerText = currentPlayer + "のターン";
}

function reversePlayer() {
  if (currentPlayer == maruMark) {
    currentPlayer = batuMark;
  } else {
    currentPlayer = maruMark;
  }
}

function getCurrentMarks() {
  let marks = [];
  for (i = 1; i <= 9; i++) {
    let element = document.getElementById(i);
    marks.push(element.value);
  }
  return marks;
}

function judge() {
  // 勝ち負けの判定
  let currentMarkArr = getCurrentMarks();

  const splitted = [
    currentMarkArr.slice(0, 3),
    currentMarkArr.slice(3, 6),
    currentMarkArr.slice(6, 9),
  ];
  for (i = 0; i <= 2; i++) {
    // 横方向のチェック
    if (
      splitted[i].join("") == maruWinPattern ||
      splitted[i].join("") == batuWinPattern
    ) {
      winner = currentPlayer;
      break;
    }

    // 縦方向のチェック
    const row1 = splitted[0];
    const row2 = splitted[1];
    const row3 = splitted[2];

    let vertical = row1[i] + row2[i] + row3[i];
    if (vertical == maruWinPattern || vertical == batuWinPattern) {
      winner = currentPlayer;
      break;
    }

    let diagonal1 = row1[0] + row2[1] + row3[2];
    let diagonal2 = row1[2] + row2[1] + row3[0];
    if (diagonal1 == maruWinPattern || diagonal1 == batuWinPattern) {
      winner = currentPlayer;
      break;
    } else if (diagonal2 == maruWinPattern || diagonal2 == batuWinPattern) {
      winner = currentPlayer;
      break;
    }

    if (currentMarkArr.join("").length === 9) {
      winner = "引き分け";
    }
  }
}

function writeMark(square) {
  let element = document.getElementById(square);

  if (element.value.length !== 0 || winner.length !== 0) {
    return;
  }
  element.value = currentPlayer;

  judge();

  let playerElement = document.getElementById("player");
  if (winner == "引き分け") {
    playerElement.innerText = winner;
  } else if (winner.length !== 0) {
    playerElement.innerText = winner + "の勝ち";
  } else {
    reversePlayer();
    displayCurrentPlayer();
  }
}

function reset() {
  for (i = 1; i <= 9; i++) {
    let element = document.getElementById(i);
    element.value = "";
  }
  currentPlayer = maruMark;
  displayCurrentPlayer();
  winner = "";
}

displayCurrentPlayer();
