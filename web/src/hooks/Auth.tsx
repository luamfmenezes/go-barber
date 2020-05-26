import React, { createContext, useCallback, useState, useContext } from 'react';
import api from '../services/api';

interface User {
    id: string;
    avatar_url: string;
    name: string;
    email: string;
}

interface IAuthState {
    user: User;
    token: string;
}

interface ICredentials {
    email: string;
    password: string;
}

interface IAuthContext {
    user: User;
    signIn(credentials: ICredentials): Promise<void>;
    signOut(): void;
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

const AuthProvider: React.FC = ({ children }) => {
    const [data, setData] = useState<IAuthState>(() => {
        const token = localStorage.getItem('@GoBarber:token');
        const user = localStorage.getItem('@GoBarber:user');

        if (user && token) {
            api.defaults.headers.authorization = `bearer ${token}`;
            return { user: JSON.parse(user), token };
        }

        return {} as IAuthState;
    });

    const signIn = useCallback(async ({ email, password }) => {
        const response = await api.post('sessions', { email, password });
        const { token, user } = response.data;

        localStorage.setItem('@GoBarber:token', token);
        localStorage.setItem('@GoBarber:user', JSON.stringify(user));

        api.defaults.headers.authorization = `bearer ${token}`;

        setData({ token, user });
    }, []);

    const signOut = useCallback(async () => {
        localStorage.removeItem('@GoBarber:token');
        localStorage.removeItem('@GoBarber:user');
        setData({} as IAuthState);
    }, []);

    return (
        <AuthContext.Provider value={{ user: data.user, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};

function useAuth(): IAuthContext {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error(
            'You should execute this hook only inside of one react component',
        );
    }
    return context;
}

export { useAuth, AuthProvider };
