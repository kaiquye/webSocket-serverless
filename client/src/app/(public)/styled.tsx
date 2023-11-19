'use client';
import styled from 'styled-components';

export const StyledWrapper = styled.section`
  width: 100%;
  height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: green;

  @media (max-width: 768px) {
    width: 100%;
    height: 100vh;

    gap: 25px;

    background-color: #222;

    display: flex;
    flex-direction: column;
  }

  @media (max-width: 480px) {
    width: 100%;
    height: 100vh;

    display: flex;
    flex-direction: column;
  }
`;

export const Menu = styled.div`
  display: flex;
  gap: 10px;
`;
