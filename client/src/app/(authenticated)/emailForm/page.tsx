'use client';
import React from 'react';
import { useVisitorContext } from '@/context/visitor.context';
import Link from 'next/link';
import { EmailInputContainer, ModalBox } from './styled';

export default function EmailForm() {
  const { setReceiver, setSender } = useVisitorContext();

  const [senderEmail, setSenderEmail] = React.useState<string>();
  const [receiverEmail, setReceiverEmail] = React.useState<string>();

  const handlerEmail = () => {
    if (senderEmail && receiverEmail) {
      setReceiver({ email: receiverEmail });
      setSender({ email: senderEmail });
    }
  };

  return (
    <ModalBox>
      <EmailInputContainer>
        <h1>Sender</h1>
        <input type="email" onChange={e => setSenderEmail(e.target.value)} />
        <h1>Receiver</h1>
        <input type="email" onChange={e => setReceiverEmail(e.target.value)} />
        <Link
          onClick={handlerEmail}
          href={{
            pathname: '/chat',
            query: {
              email: senderEmail,
            },
          }}>
          Entrar
        </Link>
      </EmailInputContainer>
    </ModalBox>
  );
}
