import styled from 'styled-components/native';
import {RectButton} from 'react-native-gesture-handler';

export const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    padding: 0 48px;
`;

export const Title = styled.Text`
    font-size: 32px;
    color: #f4ede8;
    font-family: 'RobotoSlab-Medium';
    margin-top: 48px;
    text-align: center;
`;

export const Description = styled.Text`
    font-size: 18px;
    color: #999598;
    font-family: 'RobotoSlab-Regular';
    text-align: center;
    margin-top: 16px;
`;

export const OkButton = styled(RectButton)`
    background: #ff9000;
    padding: 12px 24px;
    border-radius: 10px;
    justify-content: center;
    align-items: center;
    margin-top: 24px;
`;

export const OkButtonText = styled.Text`
    font-size: 18px;
    color: #312e38;
    font-family: 'RobotoSlab-Medium';
`;
