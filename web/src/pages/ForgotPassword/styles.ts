import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';
import background from '../../assets/images/sign-in-background.png';

const fadeFromLeft = keyframes`
    from{
        opacity:0;
        transform:translate(-70px);
    }
    to{
        opacity:1;
        transform:translate(0px);
    }
`;

export const Container = styled.div`
    height: 100vh;
    display: flex;
    align-items: stretch;
`;

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    max-width: 700px;
`;

export const AnimatedContent = styled.div`
    display: flex;
    flex-direction: column;
    place-content: center;
    animation: ${fadeFromLeft} 1s both;
    form {
        margin: 80px 0;
        width: 340px;
        text-align: center;
        h1 {
            margin-bottom: 24px;
        }
    }
    > a {
        color: #f4ede8;
        display: block;
        margin-top: 24px;
        text-decoration: none;
        transition: color 0.2s;
        display: flex;
        align-items: center;
        justify-content: center;
        svg {
            margin-right: 8px;
        }
        &:hover {
            color: ${shade(0.2, '#f4ede8')};
            svg {
                transition: opacity 0.2s;
                opacity: 0.8;
            }
        }
    }
`;

export const Background = styled.div`
    flex: 1;
    background: url(${background}) no-repeat center;
    background-size: cover;
`;
