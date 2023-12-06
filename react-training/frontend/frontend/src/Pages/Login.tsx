import { Box, Button, Dialog, DialogContent, DialogTitle, Grid, TextField } from '@mui/material';
import React, { useContext, useState } from 'react';
import LoginIcon from '@mui/icons-material/Login';
import PageHeader from '../component/Header';
import UserContext from '../Context/UserContext';
import axios from 'axios';
import constant from '../Constant/constant';


export default function Login() {
    const [account, setAccount] = useState('');
    const [password, setPassword] = useState('');

    const userCtx = useContext(UserContext)

    const loginHandle = () => {
        let params = {
            account: account,
            password: password
        }

        axios.get(constant.Api.account + '/login', { params })
            .then((res) => {
                if (res.data > 0) {
                    console.log("登録成功")
                    let param = {
                        id: res.data
                    }
                    axios.get(constant.Api.account + '/searchById', { params: param })
                        .then((result) => {
                            let userInfo = result.data
                            let loginTime = new Date().getTime()
                            userCtx.onLogin(userInfo.id, userInfo.account, userInfo.name, userInfo.email, loginTime)
                        })
                } else {
                    // TODO:エラー表示
                    switch (res.data) {
                        case -3: {
                            console.log("パスワードバリュエーションチェックエラー発生(パスワード不正)")
                            break;
                        }
                        case -2: {
                            console.log("アカウント不存在エラー発生(アカウント不存在)")
                            break;
                        }
                        case -1: {
                            console.log("パスワード一致チェックエラー発生(パスワード不正)")
                            break;
                        }
                        default:
                            console.log("不明なエラー");
                            break;
                    }
                }

            })
    }

    const register = () => {
        // TODO:アカウントの登録
    }

    return (
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
            <Dialog open >
                <DialogTitle>Account Login</DialogTitle>
                <DialogContent>
                    <Grid my={2} justifyContent="center" alignItems="center" direction="column" spacing={3} justifyItems="center" container>
                        <Grid item >
                            <TextField
                                size="small"
                                required
                                color="info"
                                label="account"
                                inputProps={{ maxLength: 16 }}
                                value={account}
                                onChange={(e) => setAccount(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        loginHandle()
                                    }
                                }} />
                        </Grid>
                        <Grid item >
                            <TextField
                                size="small"
                                required
                                color="info"
                                type="password"
                                label="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        loginHandle()
                                    }
                                }} />
                        </Grid>
                        <Grid item xs={12}>
                            <Grid justifyContent="center" spacing={3} container>
                                <Grid item><Button variant="contained" color='warning' fullWidth onClick={() => register()}>Register</Button></Grid>
                                <Grid item><Button variant="contained" color='success' endIcon={<LoginIcon />} onClick={() => loginHandle()} >Login</Button></Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </ DialogContent>
            </Dialog>
        </Box>

    );
};