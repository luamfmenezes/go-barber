import React from 'react';
import {Image, KeyboardAvoidingView, ScrollView, Platform} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import logo from '../../assets/logo.png';

import Button from '../../components/Button';
import Input from '../../components/Input';

import {
    Container,
    Title,
    BackToSignInButton,
    BackToSignInButtonText,
} from './styles';

const SignUp: React.FC = () => {
    return (
        <>
            <KeyboardAvoidingView
                style={{flex: 1}}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                enabled>
                <ScrollView
                    style={{flex: 1}}
                    keyboardShouldPersistTaps="handled">
                    <Container>
                        <Image source={logo} />
                        <Title>SignUp</Title>
                        <Input
                            name="user"
                            icon="user"
                            placeholder="Your name"
                        />
                        <Input
                            name="email"
                            icon="mail"
                            placeholder="Your email"
                        />
                        <Input
                            name="password"
                            icon="lock"
                            placeholder="Your password"
                        />
                        <Button>Register</Button>
                    </Container>
                </ScrollView>
            </KeyboardAvoidingView>
            <BackToSignInButton>
                <Icon name="arrow-left" size={20} color="#fff" />
                <BackToSignInButtonText>Back to login</BackToSignInButtonText>
            </BackToSignInButton>
        </>
    );
};

export default SignUp;
