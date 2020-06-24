import 'react-native-gesture-handler';

import React from 'react';
import {View, StatusBar} from 'react-native';

import Routes from './routes';

const App: React.FC = () => {
    return (
        <>
            <StatusBar barStyle="light-content" backgroundColor="#312e38" />
            <Routes />
        </>
    );
};

export default App;
