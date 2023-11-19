'use client';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';
import { MdArrowBack } from 'react-icons/md';

const StyledBtn = styled.button`
  border: none;
  cursor: pointer;
  background-color: white;
`;

export default function BackButtonStyled() {
  const router = useRouter();

  const redirectToPreviousPage = () => {
    router.back();
  };
  return (
    <StyledBtn onClick={redirectToPreviousPage}>
      <MdArrowBack />
    </StyledBtn>
  );
}
