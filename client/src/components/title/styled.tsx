'use client';
import styled from 'styled-components';

type IStylesTitleProps = {
  width: string;
};

const StyledTitle = styled.p<IStylesTitleProps>`
  width: ${props => props.width};
  color: #222;
  font-weight: 600;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  width: 50vw;

  @media (max-width: 668px) {
    width: 50vw;
  }
`;

type IProps = {
  text: string;
  width: 'FULL' | 'HALF' | 'AUTO';
};

export function Title(props: IProps) {
  const widths = {
    FULL: '100%',
    HALF: '60%',
    AUTO: 'auto',
  };
  return <StyledTitle width={widths[props.width]}>{props.text}</StyledTitle>;
}
