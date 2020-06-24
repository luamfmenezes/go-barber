import React, {useRef, useState, useCallback} from 'react';
import {
    Image,
    KeyboardAvoidingView,
    ScrollView,
    Platform,
    TextInput,
} from 'react-native';
import * as Yup from 'yup';
import {Form} from '@unform/mobile';
import {FormHandles} from '@unform/core';

import Icon from 'react-native-vector-icons/Feather';
import logo from '../../assets/logo.png';
import Button from '../../components/Button';
import Input from '../../components/Input';

import getValidationErrors from '../../utils/formatValidationErrors';

import {
    Container,
    Title,
    ForgotPassword,
    ForgotPasswordText,
    CreateAccountButton,
    CreateAccountButtonText,
} from './styles';

interface InputFocusRef {
    focus(): void;
}

interface IUser {
    email: string;
    password: string;
}
const SignIn: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const passwordInputRef = useRef<InputFocusRef>(null);

    const [user, setUser] = useState<IUser>({
        email: '',
        password: '',
    });

    const handleSubmit = useCallback(
        async (data: Object) => {
            formRef.current?.setErrors({});
            try {
                console.log(data);
                const schema = Yup.object().shape({
                    email: Yup.string()
                        .email('Email should be valid')
                        .required('Email is required'),
                    password: Yup.string().required('Password is required'),
                });

                await schema.validate(data, {
                    abortEarly: false,
                });

                console.log('in');

                // signIn usign Hooks
            } catch (err) {
                if (err instanceof Yup.ValidationError) {
                    const errors = getValidationErrors(err);
                    console.log(errors);
                    formRef.current?.setErrors(errors);
                    return;
                }
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
                    contentContainerStyle={{flex: 1}}
                    keyboardShouldPersistTaps="handled">
                    <Container>
                        <Image source={logo} />
                        <Title>SignIn</Title>
                        <Form
                            ref={formRef}
                            onSubmit={handleSubmit}
                            style={{width: '100%'}}>
                            <Input
                                name="email"
                                icon="mail"
                                placeholder="Your email"
                                returnKeyType="next"
                                onSubmitEditing={() =>
                                    passwordInputRef.current?.focus()
                                }
                            />
                            <Input
                                ref={passwordInputRef}
                                name="password"
                                icon="lock"
                                placeholder="Your password"
                            />
                            <Button
                                onPress={() => formRef.current?.submitForm()}>
                                Login
                            </Button>
                        </Form>
                        <ForgotPassword>
                            <ForgotPasswordText>
                                forgot password
                            </ForgotPasswordText>
                        </ForgotPassword>
                    </Container>
                </ScrollView>
            </KeyboardAvoidingView>
            <CreateAccountButton>
                <Icon name="log-in" size={20} color="#ff9000" />
                <CreateAccountButtonText>SignUp</CreateAccountButtonText>
            </CreateAccountButton>
        </>
    );
};

export default SignIn;
