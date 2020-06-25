import styled, {css} from 'styled-components/native';
import {FlatList} from 'react-native';
import {IProvider} from './types';
import {RectButton} from 'react-native-gesture-handler';

interface ProviderContainerProps {
    selected: boolean;
}

interface ProviderNameProps {
    selected: boolean;
}

export const Container = styled.View`
    flex: 1;
`;

export const Header = styled.View`
    padding: 24px;
    background: #28262e;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

export const BackButton = styled.TouchableOpacity``;

export const HeaderTitle = styled.Text`
    color: #f4ede8;
    font-size: 20px;
    font-family: 'RobotoSlab-Medium';
    margin-left: 16px;
`;

export const UserAvatar = styled.Image`
    width: 56px;
    height: 56px;
    border-radius: 28px;
    margin-left: auto;
`;

export const ProviderListContainer = styled.View`
    width: 100%;
    height: 112px;
`;

export const ProvidersList = styled(
    FlatList as new () => FlatList<IProvider>,
)``;

export const ProviderContainer = styled(RectButton)<ProviderContainerProps>`
    background: ${(props) => (props.selected ? '#ff9700' : '#3e3b47')};
    flex-direction: row;
    align-items: center;
    padding: 8px 12px;
    border-radius: 10px;
    margin-right: 16px;
`;

export const ProviderAvatar = styled.Image`
    width: 32px;
    height: 32px;
    border-radius: 16px;
`;

export const ProviderName = styled.Text<ProviderNameProps>`
    color: ${(props) => (props.selected ? '#232129' : '#f4ede8')};
    font-size: 16px;
    font-family: 'RobotoSlab-Medium';
    margin-left: 8px;
`;
