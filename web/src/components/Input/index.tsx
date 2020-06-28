import React, {
    InputHTMLAttributes,
    useState,
    useCallback,
    useRef,
} from 'react';

import { IconType } from 'react-icons';
import { FiAlertCircle } from 'react-icons/fi';

import { Container, ToolTipStyled } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
    error?: string | undefined;
    icon?: IconType;
}

const Input: React.FC<InputProps> = ({ icon: Icon, error, ...rest }) => {
    const [isFocused, setIsFocused] = useState(false);
    const [isFilled, setIsFilled] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleOnFocus = useCallback(() => {
        setIsFocused(true);
    }, []);

    const handleOnBlur = useCallback(() => {
        setIsFocused(false);
        setIsFilled(!!inputRef.current?.value);
    }, []);

    return (
        <Container
            data-testId="input-container"
            hadError={!!error}
            isFilled={isFilled}
            isFocused={isFocused}
        >
            {Icon && <Icon size={22} />}
            <input
                ref={inputRef}
                {...rest}
                onFocus={handleOnFocus}
                onBlur={handleOnBlur}
            />
            {error && (
                <ToolTipStyled title={error}>
                    <FiAlertCircle size={24} />
                </ToolTipStyled>
            )}
        </Container>
    );
};

export default Input;
