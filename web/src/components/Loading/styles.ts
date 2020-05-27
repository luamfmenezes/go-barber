import styled, { keyframes } from 'styled-components';
import { FiLoader } from 'react-icons/fi';

const rotate = keyframes`
    from{
        transform:rotate(0deg);
    }
    to{
        transform:rotate(180deg);
    }
`;

export const LoadingIcon = styled(FiLoader)`
    animation: 0.5s ${rotate} 0s linear;
    animation-iteration-count: infinite;
    /* margin: 0 calc(50% - 20px); */
    flex: 1;
`;
