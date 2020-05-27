import React, { useState, useCallback } from 'react';
import { Container, Content, AnimatedContent, Background } from './styles';
import { FiArrowLeft, FiMail, FiUser, FiLock } from 'react-icons/fi';
import logo from '../../assets/images/logo.svg';
import * as Yup from 'yup';
import formatValidationErros from '../../utils/formatValidationErrors';
import { Link } from 'react-router-dom';
import api from '../../services/api';

import { useHistory } from 'react-router-dom';
import { useToast } from '../../hooks/Toast';

import Button from '../../components/Button';
import Input from '../../components/Input';

interface IUser {
    email?: string;
    password?: string;
    name?: string;
}

const SignUp: React.FC = () => {
    const { addToast } = useToast();
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState<IUser>({
        email: '',
        password: '',
        name: '',
    });
    const [errorsUser, setErrorsUser] = useState<IUser>({});

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
                    password: Yup.string().required(
                        'Password require a lest 6 caracters.',
                    ),
                });

                setLoading(true);

                await schemaUser.validate(user, {
                    abortEarly: false,
                });

                await api.post('/users', user);

                addToast({
                    type: 'success',
                    description: 'Your account was registered with sucess ♥',
                    title: 'Welcome to GoBarber',
                });

                history.push('/');
            } catch (err) {
                if (err instanceof Yup.ValidationError) {
                    const errors = formatValidationErros(err);
                    setErrorsUser(errors);
                } else {
                    addToast({
                        type: 'error',
                        description: 'Was impossible to register.',
                        title: 'Register Error',
                    });
                }
            } finally {
                setLoading(false);
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

    return (
        <Container>
            <Background />
            <Content>
                <AnimatedContent>
                    <img src={logo} alt="GoBarber" />
                    <form onSubmit={handleSubmit}>
                        <h1>Sign Up</h1>
                        <Input
                            value={user.email}
                            error={errorsUser.email}
                            onChange={(event) =>
                                handleInputUser(event, 'email')
                            }
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
                        <Input
                            value={user.password}
                            error={errorsUser.password}
                            onChange={(event) =>
                                handleInputUser(event, 'password')
                            }
                            icon={FiLock}
                            name="password"
                            type="password"
                            placeholder="Password"
                        />
                        <Button type="submit">Register</Button>
                    </form>
                    <Link to="/">
                        <FiArrowLeft size={16} color="#f4ede8" />
                        Back to Login
                    </Link>
                </AnimatedContent>
            </Content>
        </Container>
    );
};

export default SignUp;
