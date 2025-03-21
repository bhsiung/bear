import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";

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

const Splendor: React.FC = () => {
  const navigate = useNavigate();

  return (
    <GameContainer>
      <TopBar>
        <BackButton onClick={() => navigate("/")}>← Back to Games</BackButton>
      </TopBar>

      <GameHeader>
        <Title>Splendor</Title>
        {/* Add game status or instructions here */}
      </GameHeader>

      {/* Game board and components will go here */}
    </GameContainer>
  );
};

export default Splendor;
