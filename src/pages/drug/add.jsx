import React, { useState, useMemo } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout"
import DashboardNavbar from 'examples/Navbars/DashboardNavbar'

import * as Yup from 'yup';

import MDForm from "components/Form";
import { useParams, useNavigate } from "react-router-dom";

import useFetch from "hooks/useFetch";
import useEditData from "hooks/useEditData"

const NewDrug = () => {
    const { id } = useParams()

    const [loading, setLoading] = useState(!!id)
    const [values, setValues] = useState({
        drugName: '',
        manufacturer: '',
        supplier: '',
        ndc: '',
        expDate: '',
        
    })


    const validationSchema = Yup.object().shape({
        code: Yup.string()
            .required("Code is required"),
        email: Yup.string()
            .email("Email must be a valid email address")
            .required("Email is required"),
        password: Yup.string()
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 'Minimum eight , at least one uppercase letter, one lowercase letter, one number and one special character')
            .when([], {
                is: () => !id,
                then: Yup.string().required("Password is required"),
                otherwise: Yup.string().notRequired(),
            }),
        conPassword: Yup.string()
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 'Minimum eight , at least one uppercase letter, one lowercase letter, one number and one special character')
            .when([], {
                is: () => !id,
                then: Yup.string().required("Confirm Password is required")
                    .oneOf([Yup.ref("password"), null], "Password and conform password must match"),
                otherwise: Yup.string().notRequired(),
            }),
        firstname: Yup.string()
            .required("Firstname is required"),
        lastname: Yup.string()
            .required("Lastname is required"),
        phone: Yup.string()
            .required("Mobile number is required")
            .matches(/^([+]?[0-9]{1,4}[ -]?)?[0-9]{9,12}$/, "Not a valid phone number")
            .min(9, "Not a valid phone number")
            .max(12, "Not a valid phone number"),
        address: Yup.string()
            .required("Address is required"),
        status: Yup.boolean()
    })

    const formItems = [
        {
            name: "code",
            label: "Customer code",
            required: true,
            fullwidth: true
        },
        {
            name: "firstname",
            label: "First name",
            required: true
        },
        {
            name: "lastname",
            label: "Last name",
            required: true
        },
        {
            name: "email",
            label: "Email",
            required: true,
            type: 'email'
        },
        ...(!id ? [
            {
                name: "password",
                label: "password",
                required: true,
                type: 'password'
            },
            {
                name: "conPassword",
                label: "Coform password",
                required: true,
                type: 'password'
            }
        ] : []),
        {
            name: "phone",
            label: "Phone",
            required: true
        },
        {
            name: "address",
            label: "Address",
            multiline: true,
            rows: 4,
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
        id && '/customers/' + id,
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
            navigate(`/customers`)
        }
    }

    return (
        <MDForm
            formItems={formItems}
            loading={loading}
            validationSchema={validationSchema}
            method={id ? 'PUT' : 'POST'}
            action={id ? '/customers/update/' + id : '/customers'}
            values={values}
            title={id ? 'Edit Customer' : 'Add Customer'}
            handlers={handlers}
        />
    )
}

export default NewDrug