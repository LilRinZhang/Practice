import * as React from 'react';
import { Box, Grid } from '@mui/material';
import { Outlet } from 'react-router-dom';
import PageDrawer from '../component/Drawer';
import PageHeader from '../component/Header';

export default function Header() {
    return (<>
        <PageDrawer />
        <Box component="main" sx={{
            backgroundColor: (theme) =>
                theme.palette.mode === "light"
                    ? theme.palette.grey[100]
                    : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "hidden"
        }}>
            <PageHeader />
            <Grid container alignItems="center" justifyContent="center" height={"91vh"} overflow={"auto"} >
                <Grid item>
                    <React.Suspense fallback={<div>Loading...</div>}>
                        <Outlet />
                    </React.Suspense>
                </Grid>
            </Grid>
        </Box>
    </>
    );
}