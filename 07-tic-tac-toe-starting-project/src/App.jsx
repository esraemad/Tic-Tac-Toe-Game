import { useState } from "react";
import GameBoard from "./components/gameboard";
import Player from "./components/player";
import Log from "./components/log";
import { WINNING_COMBINATIONS } from "./components/wining_compinations";
import GameOver from "./components/gameOver";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];
function derivedActivePlayer(gameTurns) {
  let currentPlayer = "X";
  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
}

function deriveGameBoard(gameTurns) {
  let gameBoard = [...initialGameBoard.map((array) => [...array])];
  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }
  return gameBoard;
}
function derivWinner(gameBoard, players) {
  let winner;
  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymoble =
      gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymoble =
      gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymoble =
      gameBoard[combination[2].row][combination[2].column];

    if (
      firstSquareSymoble &&
      firstSquareSymoble === secondSquareSymoble &&
      firstSquareSymoble === thirdSquareSymoble
    ) {
      winner = players[firstSquareSymoble];
    }
  }
  return winner;
}
function App() {
  const [players, setPlayers] = useState({ X: "Player 1", O: "Player 2" });
  const [gameTurns, setGameTurns] = useState([]);

  let gameBoard = deriveGameBoard(gameTurns);
  const winner = derivWinner(gameBoard, players);
  const hasDraw = gameTurns.length === 9 && !winner;
  //const [activePlayer, setActivePlayer] = useState("X");
  const activePlayer = derivedActivePlayer(gameTurns);
  function handelSelectSquare(rowIndex, colIndex) {
    // setActivePlayer((currentActivePlayer) =>
    //   currentActivePlayer === "X" ? "O" : "X"
    // );
    setGameTurns((prevTurns) => {
      const currentPlayer = derivedActivePlayer(prevTurns);
      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];
      return updatedTurns;
    });
  }

  function handelRematch() {
    setGameTurns([]);
  }
  function handelPlayerNameChange(symobol, newNAme) {
    setPlayers((prevPlayers) => {
      return {
        ...prevPlayers,
        [symobol]: newNAme,
      };
    });
  }
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            name="Player 1 "
            symobol="X"
            isActive={activePlayer === "X"}
            onChangeName={handelPlayerNameChange}
          />
          <Player
            name="Player 2 "
            symobol="O"
            isActive={activePlayer === "O"}
            onChangeName={handelPlayerNameChange}
          />
        </ol>
        {(winner || hasDraw) && (
          <GameOver onHandelRematch={handelRematch} winner={winner} />
        )}
        <GameBoard
          onSelectSquare={handelSelectSquare}
          board={gameBoard}
          //activePlayerSymbol={activePlayer}
        />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
