import { Box, Button, Grid, TextField } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import constant from '../Constant/constant';
import ConfirmDialog from '../component/ConfirmDialog'
import CheckIcon from '@mui/icons-material/Check';
import MessageAlert from '../component/MessageAlert';
import ErrorIcon from '@mui/icons-material/Error';

export default function Create() {
    const [newCustomer, setNewCustomer] = useState(
        {
            name: "",
            phoneNumber: "",
            email: ""
        }
    )

    const clear = () => {
        setNewCustomer(
            {
                name: "",
                phoneNumber: "",
                email: ""
            }
        )
    }

    // 入力バリエーションチェック(暫定案)
    const vaild = () => {
        let result = {
            resultName: newCustomer.name === "" || newCustomer.name === null,
            resultPhone: newCustomer.phoneNumber === "" || newCustomer.phoneNumber === null,
            resultEmail: newCustomer.email === "" || newCustomer.email === null
        }
        setVaildError({
            nameError: result.resultName,
            phoneError: result.resultPhone,
            emailError: result.resultEmail
        })
        Object.values(result).includes(true) === false && setOpen({
            ...open,
            showConfirm: true
        })
    }

    const handleCreate = () => {
        const param = {
            id: 0,
            name: newCustomer.name,
            phone: newCustomer.phoneNumber,
            email: newCustomer.email
        }

        axios.post(constant.Api.customer + '/create', param)
            .then(function () {
                setOpen({
                    ...open,
                    showConfirm: false,
                    showSuccess: true
                })
                setTimeout(function () {
                    setOpen({
                        showConfirm: false,
                        showSuccess: false,
                        showError: false
                    })
                }, 3000
                )
                clear()
            })
            .catch(function () {
                setOpen({
                    ...open,
                    showConfirm: false,
                    showError: true
                })
                setTimeout(function () {
                    setOpen({
                        showConfirm: false,
                        showSuccess: false,
                        showError: false
                    })
                }, 3000
                )
            })
    }

    const [vaildError, setVaildError] = useState({
        nameError: false,
        phoneError: false,
        emailError: false,
    })

    const [open, setOpen] = useState({
        showConfirm: false,
        showSuccess: false,
        showError: false
    });

    const handleConfirmClose = () => {
        setOpen({
            ...open,
            showConfirm: false
        })
    };

    return (<>
        <MessageAlert open={open.showSuccess} icon={<CheckIcon fontSize="inherit" />} message=' Customer has been created successfully!' />
        <MessageAlert open={open.showError} icon={<ErrorIcon fontSize="inherit" />} severity='error' message=' Error:TODO' />
        <Box component="form" sx={{
            p: 3,
            width: 300,
            height: 450,
            margin: "auto",
            backgroundColor: "background.default",
            // '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}>
            <Grid my={2} justifyContent="center" spacing={3} container>
                <Grid item>
                    <TextField
                        required
                        error={vaildError.nameError}
                        helperText={vaildError.nameError ? ("入力された値に誤りがあります") : null}
                        id="outlined-required"
                        label="Name"
                        color="info"
                        value={newCustomer.name}
                        inputProps={{ maxLength: 30, pattern: "^[a-zA-Z]+$" }}
                        onChange={(e) => {
                            e.preventDefault()
                            setNewCustomer({
                                ...newCustomer,
                                name: e.target.value
                            })
                        }}
                    />
                </Grid>
                <Grid item>
                    <TextField
                        required
                        id="outlined-required"
                        label="PhoneNumber"
                        error={vaildError.phoneError}
                        helperText={vaildError.phoneError ? ("入力された値に誤りがあります") : null}
                        inputProps={{ maxLength: 11, pattern: "^[0-9]+$" }}
                        color="info"
                        value={newCustomer.phoneNumber}
                        onChange={(e) => {
                            e.preventDefault()
                            setNewCustomer({
                                ...newCustomer,
                                phoneNumber: e.target.value
                            })
                        }}
                    />
                </Grid>
                <Grid item>
                    <TextField
                        required
                        error={vaildError.emailError}
                        helperText={vaildError.emailError ? ("入力された値に誤りがあります") : null}
                        id="outlined-required"
                        label="Email"
                        color="info"
                        inputProps={{ maxLength: 30 }}
                        value={newCustomer.email}
                        onChange={(e) => {
                            e.preventDefault()
                            setNewCustomer({
                                ...newCustomer,
                                email: e.target.value
                            })
                        }}
                    />
                </Grid>
                <Grid item>
                    <Grid justifyContent="center" spacing={3} container>
                        <Grid item><Button variant="contained" color='warning' fullWidth onClick={() => { clear() }}>Refresh</Button></Grid>
                        <Grid item><Button variant="contained" color='success' onClick={() => { vaild() }}>Create</Button></Grid>
                    </Grid>
                </Grid>
            </Grid>
            <ConfirmDialog
                open={open.showConfirm}
                handleCancel={handleConfirmClose}
                handleAgree={handleCreate}
                title="Confirm"
                contentText="Are you sure to Create the Customer?"
            />
        </Box >
    </>
    )
}