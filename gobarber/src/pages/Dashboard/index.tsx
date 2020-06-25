import React, {useState, useEffect, useCallback} from 'react';
import {View} from 'react-native';

import {
    Container,
    Header,
    HeaderTitle,
    UserName,
    ProfileImage,
    ProfileButton,
    ProvidersList,
    ProviderListTitle,
    ProviderContainer,
    ProviderAvatar,
    ProviderInfo,
    ProviderName,
    ProviderMeta,
    ProviderMetaText,
} from './styles';

import api from '../../services/api';
import {useAuth} from '../../hooks/Auth';
import {useNavigation} from '@react-navigation/native';
import {IProvider} from './types';
import Icon from 'react-native-vector-icons/Feather';

const Dashboard: React.FC = () => {
    const [providers, setProviders] = useState<IProvider[]>([]);
    const {user, signOut} = useAuth();
    const {navigate} = useNavigation();

    useEffect(() => {
        const getProviders = async () => {
            const response = await api.get('/providers');
            setProviders(response.data);
        };
        getProviders();
    }, []);

    const navigateToCreateAppointment = useCallback(
        (providerId: string) => {
            navigate('CreateAppointment', {providerId});
        },
        [navigate],
    );

    return (
        <Container>
            <Header>
                <HeaderTitle>
                    Bem vindo, {'\n'}
                    <UserName>{user.name}</UserName>
                </HeaderTitle>
                <ProfileButton onPress={() => signOut()}>
                    <ProfileImage
                        source={{
                            uri:
                                user.avatar_url ||
                                `https://api.adorable.io/avatars/285/${user.email}`,
                        }}
                    />
                </ProfileButton>
            </Header>
            <ProvidersList
                data={providers}
                keyExtractor={(provider) => provider.id}
                ListHeaderComponent={
                    <ProviderListTitle>Barbers</ProviderListTitle>
                }
                renderItem={({item: provider}) => (
                    <ProviderContainer
                        onPress={() =>
                            navigateToCreateAppointment(provider.id)
                        }>
                        <ProviderAvatar
                            source={{
                                uri:
                                    provider.avatar_url ||
                                    `https://api.adorable.io/avatars/285/${provider.email}`,
                            }}
                        />
                        <ProviderInfo>
                            <ProviderName>{provider.name}</ProviderName>
                            <ProviderMeta>
                                <Icon
                                    name="calendar"
                                    size={14}
                                    color="#ff9700"
                                />
                                <ProviderMetaText>
                                    Monday to Friday
                                </ProviderMetaText>
                            </ProviderMeta>
                            <ProviderMeta>
                                <Icon name="clock" size={14} color="#ff9700" />
                                <ProviderMetaText>
                                    8am until 16pm
                                </ProviderMetaText>
                            </ProviderMeta>
                        </ProviderInfo>
                    </ProviderContainer>
                )}
            />
        </Container>
    );
};

export default Dashboard;
