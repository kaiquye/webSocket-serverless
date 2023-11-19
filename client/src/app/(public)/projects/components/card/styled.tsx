import styled from 'styled-components';

const StyledCarouselBox = styled.div`
  max-width: 1200px;
  min-width: 700px;
  width: 1200px;
  height: 400px;
  gap: 10px;
  display: flex;
  overflow-y: hidden;

  @media (max-width: 680px) {
    overflow-y: auto;
    overflow-x: hidden;
    max-width: 100vw;
    min-width: 50vw;
    max-height: 70vh;
    min-height: 50vh;
    width: 80vw;
    height: 70vh;
    display: flex;
    flex-direction: column;
  }
`;

const StyledCarouselCard = styled.div`
  min-width: 300px;
  width: 200px;

  img {
    width: 100%;
  }

  @media (max-width: 680px) {
    display: grid;
    grid-template-columns: 30% 70%;

    max-width: 100%;
    min-width: 100%;
    width: 80vw;
    height: 80vh;
    border: 2px solid #e9e9e9;

    img {
      width: 50%;
    }
  }
`;

const StyledCarouselCardDescription = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  a {
    background-color: white;
    text-decoration: none;
    font-size: 3.5vw;
    color: #388b35;
  }
  a:hover {
    color: #222;
  }
  label {
    background-color: white;
  }

  div {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
  }

  @media (max-width: 680px) {
    font-size: 2.5vw;
  }
`;

export default {
  StyledCarouselBox,
  StyledCarouselCard,
  StyledCarouselCardDescription,
};
