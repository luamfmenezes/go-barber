import React, {useCallback, useEffect, useState, useMemo} from 'react';

import {useAuth} from '../../hooks/Auth';
import {useRoute, useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';

import {
    Container,
    Header,
    BackButton,
    HeaderTitle,
    UserAvatar,
    ProviderListContainer,
    ProvidersList,
    ProviderContainer,
    ProviderAvatar,
    ProviderName,
} from './styles';
import api from '../../services/api';
import {IProvider} from './types';

interface RouteParams {
    providerId: string;
}

const CreateAppointment: React.FC = () => {
    const {user} = useAuth();
    const routeParams = useRoute().params as RouteParams;
    const navigation = useNavigation();
    const [providers, setProviders] = useState<IProvider[]>([]);
    const [selectedProvider, setSelectedProvider] = useState(
        routeParams.providerId,
    );

    useEffect(() => {
        const getProviders = async () => {
            const response = await api.get('/providers');
            setProviders(response.data);
        };
        getProviders();
    }, []);

    const navigateBack = useCallback(() => {
        navigation.goBack();
    }, [navigation]);

    const handleSelectProvider = useCallback((providerId: string) => {
        setSelectedProvider(providerId);
    }, []);

    const providersNormalized = useMemo<IProvider[]>(
        () => [
            ...providers.filter(
                (provider) => provider.id === routeParams.providerId,
            ),
            ...providers.filter(
                (provider) => provider.id !== routeParams.providerId,
            ),
        ],
        [providers],
    );

    return (
        <Container>
            <Header>
                <BackButton onPress={navigateBack}>
                    <Icon name="chevron-left" size={24} color="#999591" />
                </BackButton>
                <HeaderTitle>Barbers</HeaderTitle>
                <UserAvatar
                    source={{
                        uri:
                            user.avatar_url ||
                            `https://api.adorable.io/avatars/285/${user.email}`,
                    }}
                />
            </Header>
            <ProviderListContainer>
                <ProvidersList
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    data={providersNormalized}
                    keyExtractor={(provider) => provider.id}
                    contentContainerStyle={{
                        paddingHorizontal: 24,
                        paddingVertical: 32,
                    }}
                    renderItem={({item: provider}) => (
                        <ProviderContainer
                            selected={provider.id === selectedProvider}
                            onPress={() => handleSelectProvider(provider.id)}>
                            <ProviderAvatar
                                source={{
                                    uri:
                                        provider.avatar_url ||
                                        `https://api.adorable.io/avatars/285/${provider.email}`,
                                }}
                            />
                            <ProviderName
                                selected={provider.id === selectedProvider}>
                                {provider.name}
                            </ProviderName>
                        </ProviderContainer>
                    )}
                />
            </ProviderListContainer>
        </Container>
    );
};

export default CreateAppointment;
