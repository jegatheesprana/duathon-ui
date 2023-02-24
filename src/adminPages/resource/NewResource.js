import React, { useState, useMemo } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout"
import DashboardNavbar from 'examples/Navbars/DashboardNavbar'

import * as Yup from 'yup';

import MDForm from "components/Form";
import { Navigate, useNavigate, useParams } from "react-router-dom";

import useFetch from "hooks/useFetch";
import useEditData from "hooks/useEditData"

const NewResource = () => {
    const { id } = useParams()

    const [loading, setLoading] = useState(!!id)
    const [values, setValues] = useState({
        code: '',
        title: '',
        status: true
    })

    const validationSchema = Yup.object().shape({
        code: Yup.string()
            .required("Code is required"),
        title: Yup.string()
            .required("Title is required"),
        status: Yup.boolean()
            .required("Status is required")
    })

    const formItems = [
        {
            name: "code",
            label: "Code",
            required: true
        },
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
        id && '/resources/' + id,
        details => {
            if (id) {
                setValues(details)
                setLoading(false)
            }
        }
    )
    const navigate = useNavigate()
    const handlers = {
        formData: (data) => data,
        afterSubmit: () => {
            navigate('/resources')
        }
    }

    return (
        <MDForm
            formItems={formItems}
            loading={loading}
            validationSchema={validationSchema}
            method={id ? 'PUT' : 'POST'}
            action={id ? '/resources/update/' + id : '/resources'}
            values={values}
            title={id ? 'Edit Resource' : 'Add Resource'}
            handlers={handlers}
        />
    )
}

export default NewResource