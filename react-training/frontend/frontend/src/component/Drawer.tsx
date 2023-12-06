import * as React from 'react';
import { styled, Theme, CSSObject } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MuiListItemButton from "@mui/material/ListItemButton";
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import LogoutIcon from '@mui/icons-material/Logout';
import {
    Link as RouterLink,
    LinkProps as RouterLinkProps
} from "react-router-dom";
import { Divider } from '@mui/material';
import UserContext from '../Context/UserContext';

const drawerWidth = 180;

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

const ListItemButton = (props: React.PropsWithChildren<RouterLinkProps>) => {
    const { to, children, ...rest } = props;
    return (
        <MuiListItemButton component={RouterLink} to={to} {...rest}>
            {children}
        </MuiListItemButton>
    );
};

export default function PageDrawer() {
    const userCtx = React.useContext(UserContext)
    const [open, setOpen] = React.useState(false);
    const toggleDrawer = () => {
        setOpen(!open);
    }
    function DrawerHead() {
        return (
            <DrawerHeader><IconButton onClick={toggleDrawer}
                edge="start"
                sx={{
                    color: 'white'
                }}>
                {open ? <ChevronLeftIcon /> : <MenuIcon />}
            </IconButton>
            </DrawerHeader>
        )
    }
    return (
        <Drawer variant="permanent" open={open} PaperProps={{
            sx: {
                backgroundColor: "#429cf5"
            },
        }}>
            <DrawerHead />
            <List>
                <ListItem disablePadding sx={{ display: 'block' }}>
                    <ListItemButton
                        to="/"
                    >
                        <ListItemIcon
                            sx={{
                                minWidth: 0,
                                mr: open ? 3 : 'auto',
                                justifyContent: 'center',
                                color: 'white'
                            }}
                        >
                            {<PeopleAltIcon />}
                        </ListItemIcon>
                        <ListItemText primary={"Home"} sx={{ opacity: open ? 1 : 0, color: 'white' }} />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding sx={{ display: 'block' }}>
                    <ListItemButton
                        to="/search"
                    >
                        <ListItemIcon
                            sx={{
                                minWidth: 0,
                                mr: open ? 3 : 'auto',
                                justifyContent: 'center',
                                color: 'white'
                            }}
                        >
                            {<PersonSearchIcon />}
                        </ListItemIcon>
                        <ListItemText primary={"Search"} sx={{ opacity: open ? 1 : 0, color: 'white' }} />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding sx={{ display: 'block' }}>
                    <ListItemButton
                        to="/create"
                    >
                        <ListItemIcon
                            sx={{
                                minWidth: 0,
                                mr: open ? 3 : 'auto',
                                justifyContent: 'center',
                                color: 'white'
                            }}
                        >
                            {<PersonAddAlt1Icon />}
                        </ListItemIcon>
                        <ListItemText primary={"Create"} sx={{ opacity: open ? 1 : 0, color: 'white' }} />
                    </ListItemButton>
                </ListItem>
                <Divider />
                <ListItem disablePadding sx={{ display: 'block' }}>
                    <ListItemButton
                        to="/"
                        onClick={
                            // console.log("logout")
                            () => { userCtx.onLogout() }
                        }
                    >
                        <ListItemIcon
                            sx={{
                                minWidth: 0,
                                mr: open ? 3 : 'auto',
                                justifyContent: 'center',
                                color: 'white'
                            }}
                        >
                            {<LogoutIcon />}
                        </ListItemIcon>
                        <ListItemText primary={"Logout"} sx={{ opacity: open ? 1 : 0, color: 'white' }} />
                    </ListItemButton>
                </ListItem>
            </List>
        </Drawer >
    )
}