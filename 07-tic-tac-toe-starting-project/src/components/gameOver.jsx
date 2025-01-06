export default function GameOver({ winner, onHandelRematch }) {
  return (
    <div id="game-over">
      <h2>Game Over</h2>
      {winner && <p>{winner} Won !</p>}
      {!winner && <p>it's a draw !</p>}
      <p>
        <button onClick={onHandelRematch}>Rematch !</button>
      </p>
    </div>
  );
}
