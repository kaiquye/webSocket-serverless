'use client';
import styled from 'styled-components';

interface IMessageBox {
  reverse: boolean;
}

const MessageBox = styled.div<IMessageBox>`
  min-width: 100%;

  display: flex;
  flex-direction: ${props => (props.reverse ? ' row-reverse' : 'row')};
  gap: 10px;

  @media (max-width: 980px) {
  }
  @media (max-width: 680px) {
    height: auto;
  }
`;

const MessageIcon = styled.div`
  max-width: 60px;
  max-height: 60px;
  overflow: hidden;
  padding: 2px;
`;

interface IMessageBox {
  reverse: boolean;
}

const Message = styled.div<IMessageBox>`
  color: white;
  max-width: 180px;
  min-width: 50px;
  min-height: 10px;
  background-color: #2079ff;
  word-wrap: break-word;
  font-size: 2.9vw;
  border-radius: 14px;
  padding-top: 10px;
  padding: 6px;
`;

export { MessageBox, MessageIcon, Message };
