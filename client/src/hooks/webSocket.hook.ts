import React from 'react';
import { INewRoomIn, IWebSocketResponse } from './structure/webSocket.structure';
import { useVisitorContext } from '@/context/visitor.context';

const url = `wss://bznny97t0h.execute-api.us-east-2.amazonaws.com/dev`;

type acceptActions = ['setName', 'sendPrivate', 'sendPublic'];

export function useWebSocket() {
  const { receiver, sender, setReceiver, setSender } = useVisitorContext();
  const [socket, setSocket] = React.useState<WebSocket>();
  const [connected, setStatusConnected] = React.useState<boolean>(false);

  React.useEffect(() => {
    const io = new WebSocket(url);

    io.addEventListener('open', event => {
      console.log('ws connected', event);
      setSocket(io);
      setStatusConnected(true);
    });

    setSocket(io);

    // return () => {
    //   io.close();
    // };
  }, []);

  const newRoom = React.useCallback(() => {
    const sortedNames = [receiver.email, sender.email].sort();
    const roomName = sortedNames.join('');
    socket?.send(`{ "action": "setName", "name": "${roomName}" }`);
  }, [socket, receiver, sender]);

  const newMessage = React.useCallback(
    ({ message }: { message: string }) => {
      if (sender && receiver) {
        const sortedNames = [receiver.email, sender.email].sort();
        const roomName = sortedNames.join('');
        socket?.send(`{ "action": "sendPrivate", "name":"${roomName}", "message": "${message}" }`);
      }
    },
    [socket, receiver, sender],
  );

  const consumer = (eventName: string, callback: (message: string) => void) => {
    socket?.addEventListener<'message'>('message', (event: MessageEvent) => {
      console.log(event);
      callback(event.data);
    });
  };

  return { socket, newRoom, consumer, newMessage, connected };
}
