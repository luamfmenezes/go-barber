import styled from 'styled-components';

export const Container = styled.div`
    position: relative;
    span {
        position: absolute;
        width: 160px;
        font-size: 14px;
        background: #ff9000;
        padding: 8px;
        border-radius: 8px;
        font-weight: 500;
        left: 50%;
        opacity: 0;
        visibility: hidden;
        transform: translateX(-50%);
        bottom: calc(100% + 12px);
        transition: opacity 0.4s;
        color: #312e38;

        &::before {
            content: '';
            border-style: solid;
            border-color: #ff9000 transparent;
            border-width: 6px 6px 0px 6px;
            top: 100%;
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
        }
    }

    &:hover {
        span {
            visibility: visible;
            opacity: 1;
        }
    }
`;
