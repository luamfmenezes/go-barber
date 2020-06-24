import React from 'react';
import {View} from 'react-native';
import {RectButtonProperties} from 'react-native-gesture-handler';
import {Container, ButtonText} from './styles';

interface ButtonProps extends RectButtonProperties {
    children: string;
}

// the children prop is alred specifed like optional by React.FC
// here i'm demanding this props, and saying that it shold be a string

const Button: React.FC<ButtonProps> = ({children, ...rest}) => {
    return (
        <Container {...rest}>
            <ButtonText>{children}</ButtonText>
        </Container>
    );
};

export default Button;
