import styled from 'styled-components/native';
import {Platform} from 'react-native';
import {RectButton} from 'react-native-gesture-handler';

export const Container = styled.View`
    flex: 1;
    justify-content: center;
    padding: 24px 30px;
    position: relative;
`;

export const Title = styled.Text`
    font-size: 20px;
    color: #f4ede8;
    font-family: 'RobotoSlab-Medium';
    margin: 24px 0 24px;
`;

export const Line = styled.View`
    height: 1px;
    background: #28262e;
    width: 100%;
    margin: 8px 0 16px;
`;

export const UserAvatarButton = styled.TouchableOpacity`
    width: 128px;
    border-radius: 64px;
    margin: 0 auto;
    margin-top: 32px;
`;

export const UserAvatarImage = styled.Image`
    width: 128px;
    height: 128px;
    border-radius: 64px;
    align-self: center;
`;

export const BackButton = styled.TouchableOpacity`
    position: absolute;
    left: 24px;
    top: 24px;
`;
