'use client';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

type IProps = {
  children: React.ReactNode;
};

export function ReactQueryProvider({ children }: IProps) {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
