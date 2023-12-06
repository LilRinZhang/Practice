import * as React from 'react';
import { styled } from '@mui/material/styles';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import constant from '../Constant/constant';
import UserContext from '../Context/UserContext';
import { useContext } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

const AppBar = styled(MuiAppBar)<MuiAppBarProps>(({ theme }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    position: "unset"
}));

const date = constant.Date.year + '年' + constant.Date.month + '月' + constant.Date.date + '日'

export default function PageHeader() {
    const userCtx = useContext(UserContext)

    return (
        <AppBar component={"header"} >
            <Toolbar sx={{
                backgroundColor: "#429cf5",
            }}>
                <Typography variant="inherit" sx={{ flexGrow: 1 }} component="div">
                    Customer Management System
                </Typography>
                {
                    userCtx.userInfo.id > 0 && <>
                        <AccountCircleIcon />
                        <Typography sx={{ mr: 2 }} color="inherit">{userCtx.userInfo.name}</Typography>
                    </>
                }
                <CalendarMonthIcon />
                <Typography color="inherit">{date}</Typography>
            </Toolbar>
        </AppBar>
    )
}
