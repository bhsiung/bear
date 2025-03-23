import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  GameContainer,
  GameHeader,
  Title,
  Status,
  GameBoard,
  Cell,
  Controls,
  Button,
  BackButton,
  TopBar,
} from "./TikTokToe.styles";

type Player = "X" | "O";
type GameMode = "ai" | "human";
type BoardState = (Player | null)[];

const calculateWinner = (squares: BoardState): [Player | null, number[]] => {
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

  for (const [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return [squares[a], [a, b, c]];
    }
  }
  return [null, []];
};

const TikTokToe: React.FC = () => {
  const navigate = useNavigate();
  const [board, setBoard] = useState<BoardState>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [gameMode, setGameMode] = useState<GameMode>("human");
  const [winner, winningLine] = calculateWinner(board);
  const isDraw = !winner && board.every((square) => square !== null);

  const handleClick = (index: number) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = isXNext ? "X" : "O";
    setBoard(newBoard);
    setIsXNext(!isXNext);

    if (gameMode === "ai" && !winner && !isDraw) {
      // AI move will be implemented later
      setTimeout(() => {
        const aiMove = findBestMove(newBoard);
        const aiBoard = [...newBoard];
        aiBoard[aiMove] = "O";
        setBoard(aiBoard);
        setIsXNext(true);
      }, 500);
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setGameMode("human");
  };

  const toggleGameMode = () => {
    setGameMode((prev) => (prev === "human" ? "ai" : "human"));
    setBoard(Array(9).fill(null));
    setIsXNext(true);
  };

  const findBestMove = (currentBoard: BoardState): number => {
    // Minimax algorithm implementation for unbeatable AI
    const minimax = (
      board: BoardState,
      depth: number,
      isMaximizing: boolean
    ): number => {
      const [winner] = calculateWinner(board);
      const isDraw = board.every((square) => square !== null);

      // Terminal states
      if (winner === "O") return 10 - depth;
      if (winner === "X") return depth - 10;
      if (isDraw) return 0;

      if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < board.length; i++) {
          if (!board[i]) {
            board[i] = "O";
            const score = minimax(board, depth + 1, false);
            board[i] = null;
            bestScore = Math.max(score, bestScore);
          }
        }
        return bestScore;
      } else {
        let bestScore = Infinity;
        for (let i = 0; i < board.length; i++) {
          if (!board[i]) {
            board[i] = "X";
            const score = minimax(board, depth + 1, true);
            board[i] = null;
            bestScore = Math.min(score, bestScore);
          }
        }
        return bestScore;
      }
    };

    // Find the best move using minimax
    let bestScore = -Infinity;
    let bestMove = 0;

    for (let i = 0; i < currentBoard.length; i++) {
      if (!currentBoard[i]) {
        currentBoard[i] = "O";
        const score = minimax(currentBoard, 0, false);
        currentBoard[i] = null;
        if (score > bestScore) {
          bestScore = score;
          bestMove = i;
        }
      }
    }

    return bestMove;
  };

  const getStatus = () => {
    if (winner) {
      return `Winner: ${winner}`;
    }
    if (isDraw) {
      return "Game Draw!";
    }
    return `Next player: ${isXNext ? "X" : "O"}`;
  };

  return (
    <GameContainer>
      <TopBar>
        <BackButton onClick={() => navigate("/")}>← Back to Games</BackButton>
      </TopBar>

      <GameHeader>
        <Title>TikTokToe</Title>
        <Status>{getStatus()}</Status>
      </GameHeader>

      <GameBoard role="grid" aria-label="Tic-tac-toe board">
        {board.map((square, index) => (
          <Cell
            key={index}
            onClick={() => handleClick(index)}
            disabled={!!square || !!winner}
            isWinning={winningLine.includes(index)}
            aria-label={`Cell ${index + 1} ${square || "empty"}`}
          >
            {square}
          </Cell>
        ))}
      </GameBoard>

      <Controls>
        <Button onClick={resetGame}>Reset Game</Button>
        <Button onClick={toggleGameMode}>
          Play vs {gameMode === "human" ? "AI" : "Human"}
        </Button>
      </Controls>
    </GameContainer>
  );
};

export default TikTokToe;
