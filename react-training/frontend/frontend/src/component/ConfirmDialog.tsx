// confirm用のダイアログ
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function ConfirmDialog(props:
    { open: boolean; handleCancel: () => void; handleAgree: () => void; title: String; contentText: String; children?: any },
) {
    return (
        <Dialog
            open={props.open}
            onClose={props.handleCancel}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {props.title}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {props.contentText}
                </DialogContentText>
            </DialogContent>
            <DialogContent>{props.children}</DialogContent>
            <DialogActions>
                <Button variant="contained" color='warning' onClick={() => { props.handleCancel() }}>Cancel</Button>
                <Button variant="contained" color='success' onClick={() => { props.handleAgree() }} autoFocus>
                    Yes
                </Button>
            </DialogActions>
        </Dialog>
    )
}