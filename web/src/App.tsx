import React from 'react';
import GlobalStyle from './styles/global';

import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

import AppProvider from './hooks';

const App: React.FC = () => {
    return (
        <div className="App">
            <AppProvider>
                <SignIn />
            </AppProvider>
            <GlobalStyle />
        </div>
    );
};

export default App;
