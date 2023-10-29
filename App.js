import React from 'react';
import { useState } from 'react';

function Square({ value, onSquareClick, selected }) {
  return (
    <button className={"square " + (selected ? "selected" : "")} onClick={onSquareClick}>
      {value}
    </button>
  );
}

export default function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [currentMove, setCurrentMove] = useState(0);
  const [selectedSquare, setSelectedSquare] = useState(null);
  const xIsNext = currentMove % 2 === 0;

  function handleReset() {
    setSquares(Array(9).fill(null));
    setSelectedSquare(null);
    setCurrentMove(0);
  }

  function isAdjacent(i, j) {
    switch (i) {
      case 1:
        return j === 2 || j === 4 || j === 5;
      case 2:
        return j === 1 || j === 3 || j === 4 || j === 5 || j === 6;
      case 3:
        return j === 2 || j === 5 || j === 6;
      case 4:
        return j === 1 || j === 2 || j === 5 || j === 7 || j === 8;
      case 5:
        return Boolean(j);
      case 6:
        return j === 2 || j === 3 || j === 5 || j === 8 || j === 9;
      case 7:
        return j === 4 || j === 5 || j === 8;
      case 8:
        return j === 4 || j === 5 || j === 6 || j === 7 || j === 9;
      case 9:
        return j === 5 || j === 6 || j === 8;
      default:
        return false;
    }
  }

  function handleClick(i) {
    if (calculateWinner(squares)) return;

    if (selectedSquare === i) {
      setSelectedSquare(null);
    } else if (selectedSquare !== null && squares[i] === squares[selectedSquare]) {
      setSelectedSquare(i);
    } else if (selectedSquare !== null && isAdjacent(i + 1, selectedSquare + 1)) {
      if (squares[i]) return;
      const nextSquares = squares.slice();
      nextSquares[i] = (xIsNext ? 'X' : 'O');
      nextSquares[selectedSquare] = null;
      if (squares[4] === (xIsNext ? 'X' : 'O') && nextSquares[4] === squares[4] && !calculateWinner(nextSquares)) return;

      setSquares(nextSquares);
      setCurrentMove(currentMove + 1);
      setSelectedSquare(null);
    } else if (selectedSquare === null) {
      if (currentMove >= 6) {
        if (squares[i] === (xIsNext ? 'X' : 'O')) setSelectedSquare(i);
      } else {
        if (squares[i]) return;
        const nextSquares = squares.slice();
        nextSquares[i] = (xIsNext ? 'X' : 'O');
        setSquares(nextSquares);
        setCurrentMove(currentMove + 1);
      }
    }
  }


  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  return (
    <>
      <h1>Chorus Lapilli</h1>
      <hr></hr>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} selected={selectedSquare === 0} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} selected={selectedSquare === 1} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} selected={selectedSquare === 2} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} selected={selectedSquare === 3} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} selected={selectedSquare === 4} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} selected={selectedSquare === 5} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} selected={selectedSquare === 6} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} selected={selectedSquare === 7} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} selected={selectedSquare === 8} />
      </div>
      <button onClick={handleReset} className="reset">Reset</button>
      <hr></hr>
      <strong>Rules:</strong>
      <ol>
        <li>
          Like tic-tac-toe, players take turn placing pieces on a 3 by 3 board and the goal is to get three pieces in a row. X goes first, then O.
        </li>
        <li>
          After your first three moves, instead of adding further pieces you must instead move one of your existing pieces to an adjacent empty square. Therefore, after your third move you always occupy three squares. The move can be up, down, left, right, or diagonal
        </li>
        <li>
          If it is your turn to move and you have three pieces on the board and one of your pieces is in the center square, your move must either win or vacate the center square.
        </li>
        <li>
          To select a piece to move, click on it. Then click on the square you wish to move it to. It will be moved there if that is a valid move. To unselect a square, simply click on it again or click a different square to select.
        </li>
      </ol>
    </>
  );
}

function calculateWinner(squares) {
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
}