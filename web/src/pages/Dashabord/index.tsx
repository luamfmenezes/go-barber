import React, { useState, useCallback, useEffect, useMemo } from 'react';
import 'react-day-picker/lib/style.css';
import DayPicker, { DayModifiers } from 'react-day-picker';
import { isToday, parseISO, format, isAfter } from 'date-fns';
import Loading from '../../components/Loading';

import {
    Container,
    Header,
    HeaderContent,
    Profile,
    Content,
    Schedule,
    NextAppointment,
    Section,
    ClearSchedule,
    Appointment,
    Calendar,
} from './styles';
import { FiPower, FiClock } from 'react-icons/fi';
import logoImage from '../../assets/images/logo.svg';
import { useAuth } from '../../hooks/Auth';

import noAvatar from '../../assets/images/no-avatar.png';
import api from '../../services/api';
import { Link } from 'react-router-dom';

interface IMonthAvailabilityItem {
    day: number;
    available: boolean;
}

interface IAppointment {
    id: string;
    date: string;
    user: {
        name: string;
        avatar_url: string;
    };
}

const Dashboard: React.FC = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [appointments, setAppointments] = useState<IAppointment[]>([]);
    const [loadingAppointments, setLoadingAppointments] = useState(true);
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

    useEffect(() => {
        async function getAppointments() {
            setLoadingAppointments(true);

            const response = await api.get('appointments/me', {
                params: {
                    year: selectedDate.getFullYear(),
                    month: selectedDate.getMonth() + 1,
                    day: selectedDate.getDate(),
                },
            });
            setAppointments(response.data);
            setLoadingAppointments(false);
        }
        getAppointments();
    }, [selectedDate, user.id]);

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

    const morningAppointments = useMemo<IAppointment[]>(() => {
        return appointments.filter(
            (appointment) => parseISO(appointment.date).getHours() < 12,
        );
    }, [appointments]);

    const afternoonAppointments = useMemo<IAppointment[]>(() => {
        return appointments.filter(
            (appointment) => parseISO(appointment.date).getHours() >= 12,
        );
    }, [appointments]);

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

    const selectedDateAsText = useMemo(() => {
        return format(selectedDate, `d'th' MMMM`);
    }, [selectedDate]);

    const selectedWeekDay = useMemo(() => {
        return format(selectedDate, 'cccc');
    }, [selectedDate]);

    const nextAppointment = useMemo(() => {
        return appointments.find((appointment) =>
            isAfter(parseISO(appointment.date), new Date()),
        );
    }, [appointments]);

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
                            <Link to="/profile">
                                <strong>{user.name}</strong>
                            </Link>
                        </div>
                    </Profile>
                    <button type="button" onClick={signOut}>
                        <FiPower />
                    </button>
                </HeaderContent>
            </Header>
            <Content>
                {loadingAppointments ? (
                    <Loading />
                ) : (
                    <Schedule>
                        <h1>Schedules times</h1>
                        <p>
                            {isToday(selectedDate) && <span>Today</span>}
                            <span>{selectedDateAsText}</span>
                            <span>{selectedWeekDay}</span>
                        </p>
                        {isToday(selectedDate) && nextAppointment && (
                            <NextAppointment>
                                <strong>Next appointment</strong>
                                <div>
                                    <img
                                        src={
                                            nextAppointment.user.avatar_url ||
                                            noAvatar
                                        }
                                        alt="luamemenezes"
                                    />
                                    <strong>{nextAppointment.user.name}</strong>
                                    <span>
                                        <FiClock />
                                        {format(
                                            parseISO(nextAppointment.date),
                                            'hh:mm a',
                                        )}
                                    </span>
                                </div>
                            </NextAppointment>
                        )}
                        <Section>
                            <strong>Mornig</strong>
                            {morningAppointments.map((appointment) => (
                                <Appointment key={appointment.id}>
                                    <span>
                                        <FiClock />
                                        {format(
                                            new Date(appointment.date),
                                            'hh:mm a',
                                        )}
                                    </span>
                                    <div>
                                        <img
                                            src={
                                                appointment.user.avatar_url ||
                                                noAvatar
                                            }
                                            alt="luamemenezes"
                                        />
                                        <strong>{appointment.user.name}</strong>
                                    </div>
                                </Appointment>
                            ))}
                            {morningAppointments.length === 0 && (
                                <ClearSchedule>
                                    You schedule is clear by the morning
                                </ClearSchedule>
                            )}
                        </Section>
                        <Section>
                            <strong>Afternoon</strong>
                            {afternoonAppointments.map((appointment) => (
                                <Appointment key={appointment.id}>
                                    <span>
                                        <FiClock />
                                        {format(
                                            new Date(appointment.date),
                                            'hh:mm a',
                                        )}
                                    </span>
                                    <div>
                                        <img
                                            src={
                                                appointment.user.avatar_url ||
                                                noAvatar
                                            }
                                            alt="luamemenezes"
                                        />
                                        <strong>{appointment.user.name}</strong>
                                    </div>
                                </Appointment>
                            ))}
                            {afternoonAppointments.length === 0 && (
                                <ClearSchedule>
                                    You schedule is clear by the afternoon
                                </ClearSchedule>
                            )}
                        </Section>
                    </Schedule>
                )}
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
