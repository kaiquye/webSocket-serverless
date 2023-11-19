'use client';
import styled from 'styled-components';

const ModalBox = styled.section`
  width: 100%;
  height: 88vh;
  background-color: #222;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const EmailInputContainer = styled.div`
  width: 500px;
  height: 220px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 15px;

  @media (max-width: 980px) {
  }
  @media (max-width: 680px) {
    width: 250px;
    height: 100px;
  }

  h1 {
    font-size: 5vw;
    font-family: Arial, Helvetica, sans-serif;
    color: white;
  }

  input {
    padding: 10px;
    border: none;
  }

  a {
    color: white;
    background-color: green;
    padding: 5px 10px 5px 10px;
    text-decoration: none;
    font-family: Arial, Helvetica, sans-serif;
  }
`;

const EmailInputBox = styled.input`
  padding: 10px;
`;

export { ModalBox, EmailInputContainer, EmailInputBox };
