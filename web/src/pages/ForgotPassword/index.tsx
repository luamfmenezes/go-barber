import React, { useState, useCallback } from 'react';
import { Container, Content, AnimatedContent, Background } from './styles';
import logo from '../../assets/images/logo.svg';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import * as Yup from 'yup';
import formatValidationErros from '../../utils/formatValidationErrors';
import { useToast } from '../../hooks/Toast';
import { Link } from 'react-router-dom';
import api from '../../services/api';

const ForgotPassword: React.FC = () => {
    const { addToast } = useToast();
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = useCallback(
        async (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            setEmailError('');
            try {
                const schema = Yup.object().shape({
                    email: Yup.string()
                        .email('Inválid email')
                        .required('Email is required'),
                });

                await schema.validate(
                    { email },
                    {
                        abortEarly: false,
                    },
                );

                setLoading(true);

                await api.post('/password/forgot', { email });

                addToast({
                    type: 'success',
                    title: 'Recover password',
                    description: `One email was sended to ${email} with the instructions to recover the password.`,
                });
            } catch (err) {
                if (err instanceof Yup.ValidationError) {
                    const { email } = formatValidationErros(err);
                    setEmailError(email);
                } else {
                    addToast({
                        type: 'error',
                        description: 'Was not possible send the email',
                        title: 'Recover password error',
                    });
                }
            } finally {
                setLoading(false);
            }
        },
        [email, setEmailError],
    );

    return (
        <Container>
            <Content>
                <AnimatedContent>
                    <img src={logo} alt="GoBarber" />
                    <form onSubmit={handleSubmit}>
                        <h1>Forgot password</h1>
                        <Input
                            icon={FiMail}
                            name="email"
                            placeholder="Email"
                            error={emailError}
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                        />
                        <Button loading={loading} type="submit">
                            Recover password
                        </Button>
                    </form>
                    <Link to="/">
                        <FiLogIn size={16} color="#f4ede8" />
                        Back to Login
                    </Link>
                </AnimatedContent>
            </Content>
            <Background />
        </Container>
    );
};

export default ForgotPassword;
