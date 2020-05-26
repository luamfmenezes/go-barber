import React from 'react';

import { IToastMessage } from '../../hooks/Toast';
import { Container } from './styles';
import { useTransition } from 'react-spring';
import Toast from './Toast';

interface ToastContainerProps {
    toastMessages: IToastMessage[];
}

const ToastContainer: React.FC<ToastContainerProps> = ({ toastMessages }) => {
    const messageWithTransitions = useTransition(
        toastMessages,
        (toastMessage) => toastMessage.id,
        {
            from: {
                right: '-120%',
                opacity: 0,
                height: '0px',
                padding: '0px 0px 0px 0px',
            },
            enter: {
                right: '0%',
                opacity: 1,
                height: '100%',
                padding: '16px 32px 16px 16px',
            },
            leave: {
                right: '-120%',
                opacity: 0,
                height: '0px',
                padding: '0px 0px 0px 0px',
            },
        },
    );

    return (
        <Container>
            {messageWithTransitions.map(({ item, key, props }) => (
                <Toast key={key} toast={item} style={props} />
            ))}
        </Container>
    );
};

export default ToastContainer;
