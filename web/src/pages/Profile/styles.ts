import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';
import background from '../../assets/images/sign-up-background.png';

const start = keyframes`
    from{
        opacity:0;
        transform:translateY(50px);
    }
    to{
        opacity:1;
        transform:translateY(0px);
    }
`;

export const Container = styled.div`
    height: 100vh;
`;

export const Header = styled.header`
    width: 100%;
    height: 144px;
    background: #28262e;
    display: flex;
    align-items: center;
    div {
        width: 100%;
        max-width: 1120px;
        margin: 0 auto;
        a {
            svg {
                transition: color 0.2s;
                color: #999591;
                width: 24px;
                height: 24px;
            }
            &:hover {
                svg {
                    color: #ff9000;
                    width: 24px;
                    height: 24px;
                }
            }
        }
    }
`;

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin: -176px auto 0;
    animation: 0.4s ${start} 0s linear;
    form {
        margin: 80px 0;
        width: 340px;
        text-align: center;
        h1 {
            margin-bottom: 24px;
            font-size: 20px;
            text-align: left;
        }

        hr {
            margin: 16px 0;
            border: 0;
            height: 1px;
            background: #232129;
        }

        a {
            color: #f4ede8;
            display: block;
            margin-top: 24px;
            text-decoration: none;
            transition: color 0.2s;
            &:hover {
                color: ${shade(0.2, '#f4ede8')};
            }
        }
        button {
            margin-top: 16px;
        }
    }
`;

export const AvatarInput = styled.div`
    margin-bottom: 32px;
    position: relative;
    width: 186px;
    align-self: center;
    margin: 0 auto;
    img {
        width: 186px;
        height: 186px;
        border-radius: 50%;
        box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
    }
    label {
        position: absolute;
        width: 48px;
        height: 48px;
        background: #ff9000;
        border-radius: 50%;
        right: 0;
        bottom: 0;
        border: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: -1px 3px 6px rgba(0, 0, 0, 0.1);
        cursor: pointer;
        svg {
            width: 20px;
            height: 20px;
            color: #312e38;
        }
        &:hover {
            background: ${shade(0.2, '#ff9000')};
        }
        input {
            display: none;
        }
    }
`;
