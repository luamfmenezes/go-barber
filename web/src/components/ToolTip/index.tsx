import React, {
    InputHTMLAttributes,
    useState,
    useCallback,
    useRef,
} from 'react';

import { Container } from './styles';

interface IToolTipProps {
    title: string;
    className?: string;
}

const Input: React.FC<IToolTipProps> = ({
    title,
    className,
    children,
    ...rest
}) => {
    return (
        <Container className={className} {...rest}>
            <span>{title}</span>
            {children}
        </Container>
    );
};

export default Input;
