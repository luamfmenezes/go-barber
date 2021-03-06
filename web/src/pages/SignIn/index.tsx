import React, { useState, useCallback } from 'react';
import { Container, Content, AnimatedContent, Background } from './styles';
import logo from '../../assets/images/logo.svg';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import * as Yup from 'yup';
import { useAuth } from '../../hooks/Auth';
import formatValidationErros from '../../utils/formatValidationErrors';
import { useToast } from '../../hooks/Toast';
import { Link } from 'react-router-dom';

interface ICredentials {
    email: string;
    password: string;
}

interface ICredentialError {
    email?: string;
    password?: string;
}

const SignIn: React.FC = () => {
    const { signIn } = useAuth();
    const { addToast } = useToast();
    const [loading, setLoading] = useState(false);
    const [credentials, setCredentials] = useState<ICredentials>({
        email: '',
        password: '',
    });
    const [errorFields, setErrorFields] = useState<ICredentialError>({});

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

                setLoading(true);

                await signIn(credentials);
            } catch (err) {
                if (err instanceof Yup.ValidationError) {
                    const errors = formatValidationErros(err);
                    setErrorFields(errors);
                } else {
                    addToast({
                        type: 'error',
                        description: 'Invalid credentials',
                        title: 'Login Error',
                    });
                }
            } finally {
                setLoading(false);
            }
        },
        [credentials, errorFields],
    );

    return (
        <Container>
            <Content>
                <AnimatedContent>
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
                        <Button loading={loading} type="submit">
                            SignIn
                        </Button>
                        <Link to="/forgot-password">Forgot password</Link>
                    </form>
                    <Link to="/signup">
                        <FiLogIn size={16} color="#ff9000" />
                        Register for free
                    </Link>
                </AnimatedContent>
            </Content>
            <Background />
        </Container>
    );
};

export default SignIn;
