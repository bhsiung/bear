import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";

// Define types for the game components
// interface Gem {
//   type: string;
//   count: number;
// }

interface Card {
  id: string;
  cost: Record<string, number>;
  points: number;
  gemType: string;
}

interface Player {
  gems: Record<string, number>;
  cards: Card[];
  reservedCards: Card[];
  points: number;
}

const GameContainer = styled.div`
  max-width: 800px;
  margin: 2rem auto;
  padding: 1rem;
`;

const TopBar = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-bottom: 1rem;
`;

const BackButton = styled.button`
  background: #666;
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  border: none;
  border-radius: 8px;
  color: white;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: #444;
  }

  &:focus-visible {
    outline: 2px solid #007aff;
    outline-offset: 2px;
  }
`;

const GameHeader = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #1a1a1a;
`;

const GemToken = styled.div<{ color: string }>`
  width: 40px;
  height: 40px;
  background-color: ${(props) => props.color};
  border-radius: 50%;
  display: inline-block;
  margin: 0.5rem;
`;

const Card = styled.div`
  width: 100px;
  height: 150px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin: 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0.5rem;
`;

const PlayerArea = styled.div`
  margin-top: 2rem;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
`;

const Splendor: React.FC = () => {
  const navigate = useNavigate();

  // Initialize game state
  const [players, setPlayers] = useState<Player[]>([
    {
      gems: { ruby: 0, sapphire: 0, emerald: 0, diamond: 0, onyx: 0 },
      cards: [],
      reservedCards: [],
      points: 0,
    },
    {
      gems: { ruby: 0, sapphire: 0, emerald: 0, diamond: 0, onyx: 0 },
      cards: [],
      reservedCards: [],
      points: 0,
    },
  ]);
  const [currentPlayer, setCurrentPlayer] = useState(0);

  // Basic player action: collect a gem
  const handlePlayerAction = (gemType: string) => {
    setPlayers((prevPlayers) => {
      const newPlayers = [...prevPlayers];
      newPlayers[currentPlayer].gems[gemType] += 1;
      return newPlayers;
    });
    setCurrentPlayer((prev) => (prev + 1) % players.length);
  };

  // Basic AI action: collect a random gem
  const handleAIAction = () => {
    const gemTypes = Object.keys(players[0].gems);
    const randomGem = gemTypes[Math.floor(Math.random() * gemTypes.length)];
    setPlayers((prevPlayers) => {
      const newPlayers = [...prevPlayers];
      newPlayers[1].gems[randomGem] += 1;
      return newPlayers;
    });
    setCurrentPlayer((prev) => (prev + 1) % players.length);
  };

  return (
    <GameContainer>
      <TopBar>
        <BackButton onClick={() => navigate("/")}>← Back to Games</BackButton>
      </TopBar>

      <GameHeader>
        <Title>Splendor</Title>
        <p>Player {currentPlayer + 1}'s turn</p>
        <button onClick={() => handlePlayerAction("ruby")}>Collect Ruby</button>
        <button onClick={handleAIAction}>AI Move</button>
      </GameHeader>

      {/* Display gem tokens */}
      <div>
        <GemToken color="red" />
        <GemToken color="blue" />
        <GemToken color="green" />
        <GemToken color="white" />
        <GemToken color="black" />
      </div>

      {/* Display development cards */}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Card>
          <div>Cost: 2R, 1B</div>
          <div>Points: 1</div>
        </Card>
        <Card>
          <div>Cost: 1G, 2W</div>
          <div>Points: 2</div>
        </Card>
      </div>

      {/* Display player areas */}
      {players.map((player, index) => (
        <PlayerArea key={index}>
          <h3>Player {index + 1}</h3>
          <p>Gems: {JSON.stringify(player.gems)}</p>
          <p>Points: {player.points}</p>
        </PlayerArea>
      ))}
    </GameContainer>
  );
};

export default Splendor;
