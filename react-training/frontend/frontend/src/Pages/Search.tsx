import React, { useState } from 'react';
import DataTable from "react-data-table-component";
import FilterListIcon from '@mui/icons-material/FilterList';
import { Box, Button, Card, CardContent, FormControl, IconButton, Input, InputAdornment, InputLabel, Stack, Typography } from "@mui/material";
import axios from 'axios';
import constant from '../Constant/constant';
import SearchIcon from '@mui/icons-material/Search';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import MessageAlert from '../component/MessageAlert';
import ErrorIcon from '@mui/icons-material/Error';

export default function Search() {
    const [customers, setCustomers] = useState([]);
    const [filterText, setFilterText] = useState("");
    const [showInfo, setShowInfo] = useState(false);
    const [showError, setShowError] = useState(false);

    const handleSearch = () => {
        axios.get(constant.Api.customer + '/search', {
            params: {
                keyword: filterText
            }
        }).then((res) => {
            setShowError(false)
            if (res.data.length === 0) {
                setShowInfo(true)
            }
            else {
                setShowInfo(false)
            }
            setCustomers(res.data)
        }).catch(function () {
            setShowError(true)
        })
    }

    return (
        <Card sx={{
            minHeight: "90vh",
            maxHeight: "90vh",
            minWidth: "160vh"
        }}>
            <Box sx={{
                margin: 3,
            }}>
                <MessageAlert open={showInfo} icon={<ErrorIcon fontSize="inherit" />} severity='warning' message="Can't find the target customer, Please input the correct keyword again!" />
                <MessageAlert open={showError} icon={<ErrorIcon fontSize="inherit" />} severity='error' message="Reason:Todo" />
                <Stack direction="row">
                    <FormControl variant="standard">
                        <InputLabel htmlFor="input-with-icon-adornment">
                            Please input the keyword of customer:
                        </InputLabel>
                        <Input
                            error={showInfo}
                            id="input-with-icon-adornment"
                            startAdornment={
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            }
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton size='small' onClick={() => {
                                        setFilterText("")
                                    }}><HighlightOffIcon /></IconButton>
                                </InputAdornment>
                            }
                            value={filterText}
                            onChange={(e) => {
                                setFilterText(e.target.value)
                            }}
                            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                                if (e.nativeEvent.isComposing || e.key !== 'Enter') return
                                handleSearch()
                            }}
                        />
                    </FormControl>
                    <Button
                        size='small'
                        variant='contained'
                        onClick={() => { handleSearch() }}
                        sx={{
                            margin: 2
                        }}
                    >
                        Search
                    </Button>
                </Stack>
            </Box>
            {customers.length !== 0 && <>
                <CardContent>
                    <Typography variant="h5" >
                        Result
                    </Typography>
                </CardContent>
                <Card sx={{
                    minHeight: "65vh",
                    maxHeight: "65vh",
                    minWidth: "160vh",
                    overflow: "auto"
                }}>
                    <DataTable
                        data={customers}
                        columns={constant.customerColums}
                        sortIcon={<FilterListIcon />}
                        fixedHeader
                        defaultSortFieldId="customerId"
                        pagination
                    />
                </Card>
            </>
            }
        </Card>
    );

}