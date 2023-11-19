'use client';
import { useProfileContext } from '@/context/profile.context';
import { GetProfile } from '@/services/git-hub/find-profile.service';
import Image from 'next/image';
import { useQuery } from 'react-query';
import styled from 'styled-components';

const StyledWrapper = styled.section`
  background-color: #808080;

  width: 400px;
  height: 400px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  overflow: hidden;
  border-radius: 50%;
  border: 2px solid green;
  box-shadow: 1px 10px 40px 1px green;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media (max-width: 768px) {
    width: 200px;
    height: 200px;
  }

  @media (max-width: 480px) {
    width: 200px;
    height: 200px;
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
