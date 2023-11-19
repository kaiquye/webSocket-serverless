'use client';
import styled from 'styled-components';

const StyledWrapper = styled.section`
  max-width: 100vw;
  max-height: 100%;
  width: 100vw;
  height: 100%;

  overflow-x: hidden;
  background-color: #ffffff;

  display: flex;
  flex-direction: column;

  @media (max-width: 980px) {
  }
  @media (max-width: 680px) {
    gap: 5%;
    padding-top: 20px;
  }
`;

export { StyledWrapper };
