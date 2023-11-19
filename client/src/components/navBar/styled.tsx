'use client';
import styled from 'styled-components';

const StyledWrapper = styled.div`
  width: 100vw;
  height: 15vh;
  background-color: white;
  display: flex;
  align-items: end;
  justify-content: center;

  border-bottom: 1px solid #222;

  @media (max-width: 680px) {
    background-color: #ffffff;
    height: 12.5vh;
  }
`;

const StyledProfile = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 30% 40% 30%;
  text-align: center;

  label {
    color: #414141;
    font-weight: 100;
  }

  div {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  @media (max-width: 980px) {
    padding: 8px;
    font-size: 4vw;
  }

  @media (max-width: 680px) {
    padding: 8px;
    font-size: 3vw;
  }
`;

const StyledBtn = styled.button`
  border: none;
  cursor: pointer;
  background-color: white;
`;

export { StyledWrapper, StyledProfile, StyledBtn };
