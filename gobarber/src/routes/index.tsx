import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';

const Auth = createStackNavigator();

const AuthRoutes: React.FC = () => {
    return (
        <Auth.Navigator
            screenOptions={{
                headerShown: false,
                cardStyle: {backgroundColor: '#312e38'},
            }}>
            {/* <Auth.Screen name="SignUp" component={SignUp} /> */}
            <Auth.Screen name="SignIn" component={SignIn} />
        </Auth.Navigator>
    );
};

const Routes: React.FC = () => {
    return (
        <NavigationContainer>
            <AuthRoutes />
        </NavigationContainer>
    );
};

export default Routes;
