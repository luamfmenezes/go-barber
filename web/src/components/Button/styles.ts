import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';
import { FiLoader } from 'react-icons/fi';

const rotate = keyframes`
    from{
        transform:rotate(0deg);
    }
    to{
        transform:rotate(180deg);
    }
`;

export const Container = styled.button`
    background: #ff9000;
    height: 56px;
    border-radius: 10px;
    border: 0;
    width: 100%;
    padding: 0 16px;
    color: #232129;
    margin-top: 8px;
    font-weight: bold;
    transition: background-color 0.2s;
    &:hover {
        background: ${shade(0.2, '#ff9000')};
    }
`;

export const LoadingIcon = styled(FiLoader)`
    animation: 0.5s ${rotate} 0s linear;
    animation-iteration-count: infinite;
`;
