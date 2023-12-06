import * as React from 'react';
import { Collapse, Alert } from "@mui/material";

export default function MessageAlert(props: {
    open: boolean; icon?: any; message: string; severity?: any
}) {
    return (
        <Collapse in={props.open}>
            <Alert
                icon={props.icon}
                sx={{ mb: 2 }}
                severity={props.severity}
            >
                {props.message}
            </Alert>
        </Collapse>
    )
}