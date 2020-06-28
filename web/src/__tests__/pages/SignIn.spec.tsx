import React from 'react';
import SignIn from '../../pages/SignIn';
import { render, fireEvent, wait } from '@testing-library/react';

const mockedSignIn = jest.fn();
const mockedToast = jest.fn();

jest.mock('react-router-dom', () => {
    return {
        useHistory: () => ({
            push: () => {},
        }),
        Link: ({ children }: { children: React.ReactNode }) => children,
    };
});

jest.mock('../../hooks/Toast', () => {
    return {
        useToast: () => ({
            addToast: mockedToast,
        }),
    };
});

jest.mock('../../hooks/Auth', () => {
    return {
        useAuth: () => ({
            signIn: mockedSignIn,
        }),
    };
});

describe('SignIn Page', () => {
    beforeEach(() => {
        mockedSignIn.mockClear();
        mockedToast.mockClear();
    });

    it('should be able to sign in', async () => {
        const { getByPlaceholderText, getByText } = render(<SignIn />);

        const emailField = getByPlaceholderText('Email');
        const passwordField = getByPlaceholderText('Password');
        const submitButton = getByText('SignIn');

        fireEvent.change(emailField, { target: { value: 'jhondoe@test.com' } });
        fireEvent.change(passwordField, { target: { value: '123123' } });

        fireEvent.click(submitButton);

        await wait(() => {
            expect(mockedSignIn).toHaveBeenCalledWith({
                email: 'jhondoe@test.com',
                password: '123123',
            });
        });
    });
    it('should not be able to sign in with invalid credentials', async () => {
        const { getByPlaceholderText, getByText } = render(<SignIn />);

        const emailField = getByPlaceholderText('Email');
        const passwordField = getByPlaceholderText('Password');
        const submitButton = getByText('SignIn');

        fireEvent.change(emailField, { target: { value: '12312312' } });
        fireEvent.change(passwordField, { target: { value: '123123' } });

        fireEvent.click(submitButton);

        await wait(() => {
            expect(mockedSignIn).not.toHaveBeenCalled();
        });
    });
    it('should dispatch a toast if login fail', async () => {
        mockedSignIn.mockRejectedValue(() => {
            throw new Error();
        });
        const { getByPlaceholderText, getByText } = render(<SignIn />);

        const emailField = getByPlaceholderText('Email');
        const passwordField = getByPlaceholderText('Password');
        const submitButton = getByText('SignIn');

        fireEvent.change(emailField, {
            target: { value: 'luamfmenezes@gmail.com' },
        });
        fireEvent.change(passwordField, { target: { value: '123123' } });

        fireEvent.click(submitButton);

        await wait(() => {
            expect(mockedToast).toHaveBeenCalled();
        });
    });
});
