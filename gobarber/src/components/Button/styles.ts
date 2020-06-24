import styled from 'styled-components/native';
import {RectButton} from 'react-native-gesture-handler';

export const Container = styled(RectButton)`
    width: 100%;
    height: 60px;
    background: #ff9000;
    border-radius: 10px;
    justify-content: center;
    align-items: center;
    margin-top: 8px;
`;

export const ButtonText = styled.Text`
    color: #312e38;
    font-family: 'RobotoSlab-Medium';
    font-size: 16px;
`;
