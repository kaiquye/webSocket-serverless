import * as styled from './styled';
import Message from '../message';
import React from 'react';

export default function ChatCmp(props: InputProps) {
  return (
    <styled.StyledWrapper>
      {props.messages.map(message => (
        // eslint-disable-next-line react/jsx-key
        <Message message={message} primary={false} />
      ))}
    </styled.StyledWrapper>
  );
}

interface InputProps {
  messages: Array<string>;
}
