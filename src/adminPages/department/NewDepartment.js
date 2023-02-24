import React, { useState, useMemo } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout"
import DashboardNavbar from 'examples/Navbars/DashboardNavbar'

import * as Yup from 'yup';

import MDForm from "components/Form";
import { useParams, useNavigate } from "react-router-dom";

import useFetch from "hooks/useFetch";
import useEditData from "hooks/useEditData"

const NewDepartment = () => {
    const { id } = useParams()

    const [loading, setLoading] = useState(!!id)
    const [values, setValues] = useState({
        code: '',
        title: '',
        description: ''
    })



    const validationSchema = Yup.object().shape({
        code: Yup.string()
            .required("Department code is required"),
        title: Yup.string()
            .required("Title is required"),
        description: Yup.string()
            .required("Description is required"),

    })

    const formItems = [
        {
            name: "code",
            label: "Department code",
            required: true
        },
        {
            name: "title",
            label: "Title",
            required: true
        },
        {
            name: "description",
            label: "Description",
            required: true,
            fullwidth: true,
            multiline: true,
            rows: 4,
        }
    ]

    useEditData(
        id && '/departments/' + id,
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
            navigate('/departments')
        }
    }

    return (
        <MDForm
            formItems={formItems}
            loading={loading}
            validationSchema={validationSchema}
            method={id ? 'PUT' : 'POST'}
            action={id ? '/departments/update/' + id : '/departments'}
            values={values}
            title={id ? 'Edit Department' : 'Add Department'}
            handlers={handlers}
        />
    )
}

export default NewDepartment