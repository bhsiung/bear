import React from "react";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";

interface GameCard {
  id: string;
  title: string;
  description: string;
  path: string;
  imageUrl: string;
}

const games: GameCard[] = [
  {
    id: "tiktoktoe",
    title: "TikTokToe",
    description: "Play Tic-tac-toe against ChatGPT or another player",
    path: "/games/tiktoktoe",
    imageUrl: "/images/tiktoktoe.png",
  },
  {
    id: "splendor",
    title: "Splendor",
    description:
      "Experience the Renaissance as a wealthy merchant acquiring gems and prestige.",
    path: "/games/splendor",
    imageUrl: "/images/splendor.png",
  },
  // Add more games here as they are developed
];

const GameGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  padding: 1rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const GameCard = styled(Link)`
  display: flex;
  flex-direction: column;
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease-in-out;
  text-decoration: none;
  color: inherit;

  &:hover {
    transform: translateY(-4px);
  }

  &:focus-visible {
    outline: 2px solid #007aff;
    outline-offset: 2px;
  }
`;

const GameImage = styled.img`
  width: 100%;
  height: 160px;
  object-fit: cover;
`;

const GameContent = styled.div`
  padding: 1rem;
`;

const GameTitle = styled.h2`
  margin: 0 0 0.5rem;
  font-size: 1.25rem;
  color: #1a1a1a;
`;

const GameDescription = styled.p`
  margin: 0;
  font-size: 0.875rem;
  color: #666;
  line-height: 1.5;
`;

const PageTitle = styled.h1`
  text-align: center;
  margin: 2rem 0;
  font-size: 2rem;
  color: #1a1a1a;
`;

const GameSelection: React.FC = () => {
  return (
    <div>
      <PageTitle>Select a Game</PageTitle>
      <GameGrid>
        {games.map((game) => (
          <GameCard
            key={game.id}
            to={game.path}
            aria-label={`Play ${game.title}`}
          >
            <GameImage
              src={game.imageUrl}
              alt={`${game.title} game preview`}
              loading="lazy"
            />
            <GameContent>
              <GameTitle>{game.title}</GameTitle>
              <GameDescription>{game.description}</GameDescription>
            </GameContent>
          </GameCard>
        ))}
      </GameGrid>
    </div>
  );
};

export default GameSelection;
