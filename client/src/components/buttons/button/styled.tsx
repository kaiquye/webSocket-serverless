'use client';
import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  background: #007bff;
  background-color: ${props => props?.color || 'rgba(52, 152, 219, 0)'};
  color: #ffffff;
  padding: 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;

  &:hover {
    color: black;
    background: #bddfb9;
  }

  @media (max-width: 768px) {
    padding: 16px;
  }

  @media (max-width: 480px) {
    padding: 6px 12px;
  }
`;

type IProps = {
  label: string;
  onClick: () => void;
  color?: 'RED' | 'BLUE' | 'GREEN';
  children?: React.ReactNode;
};

const Button = (props: IProps) => {
  const colors = {
    RED: 'red',
    GREEN: 'green',
    BLUE: 'blue',
    auto: undefined,
  };

  return (
    <StyledButton color={colors[props?.color ?? 'auto']} onClick={props.onClick}>
      {props.label}
      {props?.children}
    </StyledButton>
  );
};

export default Button;
