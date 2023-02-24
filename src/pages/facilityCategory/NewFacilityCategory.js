import React, { useState, useMemo } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout"
import DashboardNavbar from 'examples/Navbars/DashboardNavbar'

import * as Yup from 'yup';

import MDForm from "components/Form";
import { Navigate, useNavigate, useParams } from "react-router-dom";

import useFetch from "hooks/useFetch";
import useEditData from "hooks/useEditData"

const NewFacilityCategory = () => {
    const { id } = useParams()

    const [loading, setLoading] = useState(!!id)
    const [values, setValues] = useState({
        code: '',
        title: '',
        details: '',
        icon: '',
        status: true
    })

    const validationSchema = Yup.object().shape({
        code: Yup.string()
            .required("Code is required"),
        title: Yup.string()
            .required("Title is required"),
        details: Yup.string(),
        icon: Yup.string(),
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
            name: "icon",
            label: "Icon"
        },
        {
            name: "details",
            label: "Details",
            multiline: true,
            rows: 4
        },
        {
            name: "status",
            label: "Status",
            check: true
        },
    ]
    useEditData(
        id && '/facilityCategories/' + id,
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
            navigate('/facilityCategories')
        }
    }

    return (
        <MDForm
            formItems={formItems}
            loading={loading}
            validationSchema={validationSchema}
            method={id ? 'PUT' : 'POST'}
            action={id ? '/facilityCategories/update/' + id : '/facilityCategories'}
            values={values}
            title={id ? 'Edit Facility Category' : 'Add Facility Category'}
            handlers={handlers}
        />
    )
}

export default NewFacilityCategory