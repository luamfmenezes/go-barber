import styled, { css } from 'styled-components';
import ToolTip from '../../components/ToolTip';

interface ICotainerProps {
    isFocused: boolean;
    isFilled: boolean;
    hadError: boolean;
}

export const Container = styled.div<ICotainerProps>`
    display: flex;
    align-items: center;
    background: #232129;
    border-radius: 10px;
    border: 2px solid #232129;
    padding: 16px;
    width: 100%;
    transition: border-color 0.2s, color 0.2s;
    color: #666360;
    & + div {
        margin-top: 8px;
    }

    ${(props) =>
        props.hadError &&
        css`
            color: #c53030;
            border-color: #c53030;
        `}

    ${(props) =>
        props.isFocused &&
        css`
            color: #ff9000;
            border-color: #ff9000;
        `}

    ${(props) =>
        props.isFilled &&
        css`
            color: #ff9000;
        `}

    input {
        flex: 1;
        background: transparent;
        border: 0;
        color: #f4ede8;

        &::placeholder {
            color: #666360;
        }
    }
    svg {
        margin-right: 16px;
    }
`;

export const ToolTipStyled = styled(ToolTip)`
    height: 20px;
    margin-left: 16px;
    svg {
        margin: 0;
    }
    span {
        background: #c53030;
        color: #fff;
        &::before {
            border-color: #c53030 transparent;
        }
    }
`;
