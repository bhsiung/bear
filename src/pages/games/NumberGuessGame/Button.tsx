import styled from "@emotion/styled";

const Button = styled.button`
  padding: 12px 24px;
  font-size: 18px;
  cursor: pointer;
  background-color: #007bff;
  color: white;
  border: 2px solid #007bff;
  border-radius: 0 20px 20px 0;
  transition: background-color 0.2s;

  &:hover {
    background-color: #0056b3;
  }
`;

export default Button;
