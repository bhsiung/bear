import styled from "@emotion/styled";

export const GameContainer = styled.div`
  max-width: 600px;
  margin: 2rem auto;
  padding: 1rem;
`;

export const GameHeader = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

export const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #1a1a1a;
`;

export const Status = styled.div`
  font-size: 1.25rem;
  margin-bottom: 1rem;
  color: #666;
`;

export const GameBoard = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 5px;
  max-width: 400px;
  margin: 0 auto;
  aspect-ratio: 1;
  padding: 0.5rem;
`;

export const Cell = styled.button<{ isWinning?: boolean }>`
  background: white;
  border: none;
  font-size: 2.5rem;
  font-weight: bold;
  aspect-ratio: 1;
  cursor: pointer;
  transition: all 0.2s ease;
  color: ${(props) => (props.isWinning ? "#4CAF50" : "#1a1a1a")};
  position: relative;

  &:hover:not(:disabled) {
    background: #f5f5f5;
    transform: scale(1.02);
    &::after {
      content: "";
      position: absolute;
      inset: 0;
      border: 2px solid #007aff;
      border-radius: 8px;
      pointer-events: none;
    }
  }

  &:focus-visible {
    outline: none;
    &::after {
      content: "";
      position: absolute;
      inset: 0;
      border: 2px solid #007aff;
      border-radius: 8px;
      pointer-events: none;
    }
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.7;
  }
`;

export const Controls = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 2rem;
  flex-wrap: wrap;
`;

export const Button = styled.button`
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  border: none;
  border-radius: 8px;
  background: #007aff;
  color: white;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: #0056b3;
  }

  &:focus-visible {
    outline: 2px solid #007aff;
    outline-offset: 2px;
  }
`;

export const TopBar = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-bottom: 1rem;
`;

export const BackButton = styled(Button)`
  background: #666;
  padding: 0.5rem 1rem;
  font-size: 0.9rem;

  &:hover {
    background: #444;
  }
`;
