import React, { useState, useCallback } from 'react';
import { Container, Content, Background } from './styles';
import logo from '../../assets/images/logo.svg';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import * as Yup from 'yup';

import formatValidationErros from '../../utils/formatValidationErrors';

interface ICredentials {
    email?: string;
    password?: string;
}

const SignIn: React.FC = () => {
    const [credentials, setCredentials] = useState<ICredentials>({
        email: '',
        password: '',
    });
    const [errorFields, setErrorFields] = useState<ICredentials>({});

    const handleInputCredentials = useCallback(
        (event, fieldName) => {
            setCredentials({ ...credentials, [fieldName]: event.target.value });
        },
        [credentials],
    );

    const handleSubmit = useCallback(
        async (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            setErrorFields({});
            try {
                const schemaCredentitials = Yup.object().shape({
                    email: Yup.string()
                        .email('Email inválid')
                        .required('Email is required'),
                    password: Yup.string().required('Password is required'),
                });

                await schemaCredentitials.validate(credentials, {
                    abortEarly: false,
                });
            } catch (err) {
                const errors = formatValidationErros(err);
                setErrorFields(errors);
            }
        },
        [credentials, errorFields],
    );

    return (
        <Container>
            <Content>
                <img src={logo} alt="GoBarber" />
                <form onSubmit={handleSubmit}>
                    <h1>Login</h1>
                    <Input
                        icon={FiMail}
                        name="email"
                        placeholder="Email"
                        error={errorFields?.email}
                        value={credentials.email}
                        onChange={(event) =>
                            handleInputCredentials(event, 'email')
                        }
                    />
                    <Input
                        icon={FiLock}
                        value={credentials.password}
                        error={errorFields?.password}
                        onChange={(event) =>
                            handleInputCredentials(event, 'password')
                        }
                        name="password"
                        type="password"
                        placeholder="Password"
                    />
                    <Button type="submit">SignIn</Button>
                    <a href="forgot">Forgot password</a>
                </form>
                <a href="forgot">
                    <FiLogIn size={16} color="#ff9000" />
                    Register for free
                </a>
            </Content>
            <Background />
        </Container>
    );
};

export default SignIn;
