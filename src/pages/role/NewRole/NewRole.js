import React, { useState, useMemo } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import permissionsList from "assets/data/premissions";

import * as Yup from 'yup';

import MDForm from "components/Form";

import { Stack, Grid, FormGroup, FormControlLabel, Checkbox } from "@mui/material";
import PermissionItem from "./PermissionItem";

import useEditData from "hooks/useEditData"

const permissionsState = {}

Object.keys(permissionsList).map(key => {
    permissionsState[key] = permissionsList[key].items.reduce((acc, cur) => {
        acc[cur.value] = false
        return acc
    }, {})
})

const NewRole = () => {
    const { id } = useParams()

    const [loading, setLoading] = useState(!!id)
    const [values, setValues] = useState({
        title: '',
        status: true
    })
    const [permissions, setPermissions] = useState({ ...permissionsState })

    const validationSchema = Yup.object().shape({
        title: Yup.string()
            .required("Title is required"),
        status: Yup.boolean()
            .required("Status is required")
    })

    const formItems = [
        {
            name: "title",
            label: "Title",
            required: true
        },
        {
            name: "status",
            label: "Status",
            required: true,
            check: true
        },
    ]

    useEditData(
        id && '/roles/' + id,
        ({ permissions = [], ...details }) => {
            if (id) {
                setValues(details)
                setPermissions(({ ..._permissions }) => {
                    Object.keys(_permissions).forEach(key => {
                        Object.keys(_permissions[key]).forEach(innerKey => {
                            if (permissions.includes(innerKey)) {
                                _permissions[key][innerKey] = true
                            } else {
                                _permissions[key][innerKey] = false
                            }
                        })
                    })
                    return _permissions
                })
                setLoading(false)
            }
        }
    )

    const navigate = useNavigate()
    const handlers = {
        formData: (data) => {
            const permissionsArray = Object.keys(permissions).reduce((acc, cur) => {
                const innerArray = Object.keys(permissions[cur]).reduce((innerAcc, innerCur) => {
                    if (permissions[cur][innerCur]) {
                        return [...innerAcc, innerCur]
                    }
                    return innerAcc
                }, [])
                return [...acc, ...innerArray]
            }, [])
            return { ...data, permissions: permissionsArray }
        },
        afterSubmit: () => {
            navigate('/roles')
        }
    }

    return (
        <MDForm
            formItems={formItems}
            loading={loading}
            validationSchema={validationSchema}
            method={id ? 'PUT' : 'POST'}
            action={id ? '/roles/update/' + id : '/roles'}
            values={values}
            title={id ? 'Edit Role' : 'Add Role'}
            handlers={handlers}
        >
            <Stack spacing={3} p={2}>
                <Grid container spacing={2}>
                    {Object.keys(permissions).map(key => (
                        <PermissionItem key={key} permissions={permissions} setPermissions={setPermissions} name={key} label={permissionsList[key].label} items={permissionsList[key].items} />
                    ))}
                </Grid>
            </Stack>
        </MDForm>
    )
}

export default NewRole