import React, {useCallback, useMemo} from 'react';
import {View} from 'react-native';

import {Container, Title, Description, OkButton, OkButtonText} from './styles';

import Icon from 'react-native-vector-icons/Feather';
import {useNavigation, useRoute} from '@react-navigation/native';
import {format} from 'date-fns';

interface RouteParams {
    date: number;
}

const AppointmentCreated: React.FC = () => {
    const {reset} = useNavigation();
    const {params} = useRoute();
    const {date} = params as RouteParams;

    const formatedDate = useMemo(
        () => format(date, "EEEE', 'dd'th' MMMM yyyy - hh:mma"),
        [date],
    );

    const handleOkPressed = useCallback(() => {
        reset({
            routes: [
                {
                    name: 'Dashboard',
                },
            ],
            index: 0,
        });
    }, [reset]);

    return (
        <Container>
            <Icon name="check" color="#04d361" size={80} />
            <Title>Appointment schedule</Title>
            <Description>{formatedDate}</Description>
            <OkButton onPress={handleOkPressed}>
                <OkButtonText>Ok</OkButtonText>
            </OkButton>
        </Container>
    );
};

export default AppointmentCreated;
