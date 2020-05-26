import React, { useState, useCallback, useEffect, useMemo } from 'react';
import 'react-day-picker/lib/style.css';
import DayPicker, { DayModifiers } from 'react-day-picker';
import {
    Container,
    Header,
    HeaderContent,
    Profile,
    Content,
    Schedule,
    NextAppointment,
    Section,
    Appointment,
    Calendar,
} from './styles';
import { FiPower, FiClock } from 'react-icons/fi';
import logoImage from '../../assets/images/logo.svg';
import { useAuth } from '../../hooks/Auth';

import noAvatar from '../../assets/images/no-avatar.png';
import api from '../../services/api';

interface IMonthAvailabilityItem {
    day: number;
    available: boolean;
}

const Dashboard: React.FC = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [monthAvailability, setMonthAvailabiliry] = useState<
        IMonthAvailabilityItem[]
    >([]);
    const { signOut, user } = useAuth();

    useEffect(() => {
        async function getMonthAvailability() {
            const response = await api.get(
                `/providers/${user.id}/month-availability`,
                {
                    params: {
                        year: currentMonth.getFullYear(),
                        month: currentMonth.getMonth() + 1,
                    },
                },
            );
            setMonthAvailabiliry(response.data);
        }
        getMonthAvailability();
    }, [currentMonth, user.id]);

    const handleDateChange = useCallback(
        (day: Date, modifiers: DayModifiers) => {
            if (modifiers.available) {
                setSelectedDate(day);
            }
        },
        [setSelectedDate],
    );

    const hanldeMonthChange = useCallback(
        (month: Date) => {
            setCurrentMonth(month);
        },
        [setCurrentMonth],
    );

    const disableDays = useMemo(() => {
        const dates = monthAvailability
            .filter((monthDay) => monthDay.available === false)
            .map((monthDay) => {
                const year = currentMonth.getFullYear();
                const month = currentMonth.getMonth();
                return new Date(year, month, monthDay.day);
            });
        return dates;
    }, [currentMonth, monthAvailability]);

    return (
        <Container>
            <Header>
                <HeaderContent>
                    <img src={logoImage} alt="GoBarber" />
                    <Profile>
                        <img
                            src={user.avatar_url || noAvatar}
                            alt={user.name}
                        />
                        <div>
                            <span>Bem vindo, </span>
                            <strong>{user.name}</strong>
                        </div>
                    </Profile>
                    <button type="button" onClick={signOut}>
                        <FiPower />
                    </button>
                </HeaderContent>
            </Header>
            <Content>
                <Schedule>
                    <h1>Schedules times</h1>
                    <p>
                        <span>Hoje</span>
                        <span>Dia 06</span>
                        <span>Segunda-feira</span>
                    </p>

                    <NextAppointment>
                        <strong>Next appointment</strong>
                        <div>
                            <img src={noAvatar} alt="luamemenezes" />
                            <strong>Luam Menezes</strong>
                            <span>
                                <FiClock />
                                11:00
                            </span>
                        </div>
                    </NextAppointment>
                    <Section>
                        <strong>Mornig</strong>
                        <Appointment>
                            <span>
                                <FiClock />
                                11:00
                            </span>
                            <div>
                                <img src={noAvatar} alt="luamemenezes" />
                                <strong>Luam Menezes</strong>
                            </div>
                        </Appointment>
                        <Appointment>
                            <span>
                                <FiClock />
                                11:00
                            </span>
                            <div>
                                <img src={noAvatar} alt="luamemenezes" />
                                <strong>Luam Menezes</strong>
                            </div>
                        </Appointment>
                    </Section>
                    <Section>
                        <strong>Afternoon</strong>
                        <Appointment>
                            <span>
                                <FiClock />
                                11:00
                            </span>
                            <div>
                                <img src={noAvatar} alt="luamemenezes" />
                                <strong>Luam Menezes</strong>
                            </div>
                        </Appointment>
                    </Section>
                </Schedule>
                <Calendar>
                    <DayPicker
                        fromMonth={new Date()}
                        disabledDays={[{ daysOfWeek: [0, 6] }, ...disableDays]}
                        onDayClick={handleDateChange}
                        onMonthChange={hanldeMonthChange}
                        selectedDays={selectedDate}
                        modifiers={{
                            available: { daysOfWeek: [1, 2, 3, 4, 5] },
                        }}
                    />
                </Calendar>
            </Content>
        </Container>
    );
};

export default Dashboard;
