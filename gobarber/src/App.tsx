import 'react-native-gesture-handler';

import React from 'react';
import {View, StatusBar} from 'react-native';
import AppProvider from './hooks';
import Routes from './routes';

const App: React.FC = () => {
    return (
        <View style={{flex: 1, backgroundColor: '#312e38'}}>
            <StatusBar barStyle="light-content" backgroundColor="#28262e" />
            <AppProvider>
                <Routes />
            </AppProvider>
        </View>
    );
};

export default App;
