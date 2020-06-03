import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';

const fadeIn = keyframes`
    from{
        opacity:0;
        transform: translateX(-50px);
    }
    to{
        opacity:1;
        transform: translateX(0px);
    }
`;

const growHeader = keyframes`
    from{
        transform: translateY(-50px);
        opacity:0;
    }
    to{
        transform: translateY(0px);
        opacity:1;
    }
`;

export const Container = styled.div``;
export const Header = styled.div`
    animation: 0.5s ${growHeader} 0s both;
    padding: 32px 0;
    background: #28262e;
`;

export const HeaderContent = styled.div`
    max-width: 1120px;
    margin: 0 auto;
    display: flex;
    align-items: center;

    > img {
        height: 80px;
    }

    button {
        margin-left: auto;
        border: 0;
        background-color: transparent;
        svg {
            transition: opacity 0.2s;
            color: #999595;
            width: 20px;
            height: 20px;
        }
        &:hover {
            svg {
                opacity: 0.8;
            }
        }
    }
`;

export const Profile = styled.div`
    display: flex;
    align-items: center;
    margin-left: 80px;
    img {
        width: 56px;
        height: 56px;
        border-radius: 50%;
    }
    div {
        display: flex;
        flex-direction: column;
        margin-left: 16px;
        line-height: 24px;

        a {
            text-decoration: none;
            color: #ff9000;
            transition: opacity 0.2s;
            &:hover {
                opacity: 0.8;
            }
        }

        span {
            color: #f4ede8;
        }
    }
`;

export const Content = styled.main`
    max-width: 1120px;
    margin: 64px auto;
    display: flex;
`;

export const Schedule = styled.div`
    flex: 1;
    animation: 0.5s ${fadeIn} 0s both;
    h1 {
        font-size: 36px;
    }
    p {
        margin-top: 8px;
        color: #ff9000;
        display: flex;
        font-weight: 500;
        span {
            align-items: center;
            display: flex;
        }

        span + span::before {
            content: '';
            width: 1px;
            height: 12px;
            background: #ff9000;
            margin: 0 8px;
        }
    }
`;

export const NextAppointment = styled.div`
    margin-top: 64px;

    > strong {
        color: #999591;
        font-size: 20px;
        font-weight: 400;
    }

    div {
        background: #3e3b47;
        display: flex;
        align-items: center;
        padding: 16px 24px;
        margin-top: 24px;
        border-radius: 10px;
        position: relative;

        &::before {
            content: '';
            position: absolute;
            width: 2px;
            height: 80%;
            left: 0;
            border-radius: 1px;
            top: 10%;
            background: #ff9000;
            margin: 0 8px;
        }

        img {
            width: 80px;
            height: 80px;
            border-radius: 50%;
        }

        strong {
            margin-left: 24px;
            color: #fff;
        }

        span {
            margin-left: auto;
            display: flex;
            align-items: center;
            color: #999591;
            svg {
                color: #ff9000;
                margin-right: 8px;
            }
        }
    }
`;

export const Section = styled.div`
    margin-top: 48px;
    > strong {
        color: #999591;
        font-size: 20px;
        line-height: 26px;
        border-bottom: 1px solid #3e3b47;
        display: block;
        padding-bottom: 16px;
        margin-bottom: 16px;
    }
`;

export const Appointment = styled.div`
    display: flex;
    align-items: center;
    span {
        margin-left: auto;
        display: flex;
        align-items: center;
        color: #f4ede8;
        svg {
            color: #ff9000;
            margin-right: 8px;
        }
    }

    & + div {
        margin-top: 16px;
    }

    div {
        flex: 1;
        background: #3e3b47;
        display: flex;
        align-items: center;
        padding: 16px 24px;
        margin-left: 24px;
        border-radius: 10px;
        position: relative;
        img {
            width: 56px;
            height: 56px;
            border-radius: 50%;
        }

        strong {
            margin-left: 24px;
            color: #fff;
            font-size: 20px;
        }
    }
`;

export const Calendar = styled.aside`
    flex: 1;
    max-width: 460px;
    padding-left: 80px;
    .DayPicker {
        background: #28262e;
        border-radius: 10px;
    }

    .DayPicker-wrapper {
        padding-bottom: 0;
    }

    .DayPicker,
    .DayPicker-Month {
        width: 100%;
    }

    .DayPicker-Month {
        border-collapse: separate;
        border-spacing: 8px;
        margin: 16px;
    }

    .DayPicker-Day {
        width: 40px;
        height: 40px;
    }

    .DayPicker-Day--available:not(.DayPicker-Day--outside) {
        background: #3e3b47;
        border-radius: 10px;
        color: #fff;
    }

    .DayPicker:not(.DayPicker--interactionDisabled)
        .DayPicker-Day:not(.DayPicker-Day--disabled):not(.DayPicker-Day--selected):not(.DayPicker-Day--outside):hover {
        background: ${shade(0.2, '#3e3b47')};
    }

    .DayPicker-Day--today {
        font-weight: normal;
    }

    .DayPicker-Day--disabled {
        color: #666360 !important;
        background: transparent !important;
    }

    .DayPicker-Day--selected {
        background: #ff9000 !important;
        border-radius: 10px;
        color: #232129 !important;
    }
`;

export const ClearSchedule = styled.p`
    color: #666360 !important;
    width: 100%;
    opacity: 0.6;
`;
