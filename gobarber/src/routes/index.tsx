import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {ActivityIndicator, View} from 'react-native';
import {useAuth} from '../hooks/Auth';

import AuthRoutes from './auth.routes';
import AppRoutes from './app.routes';

const Routes: React.FC = () => {
    const {user, loading} = useAuth();

    if (loading) {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                <ActivityIndicator size="large" color="#ff9700" />
            </View>
        );
    }
    return (
        <NavigationContainer>
            {user ? <AppRoutes /> : <AuthRoutes />}
        </NavigationContainer>
    );
};

export default Routes;
