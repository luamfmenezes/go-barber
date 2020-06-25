import React, {
    createContext,
    useCallback,
    useState,
    useContext,
    useEffect,
} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
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
    loading: boolean;
    signIn(credentials: ICredentials): Promise<void>;
    signOut(): void;
    updateUser(user: User): void;
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

const AuthProvider: React.FC = ({children}) => {
    const [data, setData] = useState<IAuthState>({} as IAuthState);
    const [loading, setLoading] = useState(true);

    const signIn = useCallback(async ({email, password}) => {
        const response = await api.post('sessions', {email, password});
        const {token, user} = response.data;

        await AsyncStorage.multiSet([
            ['@GoBarber:token', token],
            ['@GoBarber:user', JSON.stringify(user)],
        ]);

        api.defaults.headers.authorization = `bearer ${token}`;

        setData({token, user});
    }, []);

    const signOut = useCallback(async () => {
        await AsyncStorage.multiRemove(['@GoBarber:token', '@GoBarber:user']);
        setData({} as IAuthState);
    }, []);

    useEffect(() => {
        const loadStorageData = async (): Promise<void> => {
            const [token, user] = await AsyncStorage.multiGet([
                '@GoBarber:token',
                '@GoBarber:user',
            ]);
            if (token[1] && user[1]) {
                setData({token: token[1], user: JSON.parse(user[1])});
            }
            setLoading(false);
        };
        loadStorageData();
    }, []);

    const updateUser = useCallback(
        async (user: User) => {
            setData({
                ...data,
                user,
            });
            AsyncStorage.setItem('@GoBarber:user', JSON.stringify(user));
        },
        [setData, data],
    );

    return (
        <AuthContext.Provider
            value={{user: data.user, loading, signIn, signOut, updateUser}}>
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

export {useAuth, AuthProvider};
