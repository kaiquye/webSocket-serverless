'use client';
import styled from 'styled-components';

const StyledInputBox = styled.div`
  width: 100%;
  height: 100%;

  display: grid;
  grid-template-columns: 80% 20%;
`;

const StyledInput = styled.input`
  height: 40px;
  padding: 10px;
  font-size: 5vw;
`;

export { StyledInputBox, StyledInput };
