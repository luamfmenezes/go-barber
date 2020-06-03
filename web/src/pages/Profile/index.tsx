import React, { useState, useCallback, ChangeEvent } from 'react';
import { Container, Header, Content, AvatarInput } from './styles';
import { FiArrowLeft, FiMail, FiUser, FiLock, FiCamera } from 'react-icons/fi';
import * as Yup from 'yup';
import formatValidationErros from '../../utils/formatValidationErrors';
import { Link } from 'react-router-dom';
import api from '../../services/api';

import { useHistory } from 'react-router-dom';
import { useToast } from '../../hooks/Toast';

import Button from '../../components/Button';
import Input from '../../components/Input';
import { useAuth } from '../../hooks/Auth';
import Loading from '../../components/Loading';

import noAvatar from '../../assets/images/no-avatar.png';

interface IProfile {
    email?: string;
    password?: string;
    name?: string;
    old_password?: string;
    password_confirmation?: string;
}

const Profile: React.FC = () => {
    const { user: profile, updateUser } = useAuth();
    const { addToast } = useToast();
    const history = useHistory();
    const [loadingUpdateInfos, setLoadingUpdateInfos] = useState(false);
    const [loadingAvatar, setLoadingAvatar] = useState(false);
    const [user, setUser] = useState<IProfile>({
        email: profile.email || '',
        name: profile.name || '',
        password: undefined,
        old_password: undefined,
        password_confirmation: undefined,
    });
    const [errorsUser, setErrorsUser] = useState<IProfile>({});

    const handleSubmit = useCallback(
        async (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            setErrorsUser({});
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

                setLoadingUpdateInfos(true);

                await schemaUser.validate(user, {
                    abortEarly: false,
                });

                const response = await api.put('/profile', user);

                updateUser(response.data);

                addToast({
                    type: 'success',
                    description: 'Your was updated with success ♥',
                    title: 'Profile updated',
                });
            } catch (err) {
                if (err instanceof Yup.ValidationError) {
                    const errors = formatValidationErros(err);
                    setErrorsUser(errors);
                } else {
                    addToast({
                        type: 'error',
                        description: 'Was impossible to update your profile.',
                        title: 'Profile update error',
                    });
                }
            } finally {
                setLoadingUpdateInfos(false);
            }
        },
        [user, errorsUser],
    );

    const handleInputUser = useCallback(
        (event, fieldName) => {
            setUser({ ...user, [fieldName]: event.target.value });
        },
        [user],
    );

    const handleAvatarChange = async (event: ChangeEvent<HTMLInputElement>) => {
        try {
            setLoadingAvatar(true);
            if (event.target.files) {
                const data = new FormData();
                data.append('avatar', event.target.files[0]);
                const response = await api.patch('/users/avatar', data);
                updateUser(response.data);
            }
            addToast({
                type: 'success',
                title: 'Avatar updated',
                description: 'Your avatar was updated with success.',
            });
        } catch (err) {
            addToast({
                type: 'success',
                title: 'Erro update avatar',
                description:
                    'Happens some error when trying update your avatar.',
            });
        } finally {
            setLoadingAvatar(false);
        }
    };

    return (
        <Container>
            <Header>
                <div>
                    <Link to="/dashboard">
                        <FiArrowLeft />
                    </Link>
                </div>
            </Header>
            <Content>
                <form onSubmit={handleSubmit}>
                    <AvatarInput>
                        <img
                            src={profile.avatar_url || noAvatar}
                            alt={profile.name}
                        />
                        <label htmlFor="avatar">
                            {loadingAvatar ? <Loading /> : <FiCamera />}
                            <input
                                id="avatar"
                                type="file"
                                onChange={handleAvatarChange}
                            />
                        </label>
                    </AvatarInput>
                    <h1>My profile</h1>
                    <Input
                        value={user.email}
                        error={errorsUser.email}
                        onChange={(event) => handleInputUser(event, 'email')}
                        icon={FiMail}
                        name="email"
                        placeholder="Email"
                    />
                    <Input
                        value={user.name}
                        error={errorsUser.name}
                        onChange={(event) => handleInputUser(event, 'name')}
                        icon={FiUser}
                        name="name"
                        placeholder="username"
                    />
                    <hr />
                    <Input
                        value={user.old_password}
                        error={errorsUser.old_password}
                        onChange={(event) =>
                            handleInputUser(event, 'old_password')
                        }
                        icon={FiLock}
                        name="old_password"
                        type="password"
                        placeholder="Old password"
                    />
                    <Input
                        value={user.password}
                        error={errorsUser.password}
                        onChange={(event) => handleInputUser(event, 'password')}
                        icon={FiLock}
                        name="password"
                        type="password"
                        placeholder="New Password"
                    />
                    <Input
                        value={user.password_confirmation}
                        error={errorsUser.password_confirmation}
                        onChange={(event) =>
                            handleInputUser(event, 'password_confirmation')
                        }
                        icon={FiLock}
                        name="password_confirmation"
                        type="password"
                        placeholder="Confirm new password"
                    />
                    <Button type="submit">Save Profile</Button>
                </form>
            </Content>
        </Container>
    );
};

export default Profile;
