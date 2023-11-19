'use client';
import { Avatar } from '@/components/avatar/styled';
import StyledButton from '@/components/buttons/button/styled';
import { Title } from '@/components/title/styled';
import { Menu, StyledWrapper } from './styled';
import { useRouter } from 'next/navigation';
import { useQuery } from 'react-query';
import { GetProfile } from '@/services/git-hub/find-profile.service';

export default function Home() {
  const router = useRouter();

  const toProjects = () => {
    router.push('/projects');
  };

  const toChat = () => {
    router.push('/emailForm');
  };

  return (
    <StyledWrapper>
      <Avatar />
      <Title text="Ola, meu nome e kaique mendes da silva" width="AUTO" />
      <Title text="Bem vindo" width="AUTO" />
      <Menu>
        <StyledButton color="GREEN" label="MEUS PROJETOS" onClick={toProjects} />
        <StyledButton label="CHAT" onClick={toChat} />
      </Menu>
    </StyledWrapper>
  );
}
