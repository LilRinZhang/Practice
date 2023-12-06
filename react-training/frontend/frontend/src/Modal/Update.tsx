import React, { useEffect, useState } from 'react';
import { Button, Grid, TextField, Modal, Box } from '@mui/material';
import axios from 'axios';
import constant from '../Constant/constant';
import ConfirmDialog from '../component/ConfirmDialog';
import CheckIcon from '@mui/icons-material/Check';
import MessageAlert from '../component/MessageAlert';
import ErrorIcon from '@mui/icons-material/Error';

export default function UpdateModel(props: {
    setIsOpen: (arg0: boolean) => void; isOpen: boolean; rowData: { id: number, name: string, phone: string, email: string }; retriveAllCustomers: () => void;
}) {
    const handleUpdate = () => {
        console.log(customer)
        const param = {
            id: props.rowData.id,
            name: customer.name,
            phone: customer.phoneNumber,
            email: customer.email
        }
        axios.post(constant.Api.customer + '/update', param)
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
                    modalIsClose()
                    props.retriveAllCustomers()
                }, 3000
                )
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

    const [customer, setCustomer] = useState({
        id: 0,
        name: "",
        phoneNumber: "",
        email: ""
    })

    useEffect(() => {
        setCustomer({
            id: props.rowData.id,
            name: props.rowData.name,
            phoneNumber: props.rowData.phone,
            email: props.rowData.email
        })
    }, [props.rowData])

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

    const [vaildError, setVaildError] = useState({
        nameError: false,
        phoneError: false,
        emailError: false,
    })

    // 入力バリエーションチェック(暫定案)
    const vaild = () => {
        let result = {
            resultName: customer.name === "" || customer.name === null,
            resultPhone: customer.phoneNumber === "" || customer.phoneNumber === null,
            resultEmail: customer.email === "" || customer.email === null
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

    const modalIsClose = () => {
        props.setIsOpen(false)
        setVaildError({
            nameError: false,
            phoneError: false,
            emailError: false,
        })
    }

    return (
        <Modal open={props.isOpen}
            onClose={modalIsClose}
            sx={{
                top: '15%',
                left: '40%',
                right: '40%',
                bottom: '15%',
            }}
        ><>
                <MessageAlert open={open.showSuccess} icon={<CheckIcon fontSize="inherit" />} message=' Customer has been update successfully!' />
                <MessageAlert open={open.showError} icon={<ErrorIcon fontSize="inherit" />} severity='error' message=' Error:TODO' />
                <Box sx={{
                    border: 'solid #429cf5',
                    position: 'revert',
                    width: 300,
                    height: 400,
                    marginTop: 4,
                    backgroundColor: "background.default",
                }}>
                    <Grid my={3} justifyContent="center" spacing={4} container>
                        <Grid item>
                            <TextField
                                required
                                error={vaildError.nameError}
                                helperText={vaildError.nameError ? ("入力された値に誤りがあります") : null}
                                id="outlined-required"
                                label="Name"
                                color="info"
                                value={customer.name}
                                inputProps={{ maxLength: 30, pattern: "^[a-zA-Z]+$" }}
                                onChange={(e) => {
                                    e.preventDefault()
                                    setCustomer({
                                        ...customer,
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
                                value={customer.phoneNumber}
                                onChange={(e) => {
                                    e.preventDefault()
                                    setCustomer({
                                        ...customer,
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
                                value={customer.email}
                                onChange={(e) => {
                                    e.preventDefault()
                                    setCustomer({
                                        ...customer,
                                        email: e.target.value
                                    })
                                }}
                            />
                        </Grid>
                        <Grid item>
                            <Grid justifyContent="center" spacing={3} container>
                                <Grid item><Button variant="contained" color='warning' fullWidth onClick={() => { modalIsClose() }}>Cancel</Button></Grid>
                                <Grid item><Button variant="contained" color='success' onClick={() => { vaild() }}>Update</Button></Grid>
                            </Grid>
                        </Grid>
                        <ConfirmDialog
                            open={open.showConfirm}
                            handleCancel={handleConfirmClose}
                            handleAgree={handleUpdate}
                            title="Confirm"
                            contentText="Are you sure to update the Customer?"
                        />
                    </Grid>
                </Box></>
        </Modal>
    )
}