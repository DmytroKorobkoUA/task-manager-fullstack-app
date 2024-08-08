import React from 'react';
import './App.css';
import AppRoutes from './routes/AppRoutes';
import { ApolloProvider } from '@apollo/client';
import client from './apolloClient';

function App() {
    return (
        <ApolloProvider client={client}>
            <div className="App">
                <header className="App-header">
                    <AppRoutes />
                </header>
            </div>
        </ApolloProvider>
    );
}

export default App;
