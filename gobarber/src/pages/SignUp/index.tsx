import React, {useRef, useCallback} from 'react';
import {
    Image,
    KeyboardAvoidingView,
    ScrollView,
    Platform,
    Alert,
} from 'react-native';
import {FormHandles} from '@unform/core';
import {Form} from '@unform/mobile';
import * as Yup from 'yup';
import Icon from 'react-native-vector-icons/Feather';
import logo from '../../assets/logo.png';
import getValidationErrors from '../../utils/formatValidationErrors';
import {useNavigation} from '@react-navigation/native';

import Button from '../../components/Button';
import Input from '../../components/Input';

import api from '../../services/api';

interface InputFocusRef {
    focus(): void;
}

import {
    Container,
    Title,
    BackToSignInButton,
    BackToSignInButtonText,
} from './styles';

const SignUp: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const passwordInputRef = useRef<InputFocusRef>(null);
    const emailInputRef = useRef<InputFocusRef>(null);
    const navigation = useNavigation();

    const handleSubmit = useCallback(
        async (data: Object) => {
            formRef.current?.setErrors({});
            try {
                const schema = Yup.object().shape({
                    name: Yup.string().required('Your name is required'),
                    email: Yup.string()
                        .email('Your email should be valid')
                        .required('Your email is required'),
                    password: Yup.string().required('Password is required'),
                });

                await schema.validate(data, {
                    abortEarly: false,
                });

                await api.post('/users', data);

                Alert.alert('Welcome !', 'Account created with success');

                navigation.navigate('SignIn');
            } catch (err) {
                if (err instanceof Yup.ValidationError) {
                    const errors = getValidationErrors(err);
                    formRef.current?.setErrors(errors);
                    return;
                }
                console.log(err);
            }
        },
        [formRef],
    );

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
                        <Form
                            ref={formRef}
                            onSubmit={handleSubmit}
                            style={{width: '100%'}}>
                            <Input
                                autoCapitalize="none"
                                autoCorrect={false}
                                name="name"
                                icon="user"
                                placeholder="Your name"
                                returnKeyType="next"
                                onSubmitEditing={() =>
                                    emailInputRef.current?.focus()
                                }
                            />
                            <Input
                                name="email"
                                icon="mail"
                                placeholder="Your email"
                                returnKeyType="next"
                                keyboardType="email-address"
                                autoCapitalize="none"
                                ref={emailInputRef}
                                onSubmitEditing={() =>
                                    passwordInputRef.current?.focus()
                                }
                            />
                            <Input
                                ref={passwordInputRef}
                                name="password"
                                icon="lock"
                                placeholder="Your password"
                                returnKeyType="send"
                                secureTextEntry
                                onSubmitEditing={() =>
                                    formRef.current?.submitForm()
                                }
                            />
                            <Button
                                onPress={() => formRef.current?.submitForm()}>
                                Register
                            </Button>
                        </Form>
                    </Container>
                </ScrollView>
            </KeyboardAvoidingView>
            <BackToSignInButton onPress={() => navigation.navigate('SignIn')}>
                <Icon name="arrow-left" size={20} color="#fff" />
                <BackToSignInButtonText>Back to login</BackToSignInButtonText>
            </BackToSignInButton>
        </>
    );
};

export default SignUp;
