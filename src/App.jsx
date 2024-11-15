import { useState } from "react";

const Square = ({ value, onSquareClick }) => {
  return (
    <button
      onClick={onSquareClick}
      className="bg-white border border-black h-12 w-12 m-1 leading-5 text-lg"
    >
      {value}
    </button>
  );
};

export const Board = ({xIsNext, squares, onPlay }) => {
  const winner = calculateWinner(squares);
  let status;

  if (winner) {
    status = `Winner : ${winner}`;
  } else {
    status = "Next player : " + (xIsNext ? "X" : "O");
  }

  const handleClick = (i) => {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }

    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }

    onPlay(nextSquares)

    // setXIsNext(!xIsNext);
    // setSquares(nextSquares);
  };

  return (
    <>
      <div>{status}</div>
      {/* first line */}
      <div className="flex">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      {/* mid line */}
      <div className="flex">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      {/* 3rd line */}
      <div className="flex">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
};

const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

const Game = () => {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [xIsNext, setXIsNext] = useState(true);
  const [currentMove, setCurrentMove] = useState(0);

  const currentSquares = history[currentMove];

  const handlePlay = (nextSquares) => {
    setXIsNext(!xIsNext);
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares]
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length -1)
  };


  // History Moves
  const moves = history.map((squares, move) =>{

    let description;
    if(move > 0){
      description = `Go to the move # ${move}`;
    }
    else{
      description = `Go to start game`;
    }

     // jump to
  const jumpTo=()=>{
    setCurrentMove(move);
    setXIsNext(move % 2 === 0)
}
    return (
      <li key={move}>
        <button onClick={()=>jumpTo(move)}>{description}</button>
      </li>
    )
  })



  return (
    <div>
      <div>
        <Board
         xIsNext={xIsNext} 
         squares={currentSquares}
         onPlay={handlePlay} />
      </div>
      <div>
        <ol>{moves}</ol>
      </div>
    </div>
  );
};

export default Game;
