import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material';
import Layout from './Layout';
import { UserContextProvider } from './Context/UserContext';


function App() {
    const theme = createTheme();
    return (
        <UserContextProvider>
            <ThemeProvider theme={theme}>
                <Layout />
            </ThemeProvider>
        </UserContextProvider>
    );
}
export default App;