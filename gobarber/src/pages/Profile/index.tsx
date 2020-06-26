import React, {useRef, useCallback, useEffect} from 'react';
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
import getValidationErrors from '../../utils/formatValidationErrors';
import {useNavigation} from '@react-navigation/native';
import {useAuth} from '../../hooks/Auth';
import ImagePicker from 'react-native-image-picker';
import Button from '../../components/Button';
import Input from '../../components/Input';

import Icon from 'react-native-vector-icons/Feather';

import api from '../../services/api';

interface InputFocusRef {
    focus(): void;
}

interface FormData {
    email: string;
    name: string;
    password?: string;
    old_password?: string;
    password_confirmation?: string;
}

import {
    Container,
    Title,
    UserAvatarButton,
    UserAvatarImage,
    Line,
    BackButton,
} from './styles';
import {formatDistance} from 'date-fns/esm';

const Profile: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const emailInputRef = useRef<InputFocusRef>(null);
    const passwordInputRef = useRef<InputFocusRef>(null);
    const oldPasswordInputRef = useRef<InputFocusRef>(null);
    const confirmPasswordInputRef = useRef<InputFocusRef>(null);
    const navigation = useNavigation();
    const {user, updateUser, signOut} = useAuth();

    const handleGoBack = useCallback(() => {
        navigation.goBack();
    }, []);

    useEffect(() => {
        const data = formRef.current?.getData();
        formRef.current?.setData({...data, name: user.name, email: user.email});
    }, [user]);

    const handleSubmit = useCallback(
        async (data: FormData) => {
            formRef.current?.setErrors({});
            try {
                const schemaUser = Yup.object().shape({
                    email: Yup.string()
                        .email('Email is inválid.')
                        .required('Email is required.'),
                    name: Yup.string().required('Username is required.'),
                    old_password: Yup.string().when('password', {
                        is: (fildValue) => !!fildValue?.length,
                        then: Yup.string().required(
                            'To change the password is necessary inform the old password',
                        ),
                        otherwise: Yup.string(),
                    }),
                    password: Yup.string(),
                    password_confirmation: Yup.string().oneOf(
                        [Yup.ref('password')],
                        'The passwords must match',
                    ),
                });

                await schemaUser.validate(data, {
                    abortEarly: false,
                });

                const {
                    email,
                    name,
                    password,
                    old_password,
                    password_confirmation,
                } = data;

                const formData = {email, name};

                if (password) {
                    Object.assign(formData, {
                        password,
                        old_password,
                        password_confirmation,
                    });
                }

                const response = await api.put('/profile', formData);

                updateUser(response.data);

                Alert.alert('Success', 'Profile updated with success');
            } catch (err) {
                if (err instanceof Yup.ValidationError) {
                    const errors = getValidationErrors(err);
                    formRef.current?.setErrors(errors);
                    return;
                }
                Alert.alert('Error', 'Was not possible update your profile');
            }
        },
        [formRef],
    );

    const handleUpdateAvatar = useCallback(() => {
        ImagePicker.showImagePicker({title: 'Chose one avatar'}, (response) => {
            if (response.didCancel) {
                return;
            }

            if (response.error) {
                Alert.alert(
                    'Error',
                    'Something happens and was not possible update your avatar',
                );
            }

            const userAvatar = new FormData();

            userAvatar.append('avatar', {
                uri: response.uri,
                type: 'image/jpeg',
                name: `${user.id}.jpg`,
            });

            api.patch('users/avatar', userAvatar).then((userResponse) => {
                updateUser(userResponse.data);
            });
        });
    }, [updateUser, user.id]);

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
                        <BackButton onPress={handleGoBack}>
                            <Icon
                                name="chevron-left"
                                color="#999591"
                                size={20}
                            />
                        </BackButton>
                        <UserAvatarButton onPress={handleUpdateAvatar}>
                            <UserAvatarImage
                                source={{
                                    uri:
                                        user.avatar_url ||
                                        `https://api.adorable.io/avatars/285/${user.email}`,
                                }}
                            />
                        </UserAvatarButton>
                        <Title>My Profile</Title>
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
                                    oldPasswordInputRef.current?.focus()
                                }
                            />
                            <Line />
                            <Input
                                ref={oldPasswordInputRef}
                                name="old_password"
                                icon="lock"
                                placeholder="Your current password"
                                returnKeyType="next"
                                secureTextEntry
                                onSubmitEditing={() =>
                                    passwordInputRef.current?.focus()
                                }
                            />
                            <Input
                                ref={passwordInputRef}
                                name="password"
                                icon="lock"
                                placeholder="New password"
                                returnKeyType="next"
                                secureTextEntry
                                onSubmitEditing={() =>
                                    confirmPasswordInputRef.current?.focus()
                                }
                            />
                            <Input
                                ref={confirmPasswordInputRef}
                                name="password_confirmation"
                                icon="lock"
                                placeholder="Confirm new password"
                                returnKeyType="send"
                                secureTextEntry
                                onSubmitEditing={() =>
                                    formRef.current?.submitForm()
                                }
                            />
                            <Button
                                onPress={() => formRef.current?.submitForm()}>
                                Confirm changes
                            </Button>
                            <Button
                                style={{backgroundColor: '#c53030'}}
                                onPress={signOut}>
                                LogOut
                            </Button>
                        </Form>
                    </Container>
                </ScrollView>
            </KeyboardAvoidingView>
        </>
    );
};

export default Profile;
