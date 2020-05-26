import React, { useEffect, useRef, useState } from 'react';
import { useSpring } from 'react-spring';
import {
    FiAlertCircle,
    FiCheckCircle,
    FiInfo,
    FiXCircle,
} from 'react-icons/fi';

import { Container, CloseLine } from './styles';
import { useToast, IToastMessage } from '../../../hooks/Toast';

const toastIconType = {
    info: <FiInfo size={24} />,
    success: <FiCheckCircle size={24} />,
    error: <FiAlertCircle size={24} />,
};

interface IToastProps {
    toast: IToastMessage;
    style: object;
}

const ToastContainer: React.FC<IToastProps> = ({ toast, style }) => {
    const { id, title, description, type } = toast;

    const [timer, setTimer] = useState<number>();
    const [width, setWidth] = useState('100%');

    const [duration, setDuration] = useState(3250);
    const testRef = useRef(null);
    const { removeToast } = useToast();
    const closeLineStyle = useSpring({
        config: { duration },
        width,
    });

    useEffect(() => {
        const removeToastTimer = setTimeout(() => {
            removeToast(id);
        }, 3000);

        setTimer(removeToastTimer);

        return () => {
            clearTimeout(removeToastTimer);
        };
    }, [removeToast, id]);

    useEffect(() => {
        setWidth('0%');
    }, []);

    const onFocusHandle = () => {
        clearTimeout(timer);
        setWidth(closeLineStyle.width.getValue() + '%');
    };

    const handleMouseOut = () => {
        const widthCurrentValue = parseInt(
            '0' + closeLineStyle.width.getValue(),
        );

        const restTime = (3000 * widthCurrentValue) / 100;

        setDuration(restTime);

        const timeOut = setTimeout(() => {
            removeToast(id);
        }, restTime);

        setTimer(timeOut);

        setWidth('0%');
    };

    return (
        <Container
            key={id}
            hasDescription={!!description}
            type={type}
            style={style}
            onMouseOver={onFocusHandle}
            onMouseOut={handleMouseOut}
        >
            {toastIconType[type || 'info']}
            <div>
                <strong>{title}</strong>
                {description && <p>{description}</p>}
            </div>
            <button onClick={() => removeToast(id)}>
                <FiXCircle />
            </button>
            <CloseLine ref={testRef} style={closeLineStyle} />
        </Container>
    );
};

export default ToastContainer;
