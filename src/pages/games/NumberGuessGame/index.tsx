import React, { useState } from "react";
import GameContainer from "./GameContainer";
import Title from "./Title";
import Form from "./Form";
import Input from "./Input";
import Button from "./Button";
import Clues from "./Clues";

const NumberGuessing: React.FC = () => {
  const [secretNumber, setSecretNumber] = useState(generateSecretNumber());
  const [attempts, setAttempts] = useState(0);
  const [clues, setClues] = useState<string[]>([]);
  const [guess, setGuess] = useState("");

  function generateSecretNumber() {
    const digits: number[] = [];
    while (digits.length < 4) {
      const digit = Math.floor(Math.random() * 10);
      if (!digits.includes(digit)) {
        digits.push(digit);
      }
    }
    return digits.join("");
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (guess.length !== 4 || new Set(guess).size !== 4) {
      alert("Please enter a 4-digit number with unique digits.");
      return;
    }

    setAttempts(attempts + 1);
    const clue = getClue(guess);
    setClues([...clues, `Attempt ${attempts + 1}: ${guess} - ${clue}`]);

    if (clue === "4A0B") {
      alert(
        `Congratulations! You've guessed the number in ${
          attempts + 1
        } attempts.`
      );
      resetGame();
    } else {
      setGuess(""); // Reset input value after submission
    }
  };

  const getClue = (guess: string) => {
    let aCount = 0;
    let bCount = 0;
    for (let i = 0; i < 4; i++) {
      if (guess[i] === secretNumber[i]) {
        aCount++;
      } else if (secretNumber.includes(guess[i])) {
        bCount++;
      }
    }
    return `${aCount}A${bCount}B`;
  };

  const resetGame = () => {
    setSecretNumber(generateSecretNumber());
    setAttempts(0);
    setClues([]);
    setGuess("");
  };

  return (
    <GameContainer>
      <Title>Number Guessing Game</Title>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
          maxLength={4}
          placeholder="Enter 4 digits"
        />
        <Button type="submit">Guess</Button>
      </Form>
      <Clues>
        {clues.map((clue, index) => (
          <p key={index}>{clue}</p>
        ))}
      </Clues>
    </GameContainer>
  );
};

export default NumberGuessing;
