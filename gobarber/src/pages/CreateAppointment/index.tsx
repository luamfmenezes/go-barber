import React, {useCallback, useEffect, useState, useMemo} from 'react';

import {useAuth} from '../../hooks/Auth';
import {useRoute, useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import DateTimePicker from '@react-native-community/datetimepicker';

import {
    Container,
    Header,
    BackButton,
    HeaderTitle,
    UserAvatar,
    Content,
    ProviderListContainer,
    ProvidersList,
    ProviderContainer,
    ProviderAvatar,
    ProviderName,
    Calendar,
    CalendarTitle,
    OpenDatePickerButton,
    OpenDatePickerButtonText,
    Schedule,
    ScheduleTitle,
    Section,
    SectionTitle,
    SectionContent,
    Hour,
    HourText,
    CreateAppointmentButton,
    CreateAppointmentButtonText,
} from './styles';
import api from '../../services/api';
import {IProvider} from './types';
import {Platform, Alert, ActivityIndicator} from 'react-native';
import {format} from 'date-fns';

interface RouteParams {
    providerId: string;
}

interface IAvailability {
    hour: number;
    available: boolean;
}

const CreateAppointment: React.FC = () => {
    const {user} = useAuth();
    const routeParams = useRoute().params as RouteParams;
    const navigation = useNavigation();
    const [loading, setLoading] = useState(true);
    const [availability, setAvailability] = useState<IAvailability[]>([]);
    const [providers, setProviders] = useState<IProvider[]>([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedHour, setSelectedHour] = useState(0);
    const [showDatePicker, setShowDatePicker] = useState(false);
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

    const handleToggleDatePicker = useCallback(() => {
        setShowDatePicker((oldShowDatePicker) => !oldShowDatePicker);
    }, []);

    const handleDateChange = useCallback(
        (event: any, date: Date | undefined) => {
            if (Platform.OS === 'android') {
                setShowDatePicker(false);
            }
            if (date) {
                setSelectedDate(date);
            }
        },
        [],
    );

    useEffect(() => {
        const loadDayAvailability = async () => {
            setLoading(true);
            const response = await api.get(
                `/providers/${selectedProvider}/day-availability`,
                {
                    params: {
                        year: selectedDate.getFullYear(),
                        month: selectedDate.getMonth() + 1,
                        day: selectedDate.getDate(),
                    },
                },
            );
            setLoading(false);
            setAvailability(response.data);
        };
        loadDayAvailability();
    }, [selectedDate, selectedProvider]);

    const morgningAvailability = useMemo(() => {
        return availability
            .filter(({hour}) => hour < 12)
            .map((availabilityItem) => ({
                ...availabilityItem,
                hourFormated: format(
                    new Date().setHours(availabilityItem.hour),
                    'HH:00',
                ),
            }));
    }, [availability]);

    const afternoonAvailability = useMemo(() => {
        return availability
            .filter(({hour}) => hour >= 12)
            .map((availabilityItem) => ({
                ...availabilityItem,
                hourFormated: format(
                    new Date().setHours(availabilityItem.hour),
                    'HH:00',
                ),
            }));
    }, [availability]);

    useEffect(() => {
        setSelectedHour(0);
    }, [selectedDate, selectedProvider]);

    const handleSelectHour = useCallback((hour: number) => {
        setSelectedHour(hour);
    }, []);

    const handleCreateAppointment = useCallback(async () => {
        try {
            const date = new Date(selectedDate);
            date.setHours(selectedHour);
            date.setMinutes(0);

            await api.post('appointments', {
                provider_id: selectedProvider,
                date,
            });

            navigation.navigate('AppointmentCreated', {date: date.getTime()});
        } catch (err) {
            Alert.alert('Erro', 'Was not possible create a new appoinment');
        }
    }, [navigation, selectedDate, selectedHour, selectedProvider]);

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
            <Content>
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
                                onPress={() =>
                                    handleSelectProvider(provider.id)
                                }>
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
                {loading ? (
                    <ActivityIndicator
                        style={{
                            flex: 1,
                            justifyContent: 'center',
                            minHeight: 100,
                        }}
                        size="large"
                        color="#ff9700"
                    />
                ) : (
                    <>
                        <Calendar>
                            <CalendarTitle>Chose the date</CalendarTitle>
                            <OpenDatePickerButton
                                onPress={handleToggleDatePicker}>
                                <OpenDatePickerButtonText>
                                    Select another date
                                </OpenDatePickerButtonText>
                            </OpenDatePickerButton>
                            {showDatePicker && (
                                <DateTimePicker
                                    mode="date"
                                    display="calendar"
                                    textColor="#f4ede8"
                                    onChange={handleDateChange}
                                    value={selectedDate}
                                />
                            )}
                        </Calendar>
                        <Schedule>
                            <ScheduleTitle>Select the hour</ScheduleTitle>
                            <Section>
                                <SectionTitle>Morgning</SectionTitle>
                                <SectionContent>
                                    {morgningAvailability.map(
                                        ({hourFormated, available, hour}) => (
                                            <Hour
                                                enabled={available}
                                                selected={selectedHour === hour}
                                                available={available}
                                                key={hourFormated}
                                                onPress={() =>
                                                    handleSelectHour(hour)
                                                }>
                                                <HourText
                                                    selected={
                                                        selectedHour === hour
                                                    }>
                                                    {hourFormated}
                                                </HourText>
                                            </Hour>
                                        ),
                                    )}
                                </SectionContent>
                            </Section>
                            <Section>
                                <SectionTitle>Afternoon</SectionTitle>
                                <SectionContent>
                                    {afternoonAvailability.map(
                                        ({hourFormated, available, hour}) => (
                                            <Hour
                                                enabled={available}
                                                selected={selectedHour === hour}
                                                available={available}
                                                key={hourFormated}
                                                onPress={() =>
                                                    handleSelectHour(hour)
                                                }>
                                                <HourText
                                                    selected={
                                                        selectedHour === hour
                                                    }>
                                                    {hourFormated}
                                                </HourText>
                                            </Hour>
                                        ),
                                    )}
                                </SectionContent>
                            </Section>
                        </Schedule>
                        <CreateAppointmentButton
                            onPress={handleCreateAppointment}>
                            <CreateAppointmentButtonText>
                                Schedule Appointment
                            </CreateAppointmentButtonText>
                        </CreateAppointmentButton>
                    </>
                )}
            </Content>
        </Container>
    );
};

export default CreateAppointment;
