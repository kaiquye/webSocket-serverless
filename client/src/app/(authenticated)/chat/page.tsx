'use client';
import * as styles from './styled';
import ChatCmp from './components/chat';
import React, { Suspense } from 'react';
import SkeletonLoad from './loading';
import { StyledInput, StyledInputBox } from './components/input/styled';
import { StyledSendMessageButton } from './components/button/styled';
import { AiOutlineSend } from 'react-icons/ai';
import { useWebSocket } from '@/hooks/webSocket.hook';
import { useVisitorContext } from '@/context/visitor.context';
import { useSearchParams } from 'next/navigation';
const to = 'kaique1';

export default function Chat() {
  const { socket, newRoom, consumer, newMessage, connected } = useWebSocket();

  const [email, setEmail] = React.useState<string>();
  const [message, setMessage] = React.useState<string>();
  const [messages, setMessages] = React.useState<IChatPageStructure.IMessages>(['tested']);

  const ChatComponent = React.useMemo(() => <ChatCmp messages={messages} />, [messages]);

  const searchParams = useSearchParams();
  const emailQuery = searchParams.get('email');

  React.useEffect(() => {
    if (emailQuery && socket && connected) {
      setEmail(emailQuery);
      newRoom();
    }
  }, [connected]);

  if (!email) {
    return null;
  }

  consumer(email, event => {
    console.log(event);
  });

  const handleSendMessage = () => {
    if (message) {
      newMessage({ message });
    }
  };

  return (
    <>
      <Suspense fallback={<SkeletonLoad />}>
        <styles.StyledWrapper>
          {ChatComponent}
          <StyledInputBox>
            <StyledInput onChange={e => setMessage(e.target.value)} />
            <StyledSendMessageButton>
              <AiOutlineSend />
            </StyledSendMessageButton>
          </StyledInputBox>
          <button onClick={() => handleSendMessage()}>Send message</button>
        </styles.StyledWrapper>
      </Suspense>
    </>
  );
}
