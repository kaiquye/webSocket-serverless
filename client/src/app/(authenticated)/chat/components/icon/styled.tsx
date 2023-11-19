'use client';
import { useProfileContext } from '@/context/profile.context';
import { GetProfile } from '@/services/git-hub/find-profile.service';
import Image from 'next/image';
import { useQuery } from 'react-query';
import styled from 'styled-components';

const StyledWrapper = styled.section`
  background-color: #808080;

  width: 100%;
  height: auto;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  overflow: hidden;
  border-radius: 50%;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export function Avatar() {
  const profile = useProfileContext();

  return (
    <StyledWrapper>
      <img alt="" src={profile?.profile?.avatar_id} />
    </StyledWrapper>
  );
}
