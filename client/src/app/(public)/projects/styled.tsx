'use client';
import styled from 'styled-components';

const StyledWrapper = styled.section`
  width: 100vw;
  height: 100vh;

  display: grid;
  grid-template-columns: auto;
  grid-template-rows: 20% 80%;

  @media (max-width: 768px) {
    width: 100%;
    height: 100vh;
  }

  @media (max-width: 480px) {
    width: 100%;
    height: 100vh;
  }
`;

const StyledBanner = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: end;

  gap: 5px;
  padding-left: 20px;

  border-radius: 0px 0px 30px 30px;
  box-shadow: 1px 2px 5px 5px #c0c0c0;

  @media (max-width: 668px) {
    background: linear-gradient(to bottom, #00bb1f, #598f59);

    h1 {
      color: white;
      font-weight: 600;
      width: 50vw;
      padding: 20px;
    }
  }
`;

const StyledFilter = styled.ul`
  @media (max-width: 960px) {
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    justify-content: center;
    align-content: center;
    gap: 10px;

    li {
      color: white;
      font-weight: 600;
      margin: 5px 0;
      padding: 5px;
      list-style: none;
    }

    li:hover {
      cursor: pointer;
      box-shadow: #333 1px 1px 1px 1px;
    }
  }

  @media (max-width: 680px) {
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    justify-content: center;
    align-content: center;
    gap: 10px;

    li {
      margin: 5px 0;
      padding: 5px;
      list-style: none;
    }

    li:hover {
      cursor: pointer;
      box-shadow: #333 1px 1px 1px 1px;
    }
  }
`;

const StyledProjectCards = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledButton = styled.div`
  max-width: 50px;
  max-height: 50px;
  border-radius: 10px 0px 0px 10px;
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: center;
  width: 35px;
  height: 35px;
  background-color: white;
  cursor: pointer;
`;

export default {
  StyledWrapper,
  StyledBanner,
  StyledProjectCards,
  StyledFilter,
  StyledButton,
};
