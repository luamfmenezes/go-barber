import styled from 'styled-components/native';
import {Platform} from 'react-native';

export const Container = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
    padding: 80px 30px;
`;

export const Title = styled.Text`
    font-size: 24px;
    color: #f4ede8;
    font-family: 'RobotoSlab-Medium';
    margin: 64px 0 24px;
`;

export const BackToSignInButton = styled.TouchableOpacity`
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: #312e38;
    border-top-width: 1px;
    border-color: #232129;
    padding: 16px 0;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;

export const BackToSignInButtonText = styled.Text`
    font-family: 'RobotoSlab-Medium';
    color: #fff;
    font-size: 16px;
    margin-left: 16px;
`;
