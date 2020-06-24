import styled, {css} from 'styled-components/native';

interface IContainer {
    isFocused: boolean;
    isErrored: boolean;
}

export const Container = styled.View<IContainer>`
    width: 100%;
    height: 60px;
    padding: 0 16px;
    background: #232129;
    border-radius: 10px;
    margin-bottom: 8px;
    border-width: 2px;
    border-color: #232129;

    ${(props) =>
        props.isErrored &&
        css`
            border-color: #c53030;
        `}
    ${(props) =>
        props.isFocused &&
        css`
            border-color: #ff9000;
        `}


    flex-direction: row;
    align-items: center;
`;

export const TextInput = styled.TextInput`
    flex: 1;
    color: #fff;
    font-size: 16px;
    font-family: 'RobotoSlab-Regular';
    margin-left: 16px;
`;
