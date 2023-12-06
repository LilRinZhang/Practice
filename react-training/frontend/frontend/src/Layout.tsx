import React, { useContext } from 'react';
import Header from "./Pages/Header";
import { Box, CssBaseline } from '@mui/material';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import Search from './Pages/Search';
import Create from './Pages/Create';
import UserContext from './Context/UserContext';
import Login from './Pages/Login';

export default function Layout() {
    const userCtx = useContext(UserContext)
    return <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <BrowserRouter>
            <Routes>
                {userCtx.isLogined ? <Route path="/" element={<Header />}>
                    <Route index element={<Home />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/create" element={<Create />} />
                </Route> : <Route path="/" element={<Login />} />}
            </Routes>
        </BrowserRouter>
    </Box>
}