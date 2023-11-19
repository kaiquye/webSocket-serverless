'use client';
import React from 'react';
import { Carousel } from './components/card';
import styles from './styled';
import { useQuery } from 'react-query';
import { GetProjects } from '@/services/git-hub/find-projects.service';
import { BsBackspace } from 'react-icons/bs';
import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();
  const { data } = useQuery('getProjects', GetProjects, {
    staleTime: 60000,
  });

  const redirectToPreviousPage = () => {
    router.back();
  };

  return (
    <styles.StyledWrapper>
      <styles.StyledBanner>
        <styles.StyledButton onClick={redirectToPreviousPage}>
          <BsBackspace />
        </styles.StyledButton>
        <h1>Meus projetos</h1>
        <styles.StyledFilter>
          <li onClick={() => alert('tested')}>Star</li>
          <li>Desc</li>
          <li>Asc</li>
        </styles.StyledFilter>
      </styles.StyledBanner>
      <styles.StyledProjectCards>
        <Carousel projects={data} />
      </styles.StyledProjectCards>
    </styles.StyledWrapper>
  );
}
