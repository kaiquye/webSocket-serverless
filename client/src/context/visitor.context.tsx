'use client';
import React from 'react';

interface VisitorContextProvider {
  children: React.ReactNode;
}

interface IVisitor {
  email: string;
}

interface IVisitorContext {
  receiver: IVisitor;
  sender: IVisitor;
  setReceiver: (v: IVisitor) => void;
  setSender: (v: IVisitor) => void;
}

const VisitorContext = React.createContext<IVisitorContext | null>(null);

export function VisitorContextProvider({ children }: VisitorContextProvider) {
  const [receiver, setReceiver] = React.useState<IVisitor>({} as IVisitor);
  const [sender, setSender] = React.useState<IVisitor>({} as IVisitor);

  return (
    <VisitorContext.Provider value={{ receiver, sender, setReceiver, setSender }}>
      {children}
    </VisitorContext.Provider>
  );
}

export const useVisitorContext = () => React.useContext(VisitorContext) as IVisitorContext;
