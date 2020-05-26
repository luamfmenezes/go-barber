import React, { useState, useCallback, useEffect } from 'react';
import { Container, Content, AnimatedContent, Background } from './styles';
import logo from '../../assets/images/logo.svg';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { FiLogIn, FiLock } from 'react-icons/fi';
import * as Yup from 'yup';
import formatValidationErros from '../../utils/formatValidationErrors';
import { useToast } from '../../hooks/Toast';
import { Link, useLocation, useHistory } from 'react-router-dom';
import api from '../../services/api';
import { QueryToJson } from '../../utils/convertQueryJSON';

interface ICredentials {
    password_confirmation: string;
    password: string;
}

interface ICredentialError {
    password_confirmation?: string;
    password?: string;
}

const ResetPassword: React.FC = () => {
    const { addToast } = useToast();
    const { search } = useLocation();
    const [loading, setLoading] = useState(false);
    const history = useHistory();
    const [credentials, setCredentials] = useState<ICredentials>({
        password_confirmation: '',
        password: '',
    });
    const [errorFields, setErrorFields] = useState<ICredentialError>({});

    const [passwrodsMatche, setPasswordMatches] = useState('');

    useEffect(() => {
        if (credentials.password === credentials.password_confirmation) {
            setPasswordMatches('');
        } else {
            setPasswordMatches('The passwords dont match');
        }
    }, [credentials]);

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
                    password: Yup.string().min(
                        6,
                        'New password must be a least 6 caracters',
                    ),
                    password_confirmation: Yup.string().oneOf(
                        [Yup.ref('password')],
                        'The passwords must match',
                    ),
                });

                await schemaCredentitials.validate(credentials, {
                    abortEarly: false,
                });

                setLoading(true);

                const { token } = QueryToJson(search);

                if (!token) {
                    throw new Error();
                }

                await api.post('/password/reset', { ...credentials, token });

                addToast({
                    type: 'success',
                    description: 'Your password was reseted with success.',
                    title: 'Password reseted',
                });

                history.push('/');
            } catch (err) {
                if (err instanceof Yup.ValidationError) {
                    const errors = formatValidationErros(err);
                    setErrorFields(errors);
                } else {
                    addToast({
                        type: 'error',
                        description: 'Was impossible to reset your password.',
                        title: 'Reset password error',
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
                        <h1>Reset Password</h1>
                        <Input
                            icon={FiLock}
                            value={credentials.password}
                            error={errorFields?.password}
                            onChange={(event) =>
                                handleInputCredentials(event, 'password')
                            }
                            name="password"
                            type="password"
                            placeholder="New password"
                        />
                        <Input
                            icon={FiLock}
                            value={credentials.password_confirmation}
                            error={passwrodsMatche}
                            onChange={(event) =>
                                handleInputCredentials(
                                    event,
                                    'password_confirmation',
                                )
                            }
                            name="password"
                            type="password"
                            placeholder="Confirm password"
                        />
                        <Button loading={loading} type="submit">
                            Reset
                        </Button>
                    </form>
                    <Link to="/signin">
                        <FiLogIn size={16} color="#ff9000" />
                        Back to Login
                    </Link>
                </AnimatedContent>
            </Content>
            <Background />
        </Container>
    );
};

export default ResetPassword;
