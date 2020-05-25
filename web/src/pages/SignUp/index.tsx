import React, { useState, useCallback } from 'react';
import { Container, Content, Background } from './styles';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { FiArrowLeft, FiMail, FiUser, FiLock } from 'react-icons/fi';
import logo from '../../assets/images/logo.svg';
import * as Yup from 'yup';
import formatValidationErros from '../../utils/formatValidationErrors';

interface IUser {
    email?: string;
    password?: string;
    name?: string;
}

const SignUp: React.FC = () => {
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

                await schemaUser.validate(user, {
                    abortEarly: false,
                });
            } catch (err) {
                const errors = formatValidationErros(err);
                setErrorsUser(errors);
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
                <img src={logo} alt="GoBarber" />
                <form onSubmit={handleSubmit}>
                    <h1>Sign Up</h1>
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
                    <Input
                        value={user.password}
                        error={errorsUser.password}
                        onChange={(event) => handleInputUser(event, 'password')}
                        icon={FiLock}
                        name="password"
                        type="password"
                        placeholder="Password"
                    />
                    <Button type="submit">Register</Button>
                </form>
                <a href="forgot">
                    <FiArrowLeft size={16} color="#f4ede8" />
                    Back to Login
                </a>
            </Content>
        </Container>
    );
};

export default SignUp;
