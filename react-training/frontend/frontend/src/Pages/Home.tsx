import React, { useState, useEffect } from 'react';
import DataTable from "react-data-table-component";
import FilterListIcon from '@mui/icons-material/FilterList';
import { Button, Card, CardHeader } from "@mui/material";
import axios from 'axios';
import constant from '../Constant/constant';
import InfoIcon from '@mui/icons-material/Info';
import MessageAlert from '../component/MessageAlert';
import ConfirmDialog from '../component/ConfirmDialog';
import GppBadIcon from '@mui/icons-material/GppBad';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import UpdateModel from '../Modal/Update';

export default function Home() {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomers, setSelectedCustomers] = useState<any[]>([]);
  const [open, setOpen] = useState({
    showConfirm: false,
    showWarn: false,
    showSuccess: false,
    showFail: false,
    failMsg: "",
    successMsg: ""
  });
  const [isUpdateOpen, setIsUpdateOpen] = useState(false)
  const [updateData, setUpdateData] = useState({
    id: 0,
    name: "",
    phone: "",
    email: ""
  })

  const columns = [
    {
      name: "CustomerId",
      selector: (row: any) => row.id,
      sortable: true,
    },
    {
      name: "Name",
      selector: (row: any) => row.name,
      sortable: true,
    },
    {
      name: "CustomerPhoneNumber",
      selector: (row: any) => row.phone,
      sortable: true,
    },
    {
      name: "CustomerEmail",
      selector: (row: any) => row.email,
      sortable: true,
    },
    {
      name: 'Edit',
      button: true,
      cell: (row: any) => (
        <Button
          variant="contained"
          size="small"
          color="primary"
          onClick={() => {
            edit(row)
          }}
        >
          Edit
        </Button>
      )
    },
  ]

  const edit = (row: any) => {
    // updateData.current = row
    setUpdateData({
      id: row.id,
      name: row.name,
      phone: row.phone,
      email: row.email
    })

    setIsUpdateOpen(true)
    console.log(updateData)
  }

  const openClear = () => {
    setTimeout(() => {
      setOpen({
        showConfirm: false,
        showWarn: false,
        showSuccess: false,
        showFail: false,
        failMsg: "",
        successMsg: ""
      })
      retrieveAllCustomers()
    }, 3000)
  }

  const retrieveAllCustomers = () => {
    axios.get(constant.Api.customer + '/retrieve').then((res) => {
      setCustomers(() => res.data)
    })
  }

  useEffect(() => {
    retrieveAllCustomers()
  }, []);

  const handleDelete = () => {
    // Todo:there is something wrong with showing successMsg because the selectedRows would contain the deleted rows.
    const deleteCustomers = selectedCustomers.map(c => c.name)
    // console.log(selectedCustomers.map(c => c.name).join(", "))
    selectedCustomers.forEach(c => {
      axios.post(constant.Api.customer + '/delete', { id: c.id })
        .catch(function () {
          setOpen(
            {
              ...open,
              showFail: true,
              failMsg: "It's failed to delete this Customer : " + c.name
            }
          )
          openClear()
          return
        })
    })
    setOpen(
      {
        ...open,
        showSuccess: true,
        showConfirm: false,
        successMsg: "These customers have been deleted : " + deleteCustomers.join(", ")
      }
    )
    console.log(open.successMsg)
    openClear()
    setSelectedCustomers([])
  }

  const handleDeleteComfirmOpen = () => {
    console.log(selectedCustomers.map(c => c.name))
    if (selectedCustomers.length > 0) {
      setOpen(
        {
          ...open,
          showConfirm: true
        }
      )
    }
    else {
      setOpen(
        {
          ...open,
          showWarn: true
        }
      )
      openClear()
    }
  }

  const handleDeleteConfirmClose = () => {
    setOpen(
      {
        ...open,
        showConfirm: false
      }
    )
  }

  return (
    <Card sx={{
      minHeight: "90vh",
      maxHeight: "90vh",
      minWidth: "160vh",
      overflow: 'auto'
    }}>
      <CardHeader title="Customers" action={
        <Button aria-label="delete" variant='contained' color='error' onClick={() => { handleDeleteComfirmOpen() }}>
          Delete
        </Button>
      } />
      <ConfirmDialog
        open={open.showConfirm}
        handleCancel={handleDeleteConfirmClose}
        handleAgree={handleDelete}
        title="Confirm Delete"
        contentText="Are you sure to Delete the Customers?"
      />
      <MessageAlert open={open.showWarn} icon={<InfoIcon fontSize="inherit" />} severity='warning' message='There is no selected customer!' />
      <MessageAlert open={open.showFail} icon={<GppBadIcon fontSize="inherit" />} severity='error' message={open.failMsg} />
      <MessageAlert open={open.showSuccess} icon={<DoneAllIcon fontSize="inherit" />} message={open.successMsg} />
      {(customers.length === 0) ? <MessageAlert
        open
        icon={<InfoIcon fontSize="inherit" />} severity='error'
        message='There is no data!'
      /> :
        <><DataTable
          data={customers}
          columns={columns}
          sortIcon={<FilterListIcon />}
          defaultSortFieldId="customerId"
          pagination selectableRows
          selectableRowsHighlight
          clearSelectedRows
          highlightOnHover
          onSelectedRowsChange={(selected) => {
            setSelectedCustomers(selected.selectedRows)
          }}
        />
          <UpdateModel
            isOpen={isUpdateOpen}
            setIsOpen={setIsUpdateOpen}
            rowData={updateData}
            retriveAllCustomers={() => retrieveAllCustomers()}
          />
        </>
      }
    </Card>
  )
}